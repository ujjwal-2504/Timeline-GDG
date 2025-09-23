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

  /** Modal animations */
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
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.3,
        ease: easeOut,
      },
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.95,
      y: shouldReduceMotion ? 0 : 20,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.2,
      },
    },
  };

  const getYearFromDate = (date: string) => {
    const match = date?.match(/\d{4}/);
    return match ? match[0] : "";
  };

  return (
    <section
      id="timeline"
      className="relative py-20 px-6 bg-[#071018] overflow-hidden"
    >
      {/* Header */}
      <div className="container mx-auto text-center mb-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Our Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.1 : 0.6,
            delay: shouldReduceMotion ? 0 : 0.1,
          }}
          className="text-white/75 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed"
        >
          A quick look at our milestones and the events that shaped GDG Ranchi.
        </motion.p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* vertical center line */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-[3px] rounded"
          style={{
            background:
              "linear-gradient(180deg,#22c55e,#16a34a)",
            boxShadow: "0 0 0 1px rgba(34,197,94,0.08)",
          }}
        />

        <div className="space-y-28 relative">
          {(events as Event[]).map((event, index) => {
            const isLeft = index % 2 === 0;
            const year = getYearFromDate(event.date);

            return (
              <motion.div
                key={`${event.slug}-${index}`}
                initial={{
                  opacity: 0,
                  x: shouldReduceMotion ? 0 : isLeft ? -40 : 40,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0.1 : 0.45,
                  ease: "easeOut",
                  delay: shouldReduceMotion ? 0 : index * 0.05,
                }}
                viewport={{ once: true, margin: "-50px" }}
                className={`relative flex w-full ${isLeft ? "justify-start" : "justify-end"}`}
              >
                {/* timeline dot (center) */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="w-5 h-5 bg-white rounded-full border-2 border-[#16a34a]" />
                </div>

                {/* year label next to center line */}
                {year && (
                  <div
                    style={{
                      position: "absolute",
                      top: 6,
                      left: "50%",
                      transform: isLeft ? "translateX(-160%)" : "translateX(18px)",
                    }}
                    className={`z-10 max-w-[200px] ${isLeft ? "text-right" : "text-left"}`}
                  >
                    <div className="text-xs text-[#22c55e] font-semibold uppercase tracking-wider">
                      {isLeft ? "Journey started" : "Milestone"}
                    </div>
                    <div className="text-3xl md:text-4xl font-extrabold text-white leading-none drop-shadow-sm">
                      {year}
                    </div>
                  </div>
                )}

                {/* card */}
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { translateY: -6 }}
                  className={`relative bg-[#0f1720] text-white shadow-2xl rounded-2xl p-6 w-full md:w-4/12 border border-white/6 ${
                    isLeft ? "mr-auto text-left" : "ml-auto text-left"
                  }`}
                  style={{
                    // slightly push cards away from center to create the gap in reference
                    marginLeft: isLeft ? undefined : "2.5rem",
                    marginRight: isLeft ? "2.5rem" : undefined,
                  }}
                >
                  {/* card header */}
                  <div className="flex items-start gap-3 mb-3">
                    <GraduationCap className="w-5 h-5 text-[#22c55e] mt-1" />
                    <h3 className="text-lg md:text-xl font-bold text-white">
                      {event.title}
                    </h3>
                  </div>

                  {/* meta */}
                  <div className="mb-4 text-sm text-white/80 space-y-2">
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
                      <span className="leading-relaxed">{event.institute}</span>
                    </div>
                  </div>

                  {/* image slider (reduced height) */}
                  <div className="mb-4 rounded-lg overflow-hidden border border-white/6">
                    <ImageSlider
                      images={event.images || []}
                      alt={event.title}
                      className="h-[200px]"
                      showControls
                      showDots
                      showCounter
                    />
                  </div>

                  {/* short about */}
                  <p className="text-sm text-white/80 mb-4 line-clamp-3">
                    {event.about}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#22c55e] to-[#10b981] text-black font-medium py-2 px-4 rounded-lg"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* modal (center overlay) */}
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
              {/* close */}
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
                      <img
                        key={i}
                        src={src}
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
