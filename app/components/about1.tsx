"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AgencyIntroSection() {
  return (
    <section className="w-full bg-neutral-100 py-16 px-6">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Top intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mb-4 rounded-full bg-zinc-500 px-4 py-1 text-sm font-medium">
              About us
            </span>

            <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-neutral-400">
              Meet Zenrio:
              <br />
              Your Design Partners
            </h2>

            <p className="mt-6 max-w-xl text-black">
              We’re not just designers — we’re creators, problem solvers, and
              your brand’s best friends. At Zenrio, we turn ideas into seamless
              digital experiences that help your business grow.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-200"
          >
            <Image
              src="https://placehold.co/400x400" // replace with your asset
              alt="Zenrio team"
              fill
              className="object-cover grayscale"
            />
          </motion.div>
        </div>

        {/* Stats + services block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left stat card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative lg:col-span-2 rounded-3xl bg-black p-10 text-white overflow-hidden"
          >
            {/* Decorative waves */}
            <div className="absolute inset-0 opacity-30">
              <svg
                viewBox="0 0 600 300"
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,150 C150,50 300,250 600,150"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M0,180 C200,80 350,280 600,180"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="relative z-10">
              <p className="text-5xl font-semibold">40%</p>
              <p className="mt-2 text-neutral-300">increased growth revenues</p>

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
          </motion.div>

          {/* Right image card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-neutral-200"
          >
            <Image
              src="https://placehold.co/200" // replace with your asset
              alt="Zenrio collaboration"
              fill
              className="object-cover grayscale"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
