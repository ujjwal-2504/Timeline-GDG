"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const title = "Google Developer Groups Ranchi";

  return (
    <section
      className="relative sm:min-h-[100vh] min-h-80 flex flex-col justify-center items-center text-center
        animate-gradient bg-[radial-gradient(circle_at_top_left,#4285F4,transparent_30%),radial-gradient(circle_at_bottom_right,#EA4335,transparent_30%)]
        bg-gradient-to-r from-[#34A853] via-[#FBBC05] to-[#EA4335]
        bg-[length:200%_200%] bg-[position:0%_50%] overflow-hidden"
    >
      <svg
        className="w-[120px] absolute left-30 top-1  rotate-40"
        fill="#000000"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <title>paper-plane</title>{" "}
          <path d="M30.669 1.665l-0.014-0.019c-0.042-0.082-0.096-0.152-0.16-0.21l-0.001-0c-0.013-0.011-0.032-0.005-0.046-0.015-0.020-0.016-0.028-0.041-0.050-0.055-0.107-0.066-0.236-0.106-0.374-0.106-0.017 0-0.033 0.001-0.050 0.002l0.002-0c-0.035 0.006-0.065 0.014-0.095 0.024l0.005-0.001c-0.095 0.007-0.184 0.030-0.264 0.067l0.005-0.002-27.999 16c-0.227 0.132-0.378 0.374-0.378 0.652 0 0.3 0.176 0.559 0.431 0.679l0.005 0.002 9.564 4.414v6.904c0 0 0 0 0 0 0 0.414 0.336 0.75 0.75 0.75 0.153 0 0.296-0.046 0.414-0.125l-0.003 0.002 6.259-4.106 9.015 4.161c0.092 0.043 0.2 0.068 0.314 0.068h0c0 0 0.001 0 0.001 0 0.395 0 0.719-0.306 0.747-0.695l0-0.002 2-27.999c0.001-0.014-0.008-0.025-0.008-0.039 0-0.010 0.001-0.021 0.001-0.032 0-0.115-0.026-0.225-0.073-0.322l0.002 0.004zM26.495 4.867l-14.716 16.82-8.143-3.758zM12.75 28.611v-4.823l4.315 1.992zM27.33 28.865l-8.32-3.841c-0.024-0.015-0.038-0.042-0.064-0.054l-5.722-2.656 15.87-18.139z"></path>{" "}
        </g>
      </svg>
      {/* Hero Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-img.png"
          alt="GDG Ranchi Hero"
          fill
          priority
          className="object-contain sm:object-contain w-full h-full opacity-80 "
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-white max-w-4xl px-4 sm:px-6"
      >
        {/* Logo */}
        {/* <Image
          src="/images/gdgLogo.png"
          alt="GDG Ranchi"
          width={100}
          height={70}
          className="p-1 mx-auto mb-1 shadow-xl"
        /> */}
      </motion.div>
      <svg
        className="w-[30px] sm:w-[120px] absolute right-10 bottom-1 rotate-30 "
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12C7.97056 12 12 7.97056 12 3Z"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
    </section>
  );
}
