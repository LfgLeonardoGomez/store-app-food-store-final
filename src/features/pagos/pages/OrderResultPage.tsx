import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { usePagos } from "../hooks/usePagos";
import { Button } from "../../../shared/components/ui/Button";
import { toast } from "sonner";

type ResultStatus = "loading" | "approved" | "pending" | "rejected" | "manual" | "error";

export default function OrderResultPage() {
  // useParams lee los parámetros de la URL: /orders/:pedidoId/:status
    const { pedidoId, status } = useParams<{ pedidoId: string; status: string }>();

    // useSearchParams lee los query params que MP agrega: ?payment_id=123&status=approved
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get("payment_id") || searchParams.get("collection_id");
    const manual = searchParams.get("manual");

    // Traemos la mutación para confirmar el pago contra nuestro back
    const { confirmarPago } = usePagos();

    // Estado local para saber qué mostrar en pantalla
    const [result, setResult] = useState<ResultStatus>("loading");
    const [message, setMessage] = useState("Verificando tu pago...");

    useEffect(() => {
        // CASO A: Efectivo o transferencia (viene ?manual=true y no hay payment_id)
        if (manual === "true" && !paymentId) {
        setResult("manual");
        setMessage("Pedido confirmado. Pagá al momento de la entrega.");
        return;
        }

        // CASO B: MP redirigió pero no trajo payment_id (pasa con ciertos medios de pago)
        if (!paymentId) {
        if (status === "pending") {
            setResult("pending");
            setMessage("Tu pago está siendo procesado. Te avisaremos cuando se confirme.");
        } else if (status === "failure") {
            setResult("rejected");
            setMessage("El pago no se completó. Podés reintentar o elegir otro método.");
        } else {
            setResult("error");
            setMessage("No pudimos verificar tu pago. Contactanos si necesitás ayuda.");
        }
        return;
        }

        // CASO C: Tenemos payment_id, confirmamos contra el back para saber el estado REAL
        confirmarPago.mutate(
        { pedido_id: Number(pedidoId), payment_id: Number(paymentId) },
        {
            onSuccess: (data) => {
            const mpStatus = data.mp_status;
            if (mpStatus === "approved") {
                setResult("approved");
                setMessage("¡Pago aprobado! Tu pedido está confirmado.");
            } else if (["pending", "in_process"].includes(mpStatus)) {
                setResult("pending");
                setMessage("Tu pago está siendo procesado por Mercado Pago.");
            } else {
                setResult("rejected");
                setMessage("El pago fue rechazado. Podés reintentar desde 'Mis Pedidos'.");
            }
            },
            onError: () => {
            setResult("error");
            setMessage("Error al verificar el pago. Reintentá más tarde.");
            toast.error("No se pudo confirmar el pago");
            },
        }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentId, pedidoId, status, manual]);

    // Colores e iconos según el estado
    const bgColors: Record<ResultStatus, string> = {
        loading: "bg-surface",
        approved: "bg-green-50",
        pending: "bg-yellow-50",
        rejected: "bg-red-50",
        manual: "bg-blue-50",
        error: "bg-gray-50",
    };

    const iconMap: Record<ResultStatus, string> = {
        loading: "⏳",
        approved: "✅",
        pending: "⏳",
        rejected: "❌",
        manual: "📋",
        error: "⚠️",
    };

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 ${bgColors[result]}`}>
        <div className="bg-background rounded-card shadow-card p-8 max-w-md w-full text-center space-y-6">
            <div className="text-6xl">{iconMap[result]}</div>

            <div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
                {result === "loading" ? "Procesando..." : `Pedido #${pedidoId}`}
            </h1>
            <p className="text-text-secondary">{message}</p>
            </div>

            {result !== "loading" && (
            <div className="space-y-3">
                {result === "approved" && (
                <Button variant="primary" className="w-full" onClick={() => window.location.href = "/"}>
                    Volver a la tienda
                </Button>
                )}

                {(result === "rejected" || result === "error") && (
                <Button variant="primary" className="w-full" onClick={() => window.location.href = "/mis-pedidos"}>
                    Ver mis pedidos
                </Button>
                )}

                {result === "pending" && (
                <Button variant="outline" className="w-full" onClick={() => window.location.href = "/mis-pedidos"}>
                    Ir a mis pedidos
                </Button>
                )}

                {result === "manual" && (
                <Button variant="primary" className="w-full" onClick={() => window.location.href = "/mis-pedidos"}>
                    Ver mis pedidos
                </Button>
                )}
            </div>
            )}
        </div>
        </div>
    );
    }
