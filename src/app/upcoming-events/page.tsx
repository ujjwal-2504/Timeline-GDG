"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaRegClock,
  FaRegCalendarAlt,
  FaRegHourglass,
  FaStopwatch,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function UpcomingEventsPage() {
  const eventDate = new Date("2025-10-11T10:00:00");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // capture initial total seconds once on mount
  const initialTotalSecondsRef = useRef<number | null>(null);
  useEffect(() => {
    const now = Date.now();
    const initial = Math.max(Math.floor((eventDate.getTime() - now) / 1000), 0);
    initialTotalSecondsRef.current = initial || 1; // avoid 0
  }, [eventDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / (1000 * 60)) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timerIcons = {
    days: <FaRegCalendarAlt size={28} />,
    hours: <FaRegClock size={28} />,
    minutes: <FaRegHourglass size={28} />,
    seconds: <FaStopwatch size={28} />,
  };

  // --- particle emission logic (one particle per second) - unchanged from previous working version ---
  const [fallingParticles, setFallingParticles] = useState<
    { id: number; sx: number; sy: number; ex: number; ey: number }[]
  >([]);
  const lastTotalRef = useRef<number | null>(null);

  // derive current total seconds remaining from timeLeft
  const currentTotalSeconds = useRef(
    timeLeft.days * 24 * 3600 +
      timeLeft.hours * 3600 +
      timeLeft.minutes * 60 +
      timeLeft.seconds
  );
  // keep updated
  currentTotalSeconds.current =
    timeLeft.days * 24 * 3600 +
    timeLeft.hours * 3600 +
    timeLeft.minutes * 60 +
    timeLeft.seconds;

  useEffect(() => {
    // initialize lastTotalRef on first run
    if (lastTotalRef.current === null) {
      lastTotalRef.current = currentTotalSeconds.current;
      return;
    }

    const prev = lastTotalRef.current;
    const now = currentTotalSeconds.current;

    if (now < prev) {
      const diff = Math.min(prev - now, 6); // defensive cap
      for (let k = 0; k < diff; k++) {
        const id = Date.now() + Math.floor(Math.random() * 1000) + k;
        const sx = 98 + (Math.random() * 6 - 3);
        const sy = 150 + (Math.random() * 6 - 3);
        const bx = 70 + Math.random() * 60 + (Math.random() * 2 - 1);
        const by = 245 + Math.random() * 10 - k * 0.5;

        setFallingParticles((arr) => [...arr, { id, sx, sy, ex: bx, ey: by }]);

        setTimeout(() => {
          setFallingParticles((arr) => arr.filter((p) => p.id !== id));
        }, 1100);
      }
    }

    lastTotalRef.current = now;
  }, [timeLeft]);

  // --- compute progress for sand (based on initial total seconds captured on mount) ---
  const initialTotal = initialTotalSecondsRef.current ?? 1;
  const currentTotal = Math.max(currentTotalSeconds.current, 0);
  const progress = Math.max(0, Math.min(1, currentTotal / initialTotal)); // proportion remaining (1 -> full top; 0 -> all down)
  const topScale = progress;
  const bottomScale = 1 - progress;

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: "url('/auditorium.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 pointer-events-none"></div>

      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          🚀 GDG Ranchi DevFest 2025
        </motion.h1>

        {/* Event Info */}
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-6 text-gray-200 mb-12 text-lg md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="flex items-center gap-3">
            <FaRegClock className="text-indigo-400" size={24} />
            <span>11th October 2025, 10:00 AM</span>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-indigo-400" size={24} />
            <span>GP Birla Auditorium, BIT Mesra</span>
          </div>
        </motion.div>

        {/* Hourglass ABOVE the timer */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {/* === Transparent mirror-like SVG hourglass (unchanged look; sand animation now driven by progress) === */}
          <svg
            width="200"
            height="300"
            viewBox="0 0 200 300"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Hourglass"
          >
            <defs>
              {/* subtle transparent glass gradient */}
              <linearGradient id="glassTransparent" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                <stop offset="30%" stopColor="#e6f0fb" stopOpacity="0.10" />
                <stop offset="60%" stopColor="#cfdbe8" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.12" />
              </linearGradient>

              {/* soft chrome edge */}
              <linearGradient id="edgeGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                <stop offset="50%" stopColor="rgba(0,0,0,0.2)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
              </linearGradient>

              {/* sweeping highlight for mirror effect (clipped to glass) */}
              <linearGradient id="sweep" x1="0" x2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="45%" stopColor="rgba(255,255,255,0.85)" />
                <stop offset="55%" stopColor="rgba(255,255,255,0.55)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>

              {/* sand gradient */}
              <linearGradient id="sandGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#FFEA7A" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>

              {/* clip for glass silhouette */}
              <clipPath id="glassClip">
                <path d="M50 20 L150 20 L100 150 L150 280 L50 280 L100 150 Z" />
              </clipPath>

              {/* small blur for inner glass depth */}
              <filter
                id="innerBlur"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="1.2" result="b" />
                <feBlend in="SourceGraphic" in2="b" mode="normal" />
              </filter>
            </defs>

            {/* outer frame (keeps same coordinates, but softer) */}
            <g>
              <line
                x1="50"
                y1="20"
                x2="150"
                y2="20"
                stroke="rgba(0,0,0,0.85)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <line
                x1="50"
                y1="280"
                x2="150"
                y2="280"
                stroke="rgba(0,0,0,0.85)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <line
                x1="50"
                y1="20"
                x2="100"
                y2="150"
                stroke="rgba(0,0,0,0.85)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <line
                x1="150"
                y1="20"
                x2="100"
                y2="150"
                stroke="rgba(0,0,0,0.85)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <line
                x1="50"
                y1="280"
                x2="100"
                y2="150"
                stroke="rgba(0,0,0,0.85)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <line
                x1="150"
                y1="280"
                x2="100"
                y2="150"
                stroke="rgba(0,0,0,0.85)"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </g>

            {/* rounded caps (slightly lighter) */}
            <ellipse
              cx="100"
              cy="20"
              rx="55"
              ry="10"
              fill="none"
              stroke="rgba(0,0,0,0.85)"
              strokeWidth="8"
            />
            <ellipse
              cx="100"
              cy="280"
              rx="55"
              ry="10"
              fill="none"
              stroke="rgba(0,0,0,0.85)"
              strokeWidth="8"
            />

            {/* connecting vertical rails */}
            <line
              x1="60"
              y1="40"
              x2="60"
              y2="260"
              stroke="rgba(0,0,0,0.9)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="140"
              y1="40"
              x2="140"
              y2="260"
              stroke="rgba(0,0,0,0.9)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* glass interior - transparent fill clipped to silhouette */}
            <g clipPath="url(#glassClip)" filter="url(#innerBlur)">
              <rect
                x="50"
                y="20"
                width="100"
                height="260"
                fill="url(#glassTransparent)"
              />
              {/* subtle chrome edge inside */}
              <rect
                x="50"
                y="20"
                width="100"
                height="260"
                fill="url(#edgeGrad)"
                opacity="0.06"
              />
              {/* sweeping mirror highlight (animated) */}
              <rect
                x="-220"
                y="-20"
                width="200"
                height="340"
                fill="url(#sweep)"
                opacity="0.75"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  from="-220 0"
                  to="260 0"
                  dur="3.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0.75;0"
                  dur="3.8s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>

            {/* subtle inner glossy streak to read as glass (non-intrusive) */}
            <path
              d="M70 36 C86 76, 86 116, 70 156"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />

            {/* Top sand*/}
            <motion.polygon
              points="60,40 140,40 100,150"
              fill="url(#sandGrad)"
              style={{ transformOrigin: "100px 40px" }}
              animate={{ scaleY: topScale }}
              transition={{ duration: 1, ease: "linear" }}
            />

            {/* Bottom sand*/}
            {/* <motion.polygon
              points="60,260 140,260 100,150"
              fill="url(#sandGrad)"
              style={{ transformOrigin: "100px 260px" }}
              animate={{ scaleY: bottomScale }}
              transition={{ duration: 1, ease: "linear" }}
            /> */}
            <g clipPath="url(#glassClip)">
              <motion.polygon
                points="60,260 140,260 100,150"
                fill="url(#sandGrad)"
                style={{ transformOrigin: "100px 260px" }}
                animate={{ scaleY: Math.max(bottomScale, 0.05) }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </g>

            {/* Falling particles (dynamic ones emitted each second) */}
            {fallingParticles.map((p) => (
              <motion.circle
                key={p.id}
                cx={p.sx}
                cy={p.sy}
                r={3}
                fill="#FFD94D"
                initial={{ cx: p.sx, cy: p.sy, opacity: 1 }}
                animate={{ cx: p.ex, cy: p.ey, opacity: 0 }}
                transition={{ duration: 1, ease: "linear" }}
              />
            ))}
          </svg>
          {/* === end SVG hourglass === */}
        </motion.div>

        {/* Timer */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {Object.entries(timeLeft).map(([label, value], i) => {
            const typedLabel = label as keyof typeof timerIcons;
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm px-6 py-8 rounded-2xl shadow-lg border border-white/20"
              >
                <div className="text-indigo-400 mb-2">
                  {timerIcons[typedLabel]}
                </div>
                <p className="text-5xl md:text-6xl font-bold">
                  {value.toString().padStart(2, "0")}
                </p>
                <p className="uppercase text-sm text-gray-300 mt-2">{label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="inline-block px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-indigo-500/50 transition"
          >
            🎉 See Past Events
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
