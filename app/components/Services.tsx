"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const cards = [
  {
    id: "01",
    title: "Define",
    text: "We analyze your goals and craft a clear strategy to guide your brand.",
  },
  {
    id: "02",
    title: "Design",
    text: "Modern visuals and seamless digital experiences.",
  },
  {
    id: "03",
    title: "Build",
    text: "Scalable development using modern tools.",
  },
  {
    id: "04",
    title: "Launch",
    text: "Deployment and optimization for real success.",
  },
];

export default function Services() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 20%"],
  });

  // Finish animation at 75%
  const progress = useTransform(scrollYProgress, [0, 0.75], [0, 1]);

  const smoothProgress = useSpring(progress, {
    stiffness: 120,
    damping: 20,
  });

  // Section cinematic zoom
  const sectionScale = useTransform(progress, [0, 0.75], [0.95, 1]);
  const sectionOpacity = useTransform(progress, [0, 0.2], [0, 1]);

  // Card reveal timings
  const reveal1 = useTransform(progress, [0.05, 0.2], [0, 1]);
  const reveal2 = useTransform(progress, [0.2, 0.35], [0, 1]);
  const reveal3 = useTransform(progress, [0.35, 0.5], [0, 1]);
  const reveal4 = useTransform(progress, [0.5, 0.65], [0, 1]);

  const popStyle = (value: any) => ({
    opacity: value,
    scale: useTransform(value, [0, 1], [0.7, 1]),
    y: useTransform(value, [0, 1], [120, 0]),
    rotateX: useTransform(value, [0, 1], [35, 0]),
  });

  return (
    <section
      ref={ref}
      className="bg-gray-100 px-6 md:px-10 py-28 relative overflow-hidden"
    >
      {/* Cinematic Spotlight Background */}
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_70%)]" />
      </motion.div>

      <motion.div
        style={{ scale: sectionScale, opacity: sectionOpacity }}
        className="max-w-6xl mx-auto"
      >
        {/* HEADER */}
        <div className="mb-20 max-w-xl">
          <span className="border border-gray-400 px-4 py-1 rounded-full text-sm text-gray-700">
            How we work
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-6 text-black">
            Let us show you how we drive your brand to new heights
          </h2>

          <p className="text-gray-600 mt-4">
            We follow a structured roadmap to transform ideas into impactful
            digital products.
          </p>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:block relative h-[750px] [perspective:1200px]">
          {/* Cinematic Glowing Dashed Path */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 700"
            fill="none"
          >
            <defs>
              <linearGradient id="gradientPath" x1="0" y1="0" x2="800" y2="700">
                <stop offset="0%" stopColor="#9CA3AF" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
            </defs>

            <motion.path
              d="
                M600 40
                C350 120, 200 180, 250 260
                S550 360, 500 450
                S250 580, 300 650
              "
              stroke="url(#gradientPath)"
              strokeWidth="3"
              strokeDasharray="14 14"
              strokeLinecap="round"
              style={{
                pathLength: smoothProgress,
                opacity: smoothProgress,
              }}
            />
          </svg>

          {/* Cards */}
          <motion.div
            style={popStyle(reveal1)}
            className="absolute top-0 right-10 w-[260px]"
          >
            <CinematicCard {...cards[0]} />
          </motion.div>

          <motion.div
            style={popStyle(reveal2)}
            className="absolute top-40 left-10 w-[260px]"
          >
            <CinematicCard {...cards[1]} />
          </motion.div>

          <motion.div
            style={popStyle(reveal3)}
            className="absolute top-[320px] right-10 w-[260px]"
          >
            <CinematicCard {...cards[2]} />
          </motion.div>

          <motion.div
            style={popStyle(reveal4)}
            className="absolute top-[520px] left-10 w-[260px]"
          >
            <CinematicCard {...cards[3]} />
          </motion.div>
        </div>

        {/* ================= MOBILE (UNCHANGED) ================= */}
        <div className="md:hidden relative border-l-2 border-gray-300 ml-4 space-y-12">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="relative pl-8"
            >
              <span className="absolute -left-[9px] top-2 w-4 h-4 bg-black rounded-full" />
              <CinematicCard {...card} />
            </motion.div>
          ))}
        </div>

        {/* Final Dramatic Text */}
        <motion.p
          style={{
            opacity: useTransform(progress, [0.6, 0.75], [0, 1]),
            y: useTransform(progress, [0.6, 0.75], [40, 0]),
          }}
          className="text-center mt-20 text-gray-700 italic text-lg"
        >
          Ready to be delivered.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ================= CARD COMPONENT ================= */

function CinematicCard({ id, title, text }: any) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        rotateX: 5,
        rotateY: -5,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl p-6 transition duration-300"
    >
      <p className="text-gray-400 text-sm font-medium">{id}</p>
      <h3 className="text-lg font-bold mt-2 text-black">{title}</h3>
      <p className="text-gray-600 mt-2 text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
}
