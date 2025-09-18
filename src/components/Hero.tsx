"use client";

import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 text-center bg-gradient-to-b from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Profile Image */}
      <motion.img
        src="/images/profile.png"
        alt="GDG Ranchi"
        className="w-44 h-44 mx-auto rounded-full border-4 border-gray-300 shadow-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      {/* Name & Location */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-8 text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-green-500 to-red-500 bg-clip-text text-transparent tracking-tight"
      >
        Google Developer Group Ranchi
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-3 text-2xl font-semibold text-gray-700 dark:text-gray-300"
      >
        Ranchi, Jharkhand
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="mt-6 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300"
      >
        <strong>GDG Ranchi</strong> is a local community of developers passionate
        about Google technologies.  
        We host{" "}
        <span className="font-semibold text-blue-600 dark:text-blue-400">
          DevFest 2024 → 2025
        </span>{" "}
        with inspiring sessions on Cloud, Web, and App Development to bring
        together{" "}
        <span className="font-medium text-green-600 dark:text-green-400">
          developers, learners, and innovators
        </span>
        .
      </motion.p>

      {/* Social Links */}
      <motion.div
        className="flex justify-center gap-8 mt-8 text-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <a
          href="https://x.com/gdgrnc"
          target="_blank"
          className="hover:text-blue-500 transition-colors"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.linkedin.com/company/gdgrnc/posts/?feedView=all"
          target="_blank"
          className="hover:text-blue-700 transition-colors"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.youtube.com/@GDGRanchi"
          target="_blank"
          className="hover:text-red-600 transition-colors"
        >
          <FaYoutube />
        </a>
        <a
          href="https://www.instagram.com/gdgranchi/"
          target="_blank"
          className="hover:text-pink-500 transition-colors"
        >
          <FaInstagram />
        </a>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-10"
      >
        <a
          href="#timeline"
          className="px-6 py-3 rounded-full bg-blue-600 text-white text-lg font-semibold shadow-md hover:bg-blue-700 transition"
        >
          🚀 Join DevFest 2025
        </a>
      </motion.div>
    </section>
  );
}
