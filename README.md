<div align="center">

# david.dev

**Portafolio personal de David Leonardo Sepúlveda Chávez**
Desarrollador web full-stack · Bucaramanga, Colombia

[**Ver el sitio →**](https://davidsepulvedach.github.io/david.dev/)

[![Deploy to GitHub Pages](https://github.com/DavidSepulvedaCh/david.dev/actions/workflows/astro.yml/badge.svg)](https://github.com/DavidSepulvedaCh/david.dev/actions/workflows/astro.yml)
[![Astro](https://img.shields.io/badge/Astro-7.3-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Node](https://img.shields.io/badge/Node-%E2%89%A522.12-5FA04E?logo=node.js&logoColor=white)](https://nodejs.org)

![El portafolio en tema claro y oscuro](./.github/preview.png)

</div>

---

## Sobre el proyecto

Sitio estático de una sola página construido con **Astro**, sin frameworks de UI ni
dependencias de runtime: todo el contenido se genera en tiempo de compilación y se
envía como HTML, CSS y un único script de ~5 KB.

Las cuatro secciones (Sobre mí, Trayectoria, Proyectos y Contacto) funcionan como
pestañas que alternan paneles ya renderizados, así que cambiar de sección no
implica ninguna petición al servidor.

### Características

- **Bilingüe (ES/EN)** mediante rutas estáticas — `/` y `/en/` — con `hreflang`,
  `og:locale` y un diccionario tipado que hace fallar la compilación si falta
  una traducción.
- **Tema claro, oscuro o del sistema**, aplicado antes del primer pintado para
  evitar el destello inicial.
- **Imágenes optimizadas** en tiempo de build con `astro:assets` y `sharp`:
  WebP responsive con `srcset`, a partir de fuentes sin pérdida que nunca se publican.
- **Accesible**: patrón WAI-ARIA de pestañas con navegación por teclado
  (flechas, Home/End), *roving tabindex* y respeto a `prefers-reduced-motion`.
- **SEO**: sitemap con alternancia de idiomas, `robots.txt`, canónicas y Open Graph.
- **Duraciones que se recalculan solas** en el navegador, para que los tiempos
  de experiencia no queden congelados en la fecha del build.

## Stack

| Área | Tecnología |
| :--- | :--- |
| Framework | [Astro 7](https://astro.build) (salida estática) |
| Lenguaje | TypeScript en modo `strict` |
| Estilos | CSS plano con *custom properties* para los temas |
| Imágenes | `astro:assets` + [sharp](https://sharp.pixelplumbing.com) |
| Contenido | Content Collections con validación de esquema (Zod) |
| Gestor de paquetes | pnpm |
| Despliegue | GitHub Actions → GitHub Pages |

## Puesta en marcha

Requiere **Node ≥ 22.12** (lo exige Astro 7) y **pnpm**.

```bash
git clone https://github.com/DavidSepulvedaCh/david.dev.git
cd david.dev
pnpm install
pnpm dev
```

El sitio queda disponible en `http://localhost:4321/david.dev/`.

> El proyecto se sirve bajo el subdirectorio `/david.dev/` porque se publica en
> GitHub Pages. Ese prefijo se define en `astro.config.mjs` y también aplica en local.

### Comandos

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Servidor de desarrollo con recarga en caliente |
| `pnpm build` | Valida tipos (`astro check`) y compila a `./dist/` |
| `pnpm preview` | Sirve la compilación de producción en local |
| `pnpm astro ...` | Ejecuta comandos de la CLI de Astro |

## Estructura

```text
src/
├── assets/             # Imágenes procesadas por astro:assets (no se publican tal cual)
│   └── projects/       # Capturas de cada proyecto
├── components/
│   ├── panels/         # Un componente por sección: About, Resume, Projects, Contact
│   ├── LangSwitch.astro
│   ├── MainPanel.astro
│   ├── Sidebar.astro
│   ├── ThemeToggle.astro
│   └── TopBar.astro
├── content/
│   └── project/        # Un archivo Markdown por proyecto
├── i18n/ui.ts          # Diccionario ES/EN tipado
├── icons/              # Iconos SVG del stack, como componentes
├── layouts/            # Documento base con metadatos y SEO
├── lib/                # Utilidades puras (fechas, registro de iconos)
├── pages/
│   ├── [...lang].astro # Genera / y /en/ desde una sola ruta
│   └── 404.astro
├── scripts/            # Único script del cliente (pestañas, tema, filtros)
├── styles/
└── content.config.ts   # Esquema de las Content Collections
```

## Cómo editar el contenido

Casi todo el contenido vive en datos, no en el marcado:

- **Experiencia, habilidades y certificaciones** → `src/cv.json`.
  Los cargos consecutivos en la misma empresa se agrupan solos en la línea de tiempo.
- **Proyectos** → un `.md` nuevo en `src/content/project/`. El esquema de
  `src/content.config.ts` valida los campos y falla la compilación si falta alguno.
- **Textos de la interfaz** → `src/i18n/ui.ts`. El objeto en inglés se declara como
  `typeof es`, de modo que olvidar una clave rompe el build en vez de pasar inadvertido.

## Despliegue

Cada push a `main` dispara el workflow de [GitHub Actions](.github/workflows/astro.yml),
que compila con `withastro/action@v3` y publica en GitHub Pages.

## Licencia

El código es de libre consulta con fines de aprendizaje. El contenido personal
—textos, fotografía, logotipos y capturas de los proyectos— no es reutilizable.

---

<div align="center">

**David Leonardo Sepúlveda Chávez**

[Sitio](https://davidsepulvedach.github.io/david.dev/) ·
[LinkedIn](https://www.linkedin.com/in/david-leonardo-sepúlveda-chávez-21303a255) ·
[GitHub](https://github.com/DavidSepulvedaCh)

</div>
