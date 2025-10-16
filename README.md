# Product Scrapper Frontend

Frontend moderno construido con **Nuxt 4** y **Nuxt UI** para comparar productos de múltiples tiendas en Costa Rica.

## 🚀 Características

- ✅ **Nuxt 4** - Framework Vue.js de última generación
- 🎨 **Nuxt UI** - Componentes hermosos con Tailwind CSS
- 🖼️ **Nuxt Image** - Optimización automática de imágenes
- 🎯 **TypeScript** - Type-safe
- 📱 **Responsive** - Funciona en móvil, tablet y desktop
- ⚡ **Performance** - Optimizado para velocidad
- 🤖 **IA-powered** - Filtrado inteligente de productos con GPT-4

## 📋 Requisitos

- Node.js 18+
- pnpm (recomendado) o npm
- Backend corriendo en `http://localhost:3001`

## 🛠️ Configuración

1. **Clonar e instalar dependencias:**

```bash
cd frontend
pnpm install
```

2. **Configurar variables de entorno:**

Copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env`:

```env
NUXT_PUBLIC_API_BASE=http://localhost:3001
```

## 🚀 Desarrollo

Inicia el servidor de desarrollo en `http://localhost:3000`:

```bash
pnpm dev
```

El frontend se conectará automáticamente al backend en `http://localhost:3001`.

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
