"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.div
      layoutId={`project-${project.id}`}
      onClick={onClick}
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-black text-white rounded-2xl overflow-hidden shadow-xl cursor-pointer"
    >
      <div className="relative aspect-video">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold">{project.title}</h2>
        <p className="text-gray-400 mt-2 text-sm">{project.tagline}</p>
        <p className="mt-3 text-xs text-gray-500">
          {project.tech.join(" • ")}
        </p>
      </div>
    </motion.div>
  );
}
