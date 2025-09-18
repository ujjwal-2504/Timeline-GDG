"use client";

import { motion } from "framer-motion";

const events = [
  {
    year: "2019",
    title: "GDG Ranchi Started",
    desc: "The journey began with a small group of passionate developers.",
    img: "/images/timeline/2019.jpg",
  },
  {
    year: "2020",
    title: "DevFest Online",
    desc: "Despite the pandemic, we organized our first online DevFest.",
    img: "/images/timeline/2020.jpg",
  },
  {
    year: "2021",
    title: "Cloud Study Jam",
    desc: "Hands-on session with Google Cloud technologies.",
    img: "/images/timeline/2021.jpg",
  },
  {
    year: "2022",
    title: "Women Techmakers",
    desc: "Celebrated inclusivity & diversity in tech with WTM events.",
    img: "/images/timeline/2022.jpg",
  },
  {
    year: "2023",
    title: "AI & ML Bootcamp",
    desc: "Explored AI trends with hands-on ML workshops.",
    img: "/images/timeline/2023.jpg",
  },
  {
    year: "2024",
    title: "DevFest Ranchi",
    desc: "Biggest GDG Ranchi event yet, leading into 2025.",
    img: "/images/timeline/2024.jpg",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="pt-20 pb-0 bg-gray-50 dark:bg-gray-900 relative">
      <div className="container mx-auto px-6">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 via-green-500 to-red-500 bg-clip-text text-transparent">
          Our Journey
        </h2>

        {/* Timeline */}
        <div className="relative pt-8">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-green-500 to-red-500 transform -translate-x-1/2"></div>

          <div className="space-y-24">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -150 : 150 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-center md:items-start gap-6 ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Connector Dot */}
                  <span className="absolute left-1/2 top-6 w-6 h-6 bg-white border-4 border-blue-600 rounded-full transform -translate-x-1/2 z-10"></span>

                  {/* Card */}
                  <div
                    className={`md:w-5/12 p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${
                      isLeft ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <img
                      src={event.img}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-xl shadow-md"
                    />
                    <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                      {event.year} – {event.title}
                    </h3>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      {event.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
