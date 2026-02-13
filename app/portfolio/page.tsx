"use client";

import Navbar from "../components/Navbar";
import { projects } from "@/data/projects";
import { Project } from "@/data/projects";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import { useState } from "react";

export default function PortfolioPage() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white text-black pt-32 px-10 pb-10">
        <div className="max-w-7xl mx-auto mb-20">
          <h1 className="text-5xl font-bold">Our Projects</h1>
          <p className="mt-4 text-gray-600 max-w-xl">
            Real-world projects focused on performance, scalability, and modern
            design.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 ">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onClick={() => setActive(p)} />
          ))}
        </div>
      </main>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
