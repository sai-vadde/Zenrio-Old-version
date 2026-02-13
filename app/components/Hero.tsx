"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-white px-5 sm:px-8 md:px-10 py-14 sm:py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* LEFT TEXT */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center md:text-left"
        >
          <span className="inline-block border border-gray-300 px-4 py-1 rounded-full text-xs sm:text-sm mb-6 text-gray-700">
            Welcome to Zenrio Agency
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-[54px] font-extrabold leading-tight text-black">
            WE CRAFT BRANDS
            <br />
            & DIGITAL
            <br />
            EXPERIENCES
          </h1>

          <p className="mt-6 text-gray-700 max-w-lg mx-auto md:mx-0 text-base sm:text-lg">
            Elevate your brand with exceptional design solutions. From branding
            to UI, we bring your vision to life with tailored online design
            services.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-8 bg-black text-white px-6 py-3 rounded-full hover:scale-105 transition"
          >
            Let’s talk ↗
          </Link>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center md:justify-end mt-10 md:mt-0"
        >
          <div className="relative w-full max-w-[380px] sm:max-w-[420px] h-[400px] sm:h-[480px] md:h-[520px] bg-gray-200 rounded-[30px] md:rounded-[40px] overflow-hidden shadow-xl aspect-[4/5]">
            <Image
              src="/hero.png"
              alt="Hero Image"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:left-0 bg-white shadow-lg rounded-xl px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm border">
            <p className="font-semibold text-black">250+ Satisfied</p>
            <p className="text-gray-600">Clients</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
