"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Upcoming Events", href: "#" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-lg bg-white/60 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 font-bold text-xl text-gray-900"
        >
          <img
            src="images/gdgLogo.png"
            alt="GDG Ranchi"
            className="w-12 h-7 "
          />
          GDG Ranchi
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-800">
          {navLinks.map((link, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="relative group"
            >
              <Link href={link.href}>{link.name}</Link>
              <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full transition-all h-0.5 bg-blue-600"></span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="#join"
          className="hidden md:block px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow hover:opacity-90 transition"
        >
          Join Us
        </motion.a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-gray-800"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-64 bg-white/90 shadow-lg flex flex-col items-start p-6 z-40"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 5 }}
                className="py-3 text-lg font-medium text-gray-800"
              >
                <Link href={link.href} onClick={() => setIsOpen(false)}>
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#join"
              onClick={() => setIsOpen(false)}
              className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow hover:opacity-90 transition"
            >
              Join Us
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
