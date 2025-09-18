"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gray-50 dark:bg-gray-900 py-6 text-center border-t border-gray-300 dark:border-gray-700"
    >
      {/* Gradient shimmer text */}
      <motion.p
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="text-sm font-medium bg-gradient-to-r from-blue-600 via-green-500 to-red-500 bg-[length:200%_200%] bg-clip-text text-transparent"
      >
        © {new Date().getFullYear()} Google Developer Group Ranchi. All rights reserved.
      </motion.p>
    </motion.footer>
  );
}
