"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaRegClock, FaMapMarkerAlt } from "react-icons/fa";

export default function UpcomingEventsPage() {
  //const eventDate = new Date("2025-10-11T10:00:00");
  const eventDate = new Date(Date.now() + 10 * 1000);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isStarted, setIsStarted] = useState(false);

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
        setIsStarted(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ✅ Full DevFest Schedule from your PDF
  const seminars = [
    {
      title: "DevFest 2025 Kickoff & Inauguration",
      start: "09:00",
      end: "09:09",
    },
    {
      title: "Welcome Address — Tushar Raj (GDG Ranchi Organizer, Adrosonic)",
      start: "09:09",
      end: "09:21",
    },
    {
      title: "Words of Wisdom — Dr. Indranil Manna (VC, BIT Mesra)",
      start: "09:23",
      end: "09:38",
    },
    {
      title: "Keynote — Dr. A. S. Kiran Kumar (Former ISRO Chairman) : Innovation In Indian Space Programme",
      start: "09:40",
      end: "10:05",
    },
    {
      title: "Keynote — Arun Teja Godavarthi (Google for Developers)",
      start: "10:07",
      end: "10:22",
    },
    {
      title:
        "Talk — Ali Mustufa (Senior Developer Advocate at Pieces) : Artificial Memory: Can an LLM Become You?",
      start: "10:24",
      end: "10:54",
    },
    { title: "Tea & Networking Break", start: "10:54", end: "11:19" },
    {
      title: "Talk — Mohana (GitHub Ambassador)",
      start: "11:19",
      end: "11:32",
    },
    {
      title:
        "Panel Discussion — Digital Trust in the Age of AI & Cyber Threats",
      start: "11:34",
      end: "12:09",
    },
    {
      title: "Talk — Tejas Suresh (Implementation Head, YRI): YRI Intro",
      start: "12:12",
      end: "12:37",
    },
    { title: "Lunch Break", start: "12:37", end: "13:17" },
    {
      title: "Talk — Saurabh Rajpal (Google): Web Walo Ki Baithak",
      start: "13:17",
      end: "13:47",
    },
    {
      title:
        "Talk — Saurabh Mishra (Google Developer Expert, Cloud): Scalable API Testing & Monitoring",
      start: "13:49",
      end: "14:19",
    },
    {
      title: "Samyak Jain (SDE , Opstree Solutions) : Interactive Game / Quiz (with Goodies)",
      start: "14:21",
      end: "14:31",
    },
    {
      title:
        "Talk — Aanchal Mishra (Postman): You Can’t Do AI Without Quality APIs: The MCP Evolution",
      start: "14:33",
      end: "15:03",
    },
    { title: "Happy Hour & Booth Interactions", start: "15:03", end: "15:33" },
    {
      title:
        "Talk — Imran Roshan (Deloitte, GDE-GCP) : WTH - Using AI for Security on GCP",
      start: "15:33",
      end: "16:03",
    },
    {
      title:
        "Talk — Ashish Kumar Verma (AI Engineer, GDE) : Neurons to Networks: Orchestrating Memory",
      start: "16:05",
      end: "16:35",
    },
    {
      title:
        "Talk — Abhishek Sharma (Lead Cloud Engineer @ Searce, GDE-GCP) : Accelerating Enterprise Development",
      start: "16:37",
      end: "17:07",
    },
    {
      title: "Closing Ceremony + Group Photo + Goodies Distribution",
      start: "17:07",
      end: "17:30",
    },
  ];

  const getCurrentSessionIndex = () => {
    const now = new Date();
    for (let i = 0; i < seminars.length; i++) {
      const [startH, startM] = seminars[i].start.split(":").map(Number);
      const [endH, endM] = seminars[i].end.split(":").map(Number);
      const startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        startH,
        startM
      );
      const endTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        endH,
        endM
      );
      if (now >= startTime && now < endTime) return i;
    }
    return -1;
  };

  const currentSessionIndex = getCurrentSessionIndex();

  const Particle = ({
    x,
    y,
    delay,
    size,
    color,
  }: {
    x: number;
    y: number;
    delay: number;
    size: number;
    color: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, x, y }}
      animate={{
        opacity: [0, 0.5, 0],
        y: [y, y - Math.random() * 60, y - Math.random() * 120],
        x: [x, x + Math.random() * 20 - 10, x + Math.random() * 30 - 15],
      }}
      transition={{
        duration: 2 + Math.random() * 1.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute rounded-full`}
      style={{
        width: size,
        height: size,
        background: color,
        filter: "blur(3px)",
      }}
    />
  );

  // Circular Countdown setup
  const circleSize = 160;
  const strokeWidth = 12;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const getStrokeDashoffset = (progress: number) =>
    circumference - progress * circumference;

  const dayProgress = timeLeft.days / 30;
  const hourProgress = timeLeft.hours / 24;
  const minuteProgress = timeLeft.minutes / 60;
  const secondProgress = timeLeft.seconds / 60;

  return (
    <main
      className="font-ProductSans relative min-h-screen flex flex-col items-center justify-center text-white overflow-x-hidden"
      style={{
        backgroundImage: "url('/images/bgwebdevfest.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 pointer-events-none"></div>

      <motion.div
        className="relative z-10 w-full px-6 md:px-12 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mt-16 mb-8 text-center tracking-tight"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          🚀 GDG Ranchi DevFest 2025
        </motion.h1>

        <motion.div
  className="flex flex-col md:flex-row justify-center items-center gap-8 text-gray-200 mb-12 text-lg md:text-2xl"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5, duration: 1 }}
>
  {/* Event Time */}
  <div className="flex items-center gap-3">
    <FaRegClock className="text-indigo-400" size={24} />
    <span>11th October 2025, 9:00 AM – 5:30 PM</span>
  </div>

  {/* Location with Google Maps link */}
  <div className="flex items-center gap-3">
    <FaMapMarkerAlt className="text-indigo-400" size={24} />
    <a
      href="https://maps.app.goo.gl/DLJsc1JiLXWNsZcL6"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-indigo-400 transition-colors underline underline-offset-4"
    >
      GP Birla Auditorium, BIT Mesra
    </a>
  </div>

  {/* Add to Calendar */}
  <motion.a
    href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=GDG%20Ranchi%20DevFest%202025&details=Join%20us%20at%20GP%20Birla%20Auditorium%2C%20BIT%20Mesra%20for%20DevFest%202025!&location=GP%20Birla%20Auditorium%2C%20BIT%20Mesra&dates=20251011T090000/20251011T173000"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-6 py-2 border border-indigo-500 rounded-full text-sm md:text-base text-indigo-400 hover:bg-indigo-600 hover:text-white transition shadow-md"
  >
    📅 Add to Calendar
  </motion.a>
</motion.div>


        {/* Countdown before event */}
        {!isStarted && (
          <motion.div className="flex flex-wrap justify-center gap-12 mb-16">
            {[
              { label: "Days", value: timeLeft.days, progress: dayProgress },
              { label: "Hours", value: timeLeft.hours, progress: hourProgress },
              {
                label: "Minutes",
                value: timeLeft.minutes,
                progress: minuteProgress,
              },
              {
                label: "Seconds",
                value: timeLeft.seconds,
                progress: secondProgress,
              },
            ].map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                <svg
                  width={circleSize}
                  height={circleSize}
                  className="rotate-[-90deg]"
                >
                  <circle
                    cx={circleSize / 2}
                    cy={circleSize / 2}
                    r={radius}
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth={strokeWidth}
                    fill="none"
                  />
                  <motion.circle
                    cx={circleSize / 2}
                    cy={circleSize / 2}
                    r={radius}
                    stroke="url(#grad)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={getStrokeDashoffset(item.progress)}
                    transition={{ duration: 1, ease: "linear" }}
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-4xl font-bold">{item.value}</p>
                  <p className="uppercase text-sm text-gray-300">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Event Started Section */}
        {isStarted && (
          <div className="relative w-full flex flex-col items-center justify-start pt-20 pb-20 min-h-[80vh]">
            {[...Array(25)].map((_, i) => (
              <Particle
                key={i}
                x={Math.random() * window.innerWidth - window.innerWidth / 2}
                y={Math.random() * 200 - 50}
                delay={i * 0.05}
                size={Math.random() * 5 + 2}
                color="rgba(255,255,255,0.15)"
              />
            ))}

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-12 text-center tracking-tight drop-shadow-lg"
            >
              💼 DevFest 2025 — Live Sessions
            </motion.h1>

            <div className="w-full max-w-4xl flex flex-col gap-4">
              <AnimatePresence>
                {seminars.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: i === currentSessionIndex ? 1.03 : 1,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    className={`p-5 rounded-lg cursor-pointer border-l-4 transition-all duration-300 ${
                      i === currentSessionIndex
                        ? "border-indigo-500 bg-gray-900/80 text-white shadow-md"
                        : "border-gray-600 bg-gray-800/40 text-gray-300 hover:bg-gray-800/60"
                    }`}
                  >
                    <p className="font-semibold text-lg md:text-xl">
                      {s.title}
                    </p>
                    <p className="text-sm md:text-base mt-1 text-gray-400">
                      {s.start} - {s.end}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              className="mt-12"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/"
                className="inline-block px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg rounded-full shadow-md hover:shadow-indigo-500/50 transition"
              >
                🎉 See Past Events
              </Link>
            </motion.div>
          </div>
        )}
      </motion.div>
    </main>
  );
}
