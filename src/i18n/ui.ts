export const languages = {
  es: "Español",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "es";

/** Ruta raíz de un idioma, respetando el `base` del sitio. */
export function localePath(lang: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return lang === defaultLang ? `${base}/` : `${base}/${lang}/`;
}

const es = {
  meta: {
    title: "David Sepúlveda — Portafolio",
    description:
      "Portafolio de David Leonardo Sepúlveda Chávez — Ingeniero de sistemas y desarrollador web full-stack.",
  },
  a11y: {
    main: "Contenido principal",
    sections: "Secciones",
    personalInfo: "Información personal",
    filterProjects: "Filtrar proyectos",
    portrait: "Retrato de David Leonardo Sepúlveda Chávez",
    changeTheme: "Cambiar tema",
    language: "Idioma",
    switchTo: { es: "Ver en español", en: "Ver en inglés" } as Record<
      string,
      string
    >,
  },
  nav: {
    about: "Sobre mí",
    resume: "Trayectoria",
    projects: "Proyectos",
    contact: "Contacto",
  },
  theme: {
    light: "Claro",
    dark: "Oscuro",
    system: "Sistema",
  },
  sidebar: {
    role: "Desarrollador Web · Full-stack",
    email: "Email",
    location: "Ubicación",
    locationValue: "Bucaramanga, Colombia",
  },
  about: {
    title: "Sobre mí",
    strong: "Ingeniero de sistemas e informática",
    body: " y desarrollador web full-stack en Bucaramanga, Colombia. Construyo aplicaciones internas de negocio de punta a punta: del requerimiento con el área usuaria hasta el despliegue en producción, automatizando procesos que antes se hacían a mano.",
    statExperience: "años de experiencia profesional",
    statProjects: "proyectos publicados",
    statSkills: "tecnologías en el stack",
    servicesTitle: "Lo que hago",
    services: [
      {
        title: "Desarrollo Web",
        desc: "Construcción de aplicaciones web modernas, accesibles y escalables con Next.js, Astro y Node.",
      },
      {
        title: "Interfaces UI",
        desc: "Diseño e implementación de interfaces responsive con foco en experiencia de usuario.",
      },
      {
        title: "Backend & APIs",
        desc: "APIs REST con Node y Express, integración con MySQL y MongoDB, autenticación y despliegue.",
      },
      {
        title: "Automatización",
        desc: "Automatización de procesos internos para mejorar la eficiencia del equipo.",
      },
    ],
  },
  resume: {
    title: "Trayectoria",
    intro:
      "Mi recorrido combina formación universitaria, prácticas en el sector público y experiencia en industria.",
    experience: "Experiencia",
    skills: "Habilidades técnicas",
    certifications: "Certificaciones",
  },
  projects: {
    title: "Proyectos",
    intro:
      "Selección de trabajos personales y profesionales. Los iconos sobre cada captura abren el repositorio y la demo.",
    all: "Todos",
    categories: {
      web: "Web",
      desktop: "Desktop",
      mobile: "Mobile",
      tool: "Herramienta",
      game: "Juego",
      other: "Otro",
    } as Record<string, string>,
    screenshotAlt: (name: string) => `Captura del proyecto ${name}`,
    repoAria: (name: string) => `Repositorio de ${name} en GitHub`,
    demoAria: (name: string) => `Ver demo de ${name}`,
  },
  contact: {
    title: "Hablemos",
    intro:
      "¿Tienes una vacante, un proyecto en mente o simplemente quieres charlar sobre código? Escríbeme por el medio que te resulte más cómodo.",
    available: "Disponible para nuevas oportunidades",
    timezone: "GMT-5 · Bogotá",
    modality: "Presencial, híbrido o remoto",
  },
};

const en: typeof es = {
  meta: {
    title: "David Sepúlveda — Portfolio",
    description:
      "Portfolio of David Leonardo Sepúlveda Chávez — Systems engineer and full-stack web developer.",
  },
  a11y: {
    main: "Main content",
    sections: "Sections",
    personalInfo: "Personal information",
    filterProjects: "Filter projects",
    portrait: "Portrait of David Leonardo Sepúlveda Chávez",
    changeTheme: "Change theme",
    language: "Language",
    switchTo: { es: "View in Spanish", en: "View in English" } as Record<
      string,
      string
    >,
  },
  nav: {
    about: "About",
    resume: "Resume",
    projects: "Projects",
    contact: "Contact",
  },
  theme: {
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  sidebar: {
    role: "Web Developer · Full-stack",
    email: "Email",
    location: "Location",
    locationValue: "Bucaramanga, Colombia",
  },
  about: {
    title: "About me",
    strong: "Systems and computer engineer",
    body: " and full-stack web developer based in Bucaramanga, Colombia. I build internal business applications end to end — from gathering requirements with the people who use them to deploying to production — automating work that used to be done by hand.",
    statExperience: "years of professional experience",
    statProjects: "published projects",
    statSkills: "technologies in the stack",
    servicesTitle: "What I do",
    services: [
      {
        title: "Web Development",
        desc: "Building modern, accessible and scalable web applications with Next.js, Astro and Node.",
      },
      {
        title: "UI Interfaces",
        desc: "Designing and implementing responsive interfaces with a focus on user experience.",
      },
      {
        title: "Backend & APIs",
        desc: "REST APIs with Node and Express, MySQL and MongoDB integration, authentication and deployment.",
      },
      {
        title: "Automation",
        desc: "Automating internal processes to improve how the team works.",
      },
    ],
  },
  resume: {
    title: "Resume",
    intro:
      "My path combines a university degree, an internship in the public sector and hands-on industry experience.",
    experience: "Experience",
    skills: "Technical skills",
    certifications: "Certifications",
  },
  projects: {
    title: "Projects",
    intro:
      "A selection of personal and professional work. The icons over each screenshot open the repository and the live demo.",
    all: "All",
    categories: {
      web: "Web",
      desktop: "Desktop",
      mobile: "Mobile",
      tool: "Tool",
      game: "Game",
      other: "Other",
    } as Record<string, string>,
    screenshotAlt: (name: string) => `Screenshot of ${name}`,
    repoAria: (name: string) => `${name} repository on GitHub`,
    demoAria: (name: string) => `View the ${name} demo`,
  },
  contact: {
    title: "Let's talk",
    intro:
      "Do you have an opening, a project in mind or just want to talk about code? Reach out through whichever channel suits you best.",
    available: "Open to new opportunities",
    timezone: "GMT-5 · Bogotá",
    modality: "On-site, hybrid or remote",
  },
};

export const ui = { es, en };

export function useTranslations(lang: Lang) {
  return ui[lang] ?? ui[defaultLang];
}

/**
 * Campos traducibles en los datos (cv.json, colección de proyectos):
 * `description` en español, `description_en` en inglés con respaldo al español.
 */
export function field<T extends Record<string, any>>(
  obj: T,
  key: string,
  lang: Lang
): string {
  if (lang !== defaultLang) {
    const translated = obj[`${key}_${lang}`];
    if (translated) return translated;
  }
  return obj[key];
}
