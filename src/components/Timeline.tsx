"use client";
import { motion } from "framer-motion";

import * as React from "react";
import { useRef, useEffect } from "react";
import ImageSlider from "./ImageSlider";
import { CalendarCheck, MapPinCheck, BadgeInfo } from "lucide-react";
import events from "../data/timeline.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Event = {
  title: string;
  about: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  institute?: string;
  slug: string;
  images?: string[];
  timeline?: string;
};

export default function Timeline() {
  const title = "Google Developer Groups Ranchi";
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = timelineRef.current?.querySelectorAll(".timeline-event");
    if (!sections) return;

    sections.forEach((section) => {
      const meta = section.querySelector(".meta") as HTMLElement | null;
      const card = section.querySelector(".card") as HTMLElement | null;
      const line = section.querySelector(".connector") as HTMLElement | null;

      if (meta) {
        // center metadata initially
        gsap.set(meta, { xPercent: -50, left: "50%", position: "relative" });
      }

      if (card) {
        gsap.set(card, { opacity: 0, y: 200 });
      }

      if (line) {
        // IMPORTANT: animate from the top of the connector (which is aligned
        // to the bottom edge of the card because we use top-full)
        gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      // Step 1: metadata enters at center
      if (meta) {
        tl.fromTo(
          meta,
          { opacity: 0, scale: 0.8 },
          { opacity: 0.9, scale: 1.05, duration: 1.1, ease: "power3.out" }
        );
      }

      // Step 2: image enters from bottom
      if (card) {
        tl.fromTo(
          card,
          { y: 200, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1.02, duration: 1.1, ease: "power3.out" },
          "+=0.25"
        );
      }

      // Step 3: push metadata left while image takes its spot
      if (meta) {
        tl.to(
          meta,
          {
            xPercent: 0,
            left: "0%",
            scale: 1,
            duration: 0.9,
            ease: "power2.inOut",
          },
          "<"
        );
      }

      if (card) {
        tl.to(card, { scale: 1, duration: 0.7, ease: "power2.inOut" }, "-=0.2");
      }

      // Step 4: extend connector line AFTER both cards settled
      if (line) {
        tl.to(
          line,
          {
            scaleY: 2.5,
            duration: 1,
            ease: "power2.inOut",
          },
          "+=0.05"
        );
      }
    });

    // refresh ScrollTrigger when layout changes (images load, etc.)
    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      ref={timelineRef}
      className=" timeline-bg relative py-16 px-4 sm:px-6 lg:px-8 "
    >
      <div className="flex justify-center gap-6 sm:gap-8 flex-wrap"></div>

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-black text-4xl md:text-4xl font-extrabold mb-4 flex flex-wrap justify-center gap-1">
          <span className="bg-clip-text font-productSans">
            {title.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: i * 0.08,
                  type: "spring",
                  stiffness: 300,
                  damping: 12,
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-black  sm:text-lg md:text-xl mb-6 px-2 sm:px-0">
          Jharkhand • Building a community of developers, innovators, and
          learners.
        </p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold 
      rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 mb-12 text-sm sm:text-base"
        >
          Join Our Community
          <span className="text-lg sm:text-xl">→</span>
        </motion.button>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black">
          Our Journey
        </h2>
        <p className="mt-3 text-sm sm:text-base text-black/80 max-w-2xl mx-auto ">
          A quick look at our milestones and the events that shaped GDG Ranchi.
        </p>
      </div>

      {/* Events */}
      <div className="max-w-6xl mx-auto relative flex flex-col gap-y-36">
        {(events as Event[]).map((ev, idx) => (
          <div
            key={ev.slug}
            className="timeline-event relative flex flex-col md:flex-row items-start gap-8"
          >
            {/* Metadata card */}
            <div className="meta w-full md:w-5/12">
              <div className="group relative bg-black p-8 rounded-3xl shadow-2xl hover:shadow-xl text-center md:text-left overflow-hidden">
                <div className="relative z-10">
                  <header className="flex items-center gap-4 mb-4 justify-center md:justify-start">
                    <CalendarCheck className="w-7 h-7 text-emerald-400 " />
                    <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                      {ev?.timeline || ev.date}
                    </h3>
                  </header>

                  <p className="text-xl md:text-3xl font-semibold text-white mb-4 leading-tight">
                    {ev.title}
                  </p>

                  <div className="space-y-3 mt-6">
                    <div className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors justify-center md:justify-start">
                      <MapPinCheck className="w-5 h-5 text-emerald-400" />
                      <p className="text-base">{ev.location}</p>
                    </div>

                    <div className="flex items-start gap-2.5 text-white/70 justify-center md:justify-start">
                      <BadgeInfo className="text-lg text-blue-300" />
                      <p className="text-sm leading-relaxed flex-1">
                        {ev.about}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image card with connector anchored at top-full (so the connector's top aligns to card bottom) */}
            <div className="card w-full md:w-7/12 relative">
              <div className="bg-[#0f1720] border border-white/6 rounded-2xl p-5 shadow-2xl">
                <ImageSlider
                  images={ev.images || []}
                  alt={ev.title}
                  className="h-[300px] sm:h-[300px] md:h-[350px]"
                  showDots
                  showControls
                  showCounter
                />
              </div>

              {/* Connector line: TOP = 100% (immediately below the card); transform origin = top center */}
              {idx < (events as Event[]).length - 1 && (
                <div
                  className="
      absolute top-full
      w-[3px] h-36
      bg-gradient-to-b from-green-400 via-blue-500 to-purple-600
      connector rounded-full origin-top
      left-1/2 -translate-x-1/2 md:left-1/9 md:-translate-x-[65%]
    "
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
