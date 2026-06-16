import { useEffect, useRef, useCallback, useState } from "react"
import { useWsStore } from "../../../store/wsStore"


const WS_URL = `${import.meta.env.VITE_API_URL.replace(/^http/, "ws")}/pedidos/cocina/ws`

export interface IWsEvent {
    event:
        | "NUEVO_PEDIDO"
        | "PEDIDO_CONFIRMADO"
        | "PEDIDO_EN_PREPARACION"
        | "PEDIDO_LISTO"
        | "PEDIDO_CANCELADO"
        | "PEDIDO_ENTREGADO"
        | "SUBSCRIBED"
        | "ERROR"
        | "WS_CONNECTED"
    data: unknown
}

interface IUseWebSocketOptions {
    onMessage?: (msg: IWsEvent) => void
    enabled?: boolean
}

/** Conexion WebSocket persistente con el backend (cookie httpOnly viaja sola en el handshake)
 *  Reconecta con backoff exponencial salvo en cierre normal
 *  (1000) o auth rechazada (1008). Emite "WS_CONNECTED" sintetico al abrir
 *  para que la pagina sincronice datos / re-suscripciones
 */

export function useOrderStatusWS ({ onMessage, enabled = true} : IUseWebSocketOptions = {}){
    const wsRef = useRef <WebSocket | null > (null)
    const onMessageRef = useRef (onMessage)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        onMessageRef.current = onMessage
    }, [onMessage])

    useEffect( () => {
        if (!enabled) return

        let cancelled = false
        let retryCount = 0
        let retryTimer: ReturnType <typeof setTimeout> | null = null
        let currentWs: WebSocket | null = null

        const closeCleanly = (ws: WebSocket) => {
            if (ws.readyState === WebSocket.CONNECTING) {
                ws.addEventListener("open", ()=> ws.close(1000), { once: true})
            } else if (ws.readyState === WebSocket.OPEN) {
                ws.close(1000)
            }
        }

        const connect = () => {
            if (cancelled) return
            
            const ws = new WebSocket(WS_URL)
            currentWs = ws
            wsRef.current = ws

            ws.onopen = () => {
                
                if (cancelled) {
                    ws.close(1000)
                    return
                }
                retryCount = 0
                useWsStore.getState().connect()
                onMessageRef.current?.({ event: "WS_CONNECTED", data: null})

                setIsConnected(true)
            }

            ws.onmessage = (event) => {
                if (cancelled) return
                try {
                    const msg = JSON.parse(event.data as string) as IWsEvent 
                    onMessageRef.current?.(msg)
                } catch {
                    // Mensaje malformado - se ignora
                }
            }

            ws.onerror = ()=> {
                //todo error ws dispara onclose despues, la logica vive ahi
            }

            ws.onclose = (e) => {
                
                if (wsRef.current === ws) wsRef.current = null
                currentWs = null
                useWsStore.getState().disconnect()
                setIsConnected(false)

                const cierreNormal = e.code === 1000
                const tokenExpirado = e.code === 1008

                if (cancelled || cierreNormal) return

                if (tokenExpirado) return

                retryCount++
                const delay = Math.min (1000 *2 ** retryCount, 30_000)
                retryTimer = setTimeout(connect, delay)
            }
        }

        connect()

        return () => {
            cancelled = true
            if (retryTimer !== null) clearTimeout(retryTimer)
            if (currentWs) closeCleanly(currentWs)
            wsRef.current = null
        }
    }, [enabled])

    const subscribeToOrder = useCallback ( (orderId: number) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ action: "subscribe-order", order_id: orderId}))
        }
    }, [])

    const unsubscribeFromOrder = useCallback ( (orderId: number) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify( { action: "unsubscribe-order", order_id: orderId}))
        }
    }, [])

    return { subscribeToOrder, unsubscribeFromOrder, isConnected}
}