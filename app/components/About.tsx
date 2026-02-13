"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="bg-neutral-100 px-6 md:px-10 py-24">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* ===== TOP INTRO ===== */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mb-5 rounded-full border border-neutral-400 px-4 py-1 text-sm text-neutral-600">
              About us
            </span>

            <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-black">
              Meet Zenrio —
              <br />
              Your Creative Growth Partners
            </h2>

            <p className="mt-6 max-w-xl text-neutral-700 leading-relaxed">
              We’re not just designers. We’re creators, strategists, and
              builders. At Zenrio, we transform ideas into cinematic digital
              experiences that elevate brands and drive measurable growth.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-3xl overflow-hidden"
          >
            <Image
              src="/about-top.jpg"
              alt="Zenrio team"
              fill
              className="object-cover grayscale hover:scale-105 transition duration-700"
            />
          </motion.div>
        </div>

        {/* ===== STATS + IMAGE ===== */}
        <div className="grid grid-cols-1  gap-10 items-stretch w-full relative">
          {/* ===== CINEMATIC STAT BLOCK ===== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative rounded-3xl bg-black text-white overflow-hidden px-8 md:px-14 py-12 md:py-16"
          >
            {/* Decorative subtle waves */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <svg
                viewBox="0 0 600 300"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,150 C150,60 300,240 600,150"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
                <path
                  d="M0,180 C200,90 350,260 600,180"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-lg">
              <p className="text-5xl md:text-6xl font-bold tracking-tight">
                40%
              </p>

              <p className="mt-4 text-neutral-300 max-w-md">
                Average increase in client growth revenue after partnering with
                Zenrio.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Marketing",
                  "Web Design",
                  "Product Design",
                  "SEO",
                  "Brand Positioning",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Embedded Image (Bottom Right) */}
            <div className="absolute bottom-0 right-0 w-[35%] h-[65%] hidden md:block">
              <div className="relative w-full h-full overflow-hidden rounded-tl-[60px]">
                <Image
                  src="/about-bottom.jpg"
                  alt="Zenrio collaboration"
                  fill
                  className="object-cover grayscale"
                />

                {/* Gradient fade so image blends into card */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
              </div>
            </div>

            {/* MOBILE IMAGE VERSION */}
            <div className="relative mt-10 md:hidden w-full h-[220px] rounded-2xl overflow-hidden">
              <Image
                src="/about-bottom.jpg"
                alt="Zenrio collaboration"
                fill
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>
          </motion.div>

          {/* RIGHT IMAGE CARD */}
        </div>
      </div>
    </section>
  );
}
