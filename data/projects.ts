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
    id: "zenrio-agency",
    title: "Zenrio Agency Website",
    tagline: "Modern digital agency platform.",
    description:
      "A modern web agency portfolio built with Next.js and Tailwind CSS. Includes animated UI, portfolio showcase, services section, and Supabase-powered contact form.",
    images: [
      "/placeholder2.jpg",
      "/placeholder3.jpg",
      "/placeholder4.jpg",
      "/placeholder5.jpg",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    github: "https://github.com/yourname/zenrio-agency",
    live: "https://zenrio-agency.vercel.app",
  },

  {
    id: "restaurant-site",
    title: "Restaurant Website",
    tagline: "Elegant restaurant showcase platform.",
    description:
      "A responsive restaurant website with menu display, booking section, and modern UI design. Optimized for performance and mobile experience.",
    images: [
      "/placeholder1.jpg",
      "/placeholder2.jpg",
      "/placeholder3.jpg",
      "/placeholder4.jpg",
      "/placeholder5.jpg",
    ],
    tech: ["React", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/yourname/restaurant-site",
    live: "https://restaurant-demo.vercel.app",
  },

  {
    id: "daisuke-agency",
    title: "Daisuke Agency",
    tagline: "We make your content unforgettable.",
    description:
      "A video editing agency platform with WhatsApp integration, fast onboarding, and a conversion-focused UI. Built with performance and scalability in mind.",
    images: [
      "/placeholder1.jpg",
      "/placeholder2.jpg",
      "/placeholder3.jpg",
      "/placeholder4.jpg",
      "/placeholder5.jpg",
    ],
    tech: ["React", "Tailwind CSS", "Node.js", "Supabase"],
    github: "https://github.com/yourname/daisuke",
    live: "https://daisuke.agency",
  },

  {
    id: "portfolio-website",
    title: "Personal Portfolio",
    tagline: "Showcasing skills and projects.",
    description:
      "A personal portfolio website to display projects, skills, and contact information with smooth animations and clean UI.",
    images: [
      "/placeholder1.jpg",
      "/placeholder2.jpg",
      "/placeholder3.jpg",
      "/placeholder4.jpg",
      "/placeholder5.jpg",
    ],
    tech: ["Next.js", "React", "Tailwind CSS"],
    github: "https://github.com/yourname/portfolio",
    live: "https://portfolio-demo.vercel.app",
  },
];
