"use client";

import { motion } from "framer-motion";
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const title = "Google Developer Groups Ranchi";

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 
      animate-gradient bg-[radial-gradient(circle_at_top_left,#4285F4,transparent_30%),radial-gradient(circle_at_bottom_right,#EA4335,transparent_30%)] 
      bg-gradient-to-r from-[#34A853] via-[#FBBC05] to-[#EA4335] bg-[length:200%_200%] bg-[position:0%_50%]"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-white max-w-3xl"
      >
        {/* Logo */}
        <Image
          src="/images/gdgLogo.png"
          alt="GDG Ranchi"
          width={100}
          height={70}
          className=" p-1 mx-auto mb-6 shadow-xl "
        />

        {/* Animated Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex flex-wrap justify-center gap-1">
          {title.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: index * 0.08,
                type: "spring",
                stiffness: 300,
                damping: 12,
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl mb-6">
          Jharkhand • Building a community of developers, innovators, and
          learners.
        </p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold 
          rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 mb-12"
        >
          Join Our Community
          <span className="text-lg">→</span>
        </motion.button>

        {/* Social Links */}
        <div className="flex justify-center gap-8">
          <motion.a
            href="https://x.com/gdgrnc"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 
            text-gray-400 hover:text-white group"
          >
            <Twitter
              size={24}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          </motion.a>

          <motion.a
            href="https://www.instagram.com/gdgranchi/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 
            text-gray-400 hover:text-[#E4405F] group"
          >
            <Instagram
              size={24}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/company/gdgrnc/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 
            text-gray-400 hover:text-[#0A66C2] group"
          >
            <Linkedin
              size={24}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          </motion.a>

          <motion.a
            href="https://www.youtube.com/@GDGRanchi"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 
            text-gray-400 hover:text-[#FF0000] group"
          >
            <Youtube
              size={24}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
