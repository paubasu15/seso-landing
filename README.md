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

### SSR y colores dinámicos

Cada vez que un usuario visita la landing, Astro hace una solicitud a la API .NET para obtener la configuración del tenant (colores, textos, hero, features, footer). Los colores se inyectan como CSS custom properties (`--color-primary`, `--color-secondary`, etc.) directamente en el HTML renderizado en el servidor, de modo que la página ya llega con los estilos correctos al navegador sin parpadeos.

### Fallback graceful

Si la API no responde, la landing se muestra con datos por defecto (colores rojos, textos genéricos) para que nunca aparezca una página en blanco.

### Variables de entorno

| Variable | Descripción |
|---|---|
| `PUBLIC_API_URL` | URL base de la API .NET |
| `PUBLIC_LANDING_URL` | URL pública de esta landing |
| `PUBLIC_PANEL_URL` | URL del panel/dashboard |
| `PUBLIC_DOMAIN` | Dominio base para detección de subdominio |
| `PUBLIC_ENV` | `development` o `production` |

Los archivos `.env.development` y `.env.production` ya están incluidos con valores por defecto.
