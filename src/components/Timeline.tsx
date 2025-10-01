"use client";

import * as React from "react";
import { useRef, useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import { GraduationCap, CalendarCheck, MapPinCheck } from "lucide-react";
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
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = timelineRef.current?.querySelectorAll(".timeline-event");
    if (!sections) return;

    sections.forEach((section, idx) => {
      const meta = section.querySelector(".meta") as HTMLElement;
      const card = section.querySelector(".card") as HTMLElement;
      const line = section.querySelector(".connector") as HTMLElement;

      gsap.set(meta, { xPercent: -50, left: "50%", position: "relative" });
      gsap.set(card, { opacity: 0, y: 200 });
      gsap.set(line, { scaleY: 0, transformOrigin: "top center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      // Step 1: metadata enters at center
      tl.fromTo(
        meta,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.8, scale: 1.1, duration: 1.2, ease: "power3.out" }
      );

      // Step 2: image enters from bottom
      tl.fromTo(
        card,
        { y: 200, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1.05, duration: 1.2, ease: "power3.out" },
        "+=0.3"
      );

      // Step 3: push metadata left while image takes its spot
      tl.to(
        meta,
        {
          xPercent: 0,
          left: "0%",
          scale: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        "<"
      );

      tl.to(card, { scale: 1, duration: 0.8, ease: "power2.inOut" }, "-=0.2");

      // Step 4: extend connector line AFTER both cards settled
      if (line) {
        tl.to(line, {
          scaleY: 1,
          duration: 1,
          ease: "power2.inOut",
        });
      }
    });
  }, []);

  return (
    <section
      ref={timelineRef}
      className="timeline-bg relative py-16 px-4 sm:px-6 lg:px-8 bg-[#071018]"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black">
          Our Journey
        </h2>
        <p className="mt-3 text-sm sm:text-base text-black max-w-2xl mx-auto ">
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
              <div className="group relative bg-gradient-to-br from-[#0f1720] via-[#1a2332] to-[#0f1720] p-8 rounded-3xl shadow-2xl border border-white/20 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-emerald-500/20 hover:shadow-xl text-center md:text-left overflow-hidden">
                {/* Ambient glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Subtle grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                ></div>

                <div className="relative z-10">
                  <header className="flex items-center gap-4 mb-4 justify-center md:justify-start">
                    <div className="bg-emerald-500/10 p-3 rounded-xl group-hover:bg-emerald-500/20 transition-colors duration-300 backdrop-blur-sm">
                      <CalendarCheck className="w-7 h-7 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text">
                      {ev?.timeline || ev.date}
                    </h3>
                  </header>

                  <p className="text-xl md:text-3xl font-semibold text-white mb-4 leading-tight">
                    {ev.title}
                  </p>

                  <div className="space-y-3 mt-6">
                    <div className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors group/location justify-center md:justify-start">
                      <div className="bg-emerald-500/10 p-2 rounded-lg">
                        <MapPinCheck className="w-5 h-5 text-emerald-400" />
                      </div>
                      <p className="text-base">{ev.location}</p>
                    </div>

                    <div className="flex items-start gap-2.5 text-white/70 justify-center md:justify-start">
                      <div className="bg-white/5 p-2 rounded-lg mt-0.5">
                        <svg
                          className="w-5 h-5 text-white/60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm leading-relaxed flex-1">
                        {ev.about}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full opacity-50"></div>
              </div>
            </div>

            {/* Image card */}
            <div className="card w-full md:w-7/12">
              <div className="bg-[#0f1720] border border-white/6 rounded-2xl p-5 shadow-2xl">
                <ImageSlider
                  images={ev.images || []}
                  alt={ev.title}
                  className="h-[300px] sm:h-[300px] md:h-[300px]"
                  showDots
                  showControls
                  showCounter
                />
              </div>
            </div>

            {/* Connector line (appears AFTER this section animates) */}
            {idx < (events as Event[]).length - 1 && (
              <div className="absolute left-1/2 top-full w-[3px] h-36 bg-gradient-to-b from-green-400 via-blue-500 to-purple-600 transform -translate-x-1/2 connector rounded-full" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
