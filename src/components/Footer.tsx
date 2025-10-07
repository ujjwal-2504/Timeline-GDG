"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";
import { FaG } from "react-icons/fa6";

export default function Footer() {
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Upcoming Events", href: "#events" },
    { name: "Contact", href: "#contact" },
  ];

  const socials = [
    { icon: <FaFacebook />, href: "https://www.facebook.com/gdgrnc/" },
    { icon: <FaTwitter />, href: "https://x.com/gdgrnc" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/gdgranchi/" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A96659640&keywords=google%20developer%20group%20ranchi&origin=RICH_QUERY_SUGGESTION&position=1&searchId=9fef4000-60b6-438c-a905-ceffbfcaa840&sid=Ru_&spellCorrectionEnabled=false" },
    { icon: <FaYoutube />, href: "https://www.youtube.com/@GDGRanchi" },
    { icon: <FaGithub />, href: "https://github.com/GDGRanchi" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className=" text-gray-800 py-12 mt-12 backdrop-blur-2xl"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {/* About */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            GDG Ranchi
          </h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            A vibrant developer community passionate about learning, sharing,
            and building innovative solutions. Join us in our journey of tech,
            networking, and collaboration.
          </p>
        </motion.div>

        {/* Quick Links */}

        {/* Social */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Connect</h2>
          <div className="flex  gap-4 text-gray-800 text-xl">
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
