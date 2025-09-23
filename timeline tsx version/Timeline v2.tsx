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
  location: string;
  institute: string;
  slug: string;
  images?: string[];
};

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.95,
      y: shouldReduceMotion ? 0 : -20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.3, ease: easeOut },
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.95,
      y: shouldReduceMotion ? 0 : 20,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.2 },
    },
  };

  const getYearFromDate = (date?: string) => {
    if (!date) return "";
    const m = date.match(/\d{4}/);
    return m ? m[0] : "";
  };

  return (
    <section id="timeline" className="relative py-20 px-6 bg-[#071018] overflow-hidden">
      {/* Header */}
      <div className="container mx-auto text-center mb-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.5 }}
          className="text-4xl md:text-5xl font-bold text-white mb-3"
        >
          Our Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.5, delay: 0.05 }}
          className="text-white/70 max-w-2xl mx-auto text-sm md:text-base"
        >
          A quick look at our milestones and the events that shaped GDG Ranchi.
        </motion.p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* center line */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 h-full"
          style={{
            width: 3,
            background: "linear-gradient(180deg,#22c55e,#16a34a)",
            borderRadius: 2,
          }}
        />

        <div className="space-y-24">
          {(events as Event[]).map((event, idx) => {
            const isLeft = idx % 2 === 0;
            const year = getYearFromDate(event.date);

            return (
              <motion.div
                key={`${event.slug}-${idx}`}
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.1 : 0.45, ease: "easeOut", delay: idx * 0.04 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative flex items-start w-full"
              >
                {/* center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 top-8 z-20">
                  <div className="w-4 h-4 bg-white rounded-full border-2 border-[#16a34a]" />
                </div>

                {/* LEFT layout: card left, meta (year/date/title/location) near center-right */}
                {isLeft ? (
                  <>
                    {/* Card (left, farther from center) */}
                    <div className="w-full md:w-5/12 mr-auto pr-6">
                      <div className="bg-[#0f1720] text-white rounded-2xl p-5 shadow-2xl border border-white/6">
                        <div className="flex items-start gap-3 mb-3">
                          <GraduationCap className="w-5 h-5 text-[#22c55e] mt-1" />
                          <h3 className="text-lg font-semibold">{event.title}</h3>
                        </div>

                        <div className="text-sm text-white/80 mb-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#22c55e]" />
                            <span>{event.date}</span>
                          </div>
                          {event.time && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-white/60" />
                              <span>{event.time}</span>
                            </div>
                          )}
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-white/60 mt-0.5" />
                            <span>{event.institute || event.location}</span>
                          </div>
                        </div>

                        <div className="mb-3 overflow-hidden rounded-lg border border-white/6">
                          <ImageSlider images={event.images || []} alt={event.title} className="h-[180px]" showDots showControls showCounter />
                        </div>

                        <p className="text-sm text-white/80 mb-4 line-clamp-3">{event.about}</p>

                        <div>
                          <button
                            onClick={() => setSelectedEvent(event)}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#22c55e] to-[#10b981] text-black font-medium py-2 px-4 rounded-lg"
                          >
                            Read More <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Meta block near center (right-aligned so it sits next to the center line) */}
                    <div className="hidden md:flex md:flex-col md:w-[220px] md:items-end md:justify-start text-right pr-4">
                      <div className="text-xs text-[#22c55e] font-semibold uppercase tracking-wide mb-1">Year</div>
                      <div className="text-4xl font-extrabold text-white leading-none mb-3">{year}</div>

                      <div className="text-sm text-white/70 space-y-1">
                        <div>{event.date}</div>
                        {event.time && <div>{event.time}</div>}
                        <div className="font-semibold">{event.title}</div>
                        <div>{event.location || event.institute}</div>
                      </div>
                    </div>
                  </>
                ) : (
                  /* RIGHT layout: meta left near center, card right */
                  <>
                    {/* Meta block near center (left-aligned) */}
                    <div className="hidden md:flex md:flex-col md:w-[220px] md:items-start md:justify-start text-left pl-4">
                      <div className="text-xs text-[#22c55e] font-semibold uppercase tracking-wide mb-1">Year</div>
                      <div className="text-4xl font-extrabold text-white leading-none mb-3">{year}</div>

                      <div className="text-sm text-white/70 space-y-1">
                        <div>{event.date}</div>
                        {event.time && <div>{event.time}</div>}
                        <div className="font-semibold">{event.title}</div>
                        <div>{event.location || event.institute}</div>
                      </div>
                    </div>

                    {/* Card (right, farther from center) */}
                    <div className="w-full md:w-5/12 ml-auto pl-6">
                      <div className="bg-[#0f1720] text-white rounded-2xl p-5 shadow-2xl border border-white/6">
                        <div className="flex items-start gap-3 mb-3">
                          <GraduationCap className="w-5 h-5 text-[#22c55e] mt-1" />
                          <h3 className="text-lg font-semibold">{event.title}</h3>
                        </div>

                        <div className="text-sm text-white/80 mb-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#22c55e]" />
                            <span>{event.date}</span>
                          </div>
                          {event.time && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-white/60" />
                              <span>{event.time}</span>
                            </div>
                          )}
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-white/60 mt-0.5" />
                            <span>{event.institute || event.location}</span>
                          </div>
                        </div>

                        <div className="mb-3 overflow-hidden rounded-lg border border-white/6">
                          <ImageSlider images={event.images || []} alt={event.title} className="h-[180px]" showDots showControls showCounter />
                        </div>

                        <p className="text-sm text-white/80 mb-4 line-clamp-3">{event.about}</p>

                        <div>
                          <button
                            onClick={() => setSelectedEvent(event)}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#22c55e] to-[#10b981] text-black font-medium py-2 px-4 rounded-lg"
                          >
                            Read More <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.2 }}
            onClick={() => setSelectedEvent(null)}
          >
            <div className="absolute inset-0 bg-black/70" />
            <motion.div
              className="bg-[#0b1220] rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-white/6"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/6 hover:bg-white/8 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-5 h-5 text-white/80" />
              </button>

              <h2 className="text-2xl font-bold text-white mb-4">{selectedEvent.title}</h2>

              <div className="mb-6 text-sm text-white/80 space-y-3">
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
                {selectedEvent.institute && (
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-white/60" />
                    <span>{selectedEvent.institute}</span>
                  </div>
                )}
              </div>

              <div className="space-y-6 text-white/80">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">About</h3>
                  <p className="leading-relaxed">{selectedEvent.about}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="leading-relaxed">{selectedEvent.description}</p>
                </div>

                {selectedEvent.images && selectedEvent.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {selectedEvent.images.map((src, i) => (
                      <img key={i} src={src} alt={`${selectedEvent.title} ${i + 1}`} className="w-full h-40 object-cover rounded" />
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
