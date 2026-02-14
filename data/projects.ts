export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  images: string[];
  tech: string[];
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    id: "lookevo",
    title: "Lookevo Website",
    tagline: "Creative digital presence for modern brands.",
    description:
      "A modern and visually engaging business website built with Next.js and Tailwind CSS. Designed to showcase services, portfolio, and brand identity with smooth animations, responsive layouts, and optimized performance for a seamless user experience.",
    images: [
      "/lookevo1.png",
      "/lookevo2.png",
      "/lookevo3.png",
      "/lookevo4.png",
      "/lookevo5.png",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Gani-29/lookevo",
    live: "https://lookevo.vercel.app",
  },

  {
    id: "daisuke-agency",
    title: "Daisuke Agency",
    tagline: "We make your content unforgettable.",
    description:
      "A video editing agency platform with WhatsApp integration, fast onboarding, and a conversion-focused UI. Built with performance and scalability in mind.",
    images: [
      "/daisuke1.png",
      "/daisuke2.png",
      "/daisuke3.png",
      "/daisuke4.png",
    ],
    tech: ["React", "Tailwind CSS", "Node.js", "Supabase"],
    github: "https://github.com/zenrio-kairex/Daisuke",
    live: "https://daisuke.agency",
  },

  {
    id: "portfolio-website",
    title: "Personal Portfolio",
    tagline: "Showcasing skills and projects.",
    description:
      "A personal portfolio website to display projects, skills, and contact information with smooth animations and clean UI.",
    images: [
      "/portfolio1.png",
      "/portfolio2.png",
      "/portfolio3.png",
      "/portfolio4.png",
    ],
    tech: ["Next.js", "React", "Tailwind CSS"],
    github: "https://github.com/Gani-29/portfolio",
    live: "https://portfolio-demo.vercel.app",
  },

  {
    id: "restaurant-site",
    title: "Restaurant Website",
    tagline: "Elegant restaurant showcase platform.",
    description:
      "A responsive restaurant website with menu display, booking section, and modern UI design. Optimized for performance and mobile experience.",
    images: ["/resto1.jpg"],
    tech: ["React", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/Gani-29/Restaurant-site",
    live: "https://restaurant-demo.vercel.app",
  },
  {
    id: "gani-business-solutions",
    title: "Gani Business Solutions Website",
    tagline: "Professional WordPress solutions for growing businesses.",
    description:
      "A modern WordPress-based business website designed for Gani Business Solutions. The platform showcases services, company expertise, and contact sections with a clean UI, responsive layout, and performance-focused structure to support business growth and client engagement.",
    images: ["/gani1.png", "/gani2.png", "/gani3.png"],

    tech: ["WordPress", "Elementor", "PHP", "CSS"],
    live: "https://ganisolutions.shop",
  },
];
