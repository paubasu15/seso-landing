# seso-landing

Frontend de landing pages del proyecto SESO — plataforma SaaS multi-tenant con SSR y colores dinámicos.

## Tecnología

- **Astro 5** — SSR (server-side rendering) con adaptador Node standalone
- **Tailwind CSS 4** — integrado vía plugin de Vite

## Instalación

```bash
npm install
```

## Desarrollo

Asegúrate de tener la API corriendo en `localhost:5000`, luego:

```bash
npm run dev
```

La landing estará disponible en `http://localhost:4321`.

## URLs de ejemplo

- `http://localhost:4321?tenant=acme` — landing del tenant "acme"
- `http://localhost:4321?tenant=globex` — landing del tenant "globex"
- `http://localhost:4321` — landing con config por defecto (sin tenant)
- `http://localhost:4321/preview?tenant=acme` — preview SSR puro (sin JavaScript de cliente)

## Build de producción

```bash
npm run build
npm run start
```

## Cómo funciona

### Detección de tenant

- **Desarrollo:** se lee el query param `?tenant=acme`
- **Producción:** se lee el subdominio del header `Host` (p.ej. `acme.sesomxcohtrc.lat`)
- Si no se detecta ningún tenant, se usa `default`
- La lógica de detección está en `src/lib/tenant.js` (función `getTenantSlug`)

### Arquitectura de componentes

La API devuelve un array `components` en la configuración del tenant. Cada componente tiene:
- `type`: tipo del componente (`header`, `hero`, `features`, `testimonials`, `pricing`, `footer`)
- `order`: orden de renderizado
- `visible`: si debe mostrarse
- `data`: datos específicos del componente

Los componentes se renderizan dinámicamente en orden, mostrando sólo los visibles.

### Componentes disponibles

| Tipo | Descripción |
|---|---|
| `header` | Cabecera con logo, nombre y navegación |
| `hero` | Sección principal con título, subtítulo y CTA |
| `features` | Grid de características/servicios |
| `testimonials` | Grid de testimonios de clientes |
| `pricing` | Planes de precios con tarjetas |
| `footer` | Pie de página con texto y enlaces |

### Página /preview (SSR puro, zero JS)

La ruta `/preview` es idéntica a la landing pública, pero hace GET a la API con `?draft=true` para obtener el borrador en lugar de la configuración publicada.

**No hay JavaScript de cliente**: no hay `postMessage`, no hay manipulación de DOM, no hay `data-field` ni `data-component-type`.

#### Flujo con el dashboard

1. El usuario edita en el dashboard React
2. React guarda el borrador en la API
3. React recarga el iframe de preview (`src="/preview?tenant=..."`)
4. Astro hace SSR leyendo el borrador desde la API y renderiza la página completa

La página de preview tiene cabeceras `Cache-Control: no-store` para garantizar que cada recarga del iframe obtiene datos frescos de la API.

### SSR y colores dinámicos

Cada vez que un usuario visita la landing, Astro hace una solicitud a la API para obtener la configuración del tenant. Los colores se inyectan como CSS custom properties (`--color-primary`, `--color-secondary`, `--color-bg`, `--color-text`) directamente en el HTML del servidor, sin parpadeos.

### Fallback graceful

Si la API no responde, la landing se muestra con datos por defecto (colores rojos, textos genéricos) para que nunca aparezca una página en blanco.

### Variables de entorno

| Variable | Descripción |
|---|---|
| `PUBLIC_API_URL` | URL base de la API |
| `PUBLIC_LANDING_URL` | URL pública de esta landing |
| `PUBLIC_PANEL_URL` | URL del panel/dashboard |
| `PUBLIC_DOMAIN` | Dominio base para detección de subdominio |
| `PUBLIC_ENV` | `development` o `production` |

Los archivos `.env.development` y `.env.production` ya están incluidos con valores por defecto.

