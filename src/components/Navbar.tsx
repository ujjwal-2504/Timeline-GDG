"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md z-50"
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo + Title */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="flex items-center gap-3"
        >
          <img
            src="/images/profile.png"
            alt="GDG Ranchi"
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
          <span className="font-bold text-lg bg-gradient-to-r from-blue-600 via-green-500 to-red-500 bg-clip-text text-transparent">
            GDG Ranchi
          </span>
        </motion.div>

        {/* Links */}
        <div className="flex gap-6 font-medium text-gray-700 dark:text-gray-200">
          {navLinks.map((link, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group"
            >
              <Link href={link.href} className="hover:text-blue-600 transition-colors">
                {link.name}
              </Link>
              {/* Underline Animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-600 via-green-500 to-red-500 transition-all group-hover:w-full"></span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
