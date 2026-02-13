"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-8 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">Zenrio Agency</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            We craft modern digital experiences that help brands grow. From
            websites to full-scale platforms, we build with performance and
            creativity in mind.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-white transition">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-lg">Contact</h3>
          <p className="text-gray-400 text-sm mb-2">
            📧 ganispeaks28@gmail.com
          </p>
          <p className="text-gray-400 text-sm mb-4">📍 India</p>

          <Link
            href="/contact"
            className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Let’s Talk
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Zenrio Agency. All rights reserved.
      </div>
    </footer>
  );
}
