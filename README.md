# FoodStore — Cliente Web

**Trabajo Práctico — Segundo Parcial**  
Programación 4 — Universidad Tecnológica Nacional  
Facultad Regional Mendoza

---

## 📋 Descripción

**FoodStore** es una aplicación web de tipo e-commerce orientada a la venta de alimentos. Este repositorio corresponde al **frontend del cliente**, desarrollado como parte del segundo parcial de la materia *Programación 4*.

La aplicación permite a los usuarios navegar por el catálogo de productos, gestionar un carrito de compras y finalizar pedidos de forma intuitiva. El proyecto se construyó con una arquitectura moderna, priorizando la escalabilidad, el tipado estricto y una experiencia de usuario fluida.

---

## 🎥 Video de presentación

🔗 [Ver presentación en YouTube](https://youtu.be/4odNGl1uBh0)

---

## 👥 Integrantes

| Nombre y Apellido |
| ----------------- |
| Leonardo Gómez    |
| Nicolás Castro    | 


---

## 🚀 Tecnologías utilizadas

| Tecnología | Versión | Uso |
| ---------- | ------- | --- |
| [React](https://react.dev/) | ^19.2.6 | Biblioteca principal para la interfaz de usuario |
| [TypeScript](https://www.typescriptlang.org/) | ~6.0.2 | Tipado estático en todo el proyecto |
| [Vite](https://vitejs.dev/) | ^8.0.12 | Bundler y entorno de desarrollo |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.3.0 | Estilos y diseño responsive |
| [React Router DOM](https://reactrouter.com/) | ^7.15.1 | Navegación y enrutamiento del lado del cliente |
| [TanStack Query](https://tanstack.com/query) | ^5.100.10 | Manejo de estado asíncrono, caché y sincronización con el servidor |
| [Axios](https://axios-http.com/) | ^1.16.1 | Cliente HTTP para consumir la API REST |
| [Zustand](https://github.com/pmndrs/zustand) | ^5.0.13 | Manejo de estado global simple y escalable |
| [TanStack Table](https://tanstack.com/table) | ^8.21.3 | Renderizado de tablas de datos complejas |
| [TanStack Form](https://tanstack.com/form) | ^1.32.0 | Manejo de formularios con validación |
| [Sonner](https://sonner.emilkowal.ski/) | ^2.0.7 | Notificaciones tipo toast |
| [Lucide React](https://lucide.dev/) | ^1.16.0 | Íconos vectoriales |

---

## ⚙️ Requisitos previos

Antes de levantar el proyecto, asegurate de tener instalado:

- [Node.js](https://nodejs.org/) **v20 o superior**
- [pnpm](https://pnpm.io/) *(recomendado — se usa `pnpm-lock.yaml`)*

> También podés usar `npm` o `yarn`, pero el proyecto está configurado con **pnpm**.

---

## 🛠️ Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd store-app
```

### 2. Instalar dependencias

```bash
pnpm install
```

> Si usás `npm`: `npm install`

### 3. Configurar variables de entorno

El proyecto utiliza un archivo `.env` para la configuración. Verificá que exista en la raíz con al menos la siguiente variable:

```env
VITE_API_URL=http://localhost:3000/api
```

> Ajustá la URL según la dirección donde esté corriendo el backend.

### 4. Levantar el servidor de desarrollo

```bash
pnpm dev
```

Por defecto, la aplicación estará disponible en:

```
http://localhost:5173
```

### 5. Generar build de producción

```bash
pnpm build
```

El contenido optimizado se generará en la carpeta `dist/`.

---

## 📁 Estructura del proyecto

```
store-app/
├── public/                # Assets estáticos
├── src/
│   ├── assets/            # Imágenes y recursos
│   ├── features/          # Módulos por dominio (productos, carrito, etc.)
│   ├── router/            # Configuración de rutas
│   ├── shared/            # Componentes, hooks y utilidades compartidas
│   ├── store/             # Estado global (Zustand)
│   ├── App.tsx            # Componente raíz
│   ├── main.tsx           # Punto de entrada
│   └── index.css          # Estilos globales (Tailwind)
├── .env                   # Variables de entorno
├── index.html             # HTML de entrada
├── package.json           # Dependencias y scripts
├── tsconfig.json          # Configuración de TypeScript
└── vite.config.ts         # Configuración de Vite
```

---

## 📜 Scripts disponibles

| Comando | Descripción |
| ------- | ----------- |
| `pnpm dev` | Inicia el servidor de desarrollo con HMR |
| `pnpm build` | Compila el proyecto para producción |
| `pnpm preview` | Previsualiza la build de producción localmente |
| `pnpm lint` | Ejecuta ESLint sobre todo el proyecto |

---

## 🔗 Repositorios relacionados

- **Backend / API**: *(completar con el link si aplica)*

---

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos para la materia *Programación 4* de la **UTN — Facultad Regional Mendoza**.

---

> **Nota para la corrección:**  
> Si necesitan levantar el backend, asegúrense de que esté corriendo en la URL definida en `.env` antes de iniciar el cliente. Cualquier duda, consulten con los integrantes del grupo.
