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
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.97, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.28, ease: easeOut },
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.97,
      y: 10,
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

      <div className="max-w-6xl mx-auto relative">
        {/* Vertical center line (visible on md+) */}
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
            const metaLeft = idx % 2 === 0; // even => meta left, card right
            const year = getYear(ev.date);

            // classes to control ordering: mobile stacks meta -> center -> card (order 1,2,3)
            // on md, we set md:order so the layout flips per metaLeft
            const metaOrderClass = metaLeft
              ? "order-1 md:order-1"
              : "order-1 md:order-3";
            const centerOrderClass = "order-2 md:order-2";
            const cardOrderClass = metaLeft
              ? "order-3 md:order-3"
              : "order-2 md:order-1";

            return (
              <motion.div
                key={`${ev.slug}-${idx}`}
                className="grid grid-cols-12 items-start gap-4 md:gap-8"
                initial={{ opacity: 0, y: 10, x: metaLeft ? -18 : 18 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.46, delay: idx * 0.04 }}
                viewport={{ once: true, margin: "-120px" }}
              >
                {/* META block */}
                <div
                  className={`col-span-12 md:col-span-5 flex ${
                    metaLeft ? "md:items-end md:pr-6" : "md:items-start md:pl-6"
                  } ${metaOrderClass}`}
                >
                  <div className="w-full md:max-w-[320px]">
                    {/* Mobile meta (visible on small screens above the card) */}
                    <div className="md:hidden mb-3">
                      <div className="text-xs text-[#22c55e] font-semibold uppercase tracking-wider">
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

                    {/* Desktop meta */}
                    <div
                      className={`hidden md:flex md:flex-col ${
                        metaLeft
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
                  </div>
                </div>

                {/* CENTER column (dot + connector) */}
                <div
                  className={`col-span-12 md:col-span-2 flex justify-center items-start ${centerOrderClass}`}
                >
                  <div className="relative z-30 mt-3 md:mt-6">
                    {/* dot */}
                    <div className="w-4 h-4 rounded-full bg-white border-2 border-[#16a34a]" />
                  </div>

                  {/* small connector to the card (only md) */}
                  <div
                    aria-hidden
                    className={`hidden md:block absolute top-14 ${
                      metaLeft
                        ? "right-1/2 translate-x-1/2"
                        : "left-1/2 -translate-x-1/2"
                    }`}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 4,
                        background: "linear-gradient(90deg,#16a34a,#22c55e)",
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>

                {/* CARD block */}
                <div
                  className={`col-span-12 md:col-span-5 flex ${
                    metaLeft
                      ? "md:justify-start md:pl-6"
                      : "md:justify-end md:pr-6"
                  } ${cardOrderClass}`}
                >
                  <div className="w-full md:max-w-[420px]">
                    <article
                      className="bg-[#0f1720] border border-white/6 rounded-2xl p-5 shadow-2xl hover:-translate-y-2 transition-transform duration-300"
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
              </motion.div>
            );
          })}
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
