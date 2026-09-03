import type { Lang } from "@/i18n/ui";

/**
 * Fuente única de las palabras de duración: la usan tanto el render en el
 * servidor como el recálculo en el navegador.
 */
export const durationWords: Record<
  Lang,
  { year: string; years: string; month: string; months: string; join: string }
> = {
  es: { year: "año", years: "años", month: "mes", months: "meses", join: " y " },
  en: {
    year: "year",
    years: "years",
    month: "month",
    months: "months",
    join: " and ",
  },
};

function monthsBetween(start: string, end: string | null): number {
  const [sy, sm] = start.split("-").map(Number);
  let ey: number, em: number;
  if (end) {
    [ey, em] = end.split("-").map(Number);
  } else {
    const now = new Date();
    ey = now.getFullYear();
    em = now.getMonth() + 1;
  }
  return (ey - sy) * 12 + (em - sm);
}

/** "1 año y 7 meses" / "1 year and 7 months". `end` vacío o null = hasta hoy. */
export function formatDuration(
  start: string,
  end: string | null,
  lang: Lang
): string {
  const w = durationWords[lang] ?? durationWords.es;
  const months = Math.max(1, monthsBetween(start, end));
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const yearPart = years > 0 ? `${years} ${years === 1 ? w.year : w.years}` : "";
  const monthPart = rest > 0 ? `${rest} ${rest === 1 ? w.month : w.months}` : "";
  if (yearPart && monthPart) return `${yearPart}${w.join}${monthPart}`;
  return yearPart || monthPart;
}

/** Años completos transcurridos desde `start`, con mínimo de 1. */
export function yearsSince(start: string): number {
  return Math.max(1, Math.floor(monthsBetween(start, null) / 12));
}
