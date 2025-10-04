"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Upcoming Events", href: "#events" },
    { name: "Contact", href: "#contact" },
  ];

  const socials = [
    { icon: <FaFacebook />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaInstagram />, href: "#" },
    { icon: <FaLinkedin />, href: "#" },
    { icon: <FaYoutube />, href: "#" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className=" text-gray-800 py-12 mt-12 backdrop-blur-2xl"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {/* About */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">GDG Ranchi</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            A vibrant developer community passionate about learning, sharing,
            and building innovative solutions. Join us in our journey of tech,
            networking, and collaboration.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-800 text-lg">
            {navLinks.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="hover:text-blue-400 transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Connect</h2>
          <div className="flex gap-4 text-gray-800 text-xl">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="hover:text-blue-400 transition"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-700 text-sm"
      >
        © {new Date().getFullYear()} GDG Ranchi. All rights reserved.
      </motion.div>
    </motion.footer>
  );
}
