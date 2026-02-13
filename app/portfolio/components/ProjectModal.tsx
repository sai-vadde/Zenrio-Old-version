"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Project } from "@/data/projects";
import ProjectCarousel from "./ProjectCarousel";
import { useEffect, useState } from "react";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    // Disable background scrolling when modal is open
    document.body.style.overflow = project ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (project) setActiveIndex(0);
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            layoutId={`project-${project.id}`}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-x-hidden"
          >
            <div className="relative flex h-[90vh] w-full max-w-5xl flex-col rounded-3xl overflow-hidden bg-black text-white shadow-2xl">
              {/* ✅ NEW Circular Close Button "className=relative flex h-[90vh] w-full max-w-5xl flex-col rounded-2xl bg-black text-white shadow-2xl"  */}
              <button
                onClick={onClose}
                className="
                  absolute right-6 top-6 z-50
                  flex items-center justify-center
                  w-11 h-11
                  rounded-full
                  bg-white/10 backdrop-blur-md
                  border border-white/20
                  text-white text-xl font-bold
                  hover:bg-white hover:text-black
                  hover:rotate-90
                  transition-all duration-300
                  shadow-lg
                "
              >
                ✕
              </button>

              {/* HERO Image */}
              <div className="relative h-[40vh] shrink-0">
                <Image
                  src={project.images[activeIndex]}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40" />

                <div className="absolute bottom-8 left-8">
                  <h2 className="text-4xl font-bold">{project.title}</h2>
                  <p className="mt-2 max-w-xl text-gray-300">
                    {project.tagline}
                  </p>
                </div>
              </div>

              {/* Scrollable Content */}
              <div
                className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                {/* Carousel */}
                <div className="w-full overflow-y-hidden">
                  <ProjectCarousel
                    images={project.images}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                  />
                </div>

                {/* Description */}
                <div className="w-full max-w-full">
                  <p className="leading-relaxed text-gray-300">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/10 px-3 py-1 text-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-4 pt-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        className="rounded-full border border-white/20 px-6 py-3 hover:bg-white/10"
                      >
                        GitHu
                      </a>
                    )}

                    <a
                      href="/contact"
                      className="rounded-full bg-white px-6 py-3 font-semibold text-black hover:scale-105 transition"
                    >
                      Book a Call
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
