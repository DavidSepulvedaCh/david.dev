import AstroIcon from "@/icons/astro.astro";
import JavaScript from "@/icons/javascript.astro";
import MongoDB from "@/icons/mongodb.astro";
import MySQL from "@/icons/mysql.astro";
import NextJs from "@/icons/nextjs.astro";
import NodeJs from "@/icons/nodejs.astro";
import Odoo from "@/icons/odoo.astro";
import PostgreSQL from "@/icons/postgresql.astro";
import Sass from "@/icons/sass.astro";
import Typescript from "@/icons/typescript.astro";

/** Clave = nombre exacto de la habilidad en cv.json. Sin icono, se omite. */
export const skillIcons: Record<string, any> = {
  Astro: AstroIcon,
  JavaScript,
  MongoDB,
  MySQL,
  "Next.js": NextJs,
  NodeJs,
  Odoo,
  PostgreSQL,
  Sass,
  Typescript,
};
