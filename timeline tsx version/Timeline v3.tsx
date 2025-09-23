"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import * as React from "react";
import ImageSlider from "./ImageSlider";
import { easeOut } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  GraduationCap,
  ArrowRight,
  X,
} from "lucide-react";
import events from "../data/timeline.json";

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
};

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const modalVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.97, y: -12 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.28, ease: easeOut },
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.97,
      y: 12,
      transition: { duration: 0.18 },
    },
  };

  const getYear = (date?: string) => {
    if (!date) return "";
    const m = date.match(/\d{4}/);
    return m ? m[0] : "";
  };

  return (
    <section id="timeline" className="relative py-20 px-6 bg-[#071018]">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-white"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          Our Journey
        </motion.h2>
        <motion.p
          className="mt-3 text-sm md:text-base text-white/75 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          A quick look at our milestones and the events that shaped GDG Ranchi.
        </motion.p>
      </div>

      {/* Grid: left (5) | center line (2) | right (5) */}
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* vertical center line */}
          <div
            aria-hidden
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-[4px] rounded"
            style={{
              background: "linear-gradient(180deg,#22c55e,#16a34a)",
              boxShadow: "0 0 0 1px rgba(16,185,129,0.06)",
            }}
          />

          <div className="flex flex-col gap-y-20">
            {(events as Event[]).map((ev, idx) => {
              const isLeft = idx % 2 === 0;
              const year = getYear(ev.date);

              return (
                <motion.div
                  key={`${ev.slug}-${idx}`}
                  className="grid grid-cols-12 items-start gap-4 md:gap-8"
                  initial={{ opacity: 0, y: 12, x: isLeft ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.48, delay: idx * 0.05 }}
                  viewport={{ once: true, margin: "-120px" }}
                >
                  {/* LEFT column (cards/meta) */}
                  {/* On desktop: left column (cols 1-5), center cols 6-7, right cols 8-12 */}
                  {/* For responsive stacking: show meta above card on small screens */}
                  {/** LEFT SIDE content for desktop or stacked order for mobile */}
                  <div
                    className={`col-span-12 md:col-span-5 flex ${
                      isLeft ? "md:justify-end" : "md:justify-start"
                    } md:pr-4`}
                  >
                    <div className="w-full md:max-w-[420px]">
                      {/* On mobile show meta first */}
                      <div className="md:hidden mb-3">
                        <div className="text-sm text-[#22c55e] font-semibold uppercase tracking-wider">
                          Year
                        </div>
                        <div className="text-2xl font-extrabold text-white -mt-1">
                          {year}
                        </div>
                        <div className="mt-2 text-sm text-white/75">
                          <div>{ev.date}</div>
                          {ev.time && <div>{ev.time}</div>}
                          <div className="mt-1 font-semibold">{ev.title}</div>
                          <div className="text-white/60">
                            {ev.location || ev.institute}
                          </div>
                        </div>
                      </div>

                      {/* Card */}
                      <article
                        className="bg-[#0f1720] border border-white/6 rounded-2xl p-5 shadow-2xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-transform duration-300 will-change-transform"
                        style={{
                          transformOrigin: isLeft
                            ? "right center"
                            : "left center",
                        }}
                        aria-labelledby={`event-${idx}-title`}
                      >
                        <header className="flex items-start gap-3 mb-3">
                          <GraduationCap className="w-5 h-5 text-[#22c55e] mt-1" />
                          <h3
                            id={`event-${idx}-title`}
                            className="text-lg md:text-xl font-semibold text-white"
                          >
                            {ev.title}
                          </h3>
                        </header>

                        <div className="text-sm text-white/70 mb-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#22c55e]" />
                            <span>{ev.date}</span>
                          </div>
                          {ev.time && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-white/60" />
                              <span>{ev.time}</span>
                            </div>
                          )}
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-white/60 mt-0.5" />
                            <span className="text-sm">
                              {ev.institute || ev.location}
                            </span>
                          </div>
                        </div>

                        <div className="mb-3 overflow-hidden rounded-lg border border-white/6">
                          {/* let ImageSlider be sized by wrapper */}
                          <ImageSlider
                            images={ev.images || []}
                            alt={ev.title}
                            className="h-[200px] md:h-[220px]"
                            showDots
                            showControls
                            showCounter
                          />
                        </div>

                        <p className="text-sm text-white/75 mb-4 line-clamp-3">
                          {ev.about}
                        </p>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setSelectedEvent(ev)}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#22c55e] to-[#10b981] text-black font-medium py-2 px-4 rounded-lg shadow-sm"
                            aria-label={`Read more about ${ev.title}`}
                          >
                            Read More <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </article>
                    </div>
                  </div>

                  {/* CENTER spacer (contains line + dot + connector) */}
                  <div className="col-span-12 md:col-span-2 relative flex justify-center items-start">
                    {/* dot */}
                    <div className="relative z-30 mt-3 md:mt-6">
                      <div className="w-4 h-4 rounded-full bg-white border-2 border-[#16a34a]" />
                    </div>

                    {/* connector line from center to card */}
                    <div
                      aria-hidden
                      className={`hidden md:block absolute top-10 ${
                        isLeft
                          ? "right-[50%] translate-x-1/2"
                          : "left-[50%] -translate-x-1/2"
                      }`}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 4,
                          background: "linear-gradient(90deg,#16a34a,#22c55e)",
                          borderRadius: 4,
                        }}
                      />
                    </div>

                    {/* meta block on desktop */}
                    <div className="hidden md:flex md:flex-col items-center justify-center absolute -top-2">
                      {/* empty — meta is rendered in other column to avoid overlap */}
                    </div>
                  </div>

                  {/* RIGHT column */}
                  <div
                    className={`col-span-12 md:col-span-5 flex ${
                      isLeft ? "md:justify-start" : "md:justify-start"
                    } md:pl-4`}
                  >
                    {/* Desktop meta: shown only on md+ and placed on the side near center */}
                    <div className="hidden md:flex md:flex-col md:items-start md:justify-start w-full max-w-[260px]">
                      {/* Position the meta next to center line depending on side */}
                      {isLeft ? (
                        <div className="md:ml-6 md:text-right md:items-end hidden" />
                      ) : null}

                      <div
                        className={`hidden md:flex md:flex-col ${
                          isLeft
                            ? "md:items-end md:text-right"
                            : "md:items-start md:text-left"
                        }`}
                      >
                        <div className="text-xs text-[#22c55e] font-semibold uppercase tracking-wide">
                          Year
                        </div>
                        <div className="text-4xl md:text-5xl font-extrabold text-white -mt-1">
                          {year}
                        </div>
                        <div className="mt-3 text-sm text-white/70 space-y-1">
                          <div>{ev.date}</div>
                          {ev.time && <div>{ev.time}</div>}
                          <div className="font-semibold">{ev.title}</div>
                          <div className="text-white/60">
                            {ev.location || ev.institute}
                          </div>
                        </div>
                      </div>

                      {/* Mobile meta fallback (already shown in left column above) */}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <div className="absolute inset-0 bg-black/70" />

            <motion.div
              className="relative z-40 bg-[#0b1220] rounded-2xl p-6 max-w-3xl w-full shadow-2xl border border-white/6 overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute right-4 top-4 w-10 h-10 rounded-full bg-white/6 flex items-center justify-center hover:bg-white/8"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 text-white/80" />
              </button>

              <h3 className="text-2xl font-bold text-white mb-3">
                {selectedEvent.title}
              </h3>

              <div className="mb-4 text-sm text-white/70 space-y-2">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#22c55e]" />
                  <span>{selectedEvent.date}</span>
                </div>
                {selectedEvent.time && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-white/60" />
                    <span>{selectedEvent.time}</span>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-white/60 mt-0.5" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>

              <div className="space-y-6 text-white/80">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    About
                  </h4>
                  <p className="leading-relaxed">{selectedEvent.about}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Description
                  </h4>
                  <p className="leading-relaxed">{selectedEvent.description}</p>
                </div>

                {selectedEvent.images && selectedEvent.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {selectedEvent.images.map((s, i) => (
                      <img
                        key={i}
                        src={s}
                        alt={`${selectedEvent.title} ${i + 1}`}
                        className="w-full h-40 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
