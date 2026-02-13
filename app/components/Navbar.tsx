"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [shadow, setShadow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/#about" },
    { name: "Services", href: "/services" },
    { name: "Our Work", href: "/portfolio" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          shadow ? "shadow-md" : ""
        } bg-white/70 backdrop-blur-xl border-b border-white/20`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-4">
          {/* LOGO */}
          <Link href="/" className="text-xl font-bold text-black">
            Zenrio Agency
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-10 text-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative transition ${
                  isActive(link.href)
                    ? "text-black font-semibold"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-black rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* DESKTOP CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-block bg-black text-white px-6 py-2 rounded-full hover:scale-105 transition"
          >
            Contact Us
          </Link>

          {/* HAMBURGER */}
          <button
            className="md:hidden flex flex-col gap-1.5 z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-black transition-all duration-300 hover:text-black ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            />

            {/* SIDE DRAWER */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="fixed top-0 right-0 w-72 h-full bg-white shadow-2xl z-50 p-8 flex flex-col"
            >
              <div className="mt-16 flex flex-col gap-8 text-lg">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`transition ${
                      isActive(link.href)
                        ? "text-black font-semibold"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-6 bg-black text-white text-center px-6 py-3 rounded-full"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
