# Food Store — Tienda Cliente

Tienda online con React + TypeScript + Vite.

> Parte del proyecto Food Store TPI Programación 4.
> Repos relacionados: [Backend](https://github.com/LfgLeonardoGomez/tpPrimerParcial-app-fullstack) · [Panel Admin](https://github.com/LfgLeonardoGomez/admin-app-food-store-final-)

---

## Integrantes

| Nombre | Apellido |
|--------|----------|
| Leonardo | Gómez |
| Nicolás | Castro |

---

## Tecnologías

| Tecnología | Uso |
|------------|-----|
| **React 19 + TypeScript** | UI y lógica de componentes |
| **Vite** | Build tool y dev server |
| **Tailwind CSS** | Estilos utility-first |
| **TanStack Query** | Fetching y caché de datos del servidor |
| **Zustand** | Estado global (auth, carrito, WebSocket) |
| **Axios** | Cliente HTTP con interceptores JWT |
| **MercadoPago** | Checkout PRO para pagos |
| **WebSocket** | Seguimiento en tiempo real del pedido |

---

## Requisitos

- Node.js 18+
- pnpm
- Backend corriendo en `http://localhost:8000`

---

## Setup

```bash
cp .env.example .env

pnpm install
pnpm dev

Disponible en http://localhost:5174

---
Tarjeta de prueba MercadoPago (sandbox)

┌────────────────┬─────────────────────┐
│     Campo      │        Valor        │
├────────────────┼─────────────────────┤
│ Número         │ 5031 7557 3453 0604 │
├────────────────┼─────────────────────┤
│ CVV            │ 123                 │
├────────────────┼─────────────────────┤
│ Vencimiento    │ 11/25               │
├────────────────┼─────────────────────┤
│ Nombre titular │ APRO                │
└────────────────┴─────────────────────┘

---
Video de presentación

[Pendiente — se actualizará antes de la entrega]