"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/cn";

// TODO: Add these images to your public folder:
// /public/phone-1.png, /public/phone-2.png, /public/phone-3.png

type Feature = {
  title: string;
  body: string;
  img: string;
};

const features: Feature[] = [
  {
    title: "Plug in your platforms",
    body: "Plug in your email, spreadsheets, and other platforms you typically use in a deal.",
    img: "/phone-1.png"
  },
  {
    title: "Find information in seconds",
    body: "Retrieve data from 10,000+ files, texts, and more with our AI extraction tools.",
    img: "/phone-2.png"
  },
  {
    title: "Update stakeholders",
    body: "Automatically keep stakeholders informed about specific parts of a deal.",
    img: "/phone-3.png"
  }
];

export default function ToolsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev + 2) % 3);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Left Column */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#3C1E33]">
              Fast, frictionless tools for your deals
            </h2>
            
            <p className="mt-3 text-[#6B7280] max-w-prose">
              Eliminate the manual chase: automatically pull project information from messages, emails, and spreadsheets, and keep your whole team up to date in one place.
            </p>
            
            {/* Feature Cards */}
            <div className="mt-10 space-y-4" role="tablist">
              {features.map((feature, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-full text-left rounded-2xl border border-[#E3DCDC] shadow-[0_10px_30px_rgba(17,24,39,.08)] p-5 md:p-6 transition hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#660191]",
                    activeIndex === index && "ring-2 ring-[#660191] ring-offset-0"
                  )}
                  style={{
                    background: "linear-gradient(135deg, #F7EAFE 0%, #EAF5FF 100%)"
                  }}
                >
                  <div className="text-[17px] font-semibold text-[#111827]">
                    {feature.title}
                  </div>
                  <div className="mt-1 text-[15px] text-[#6B7280]">
                    {feature.body}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Right Column */}
          <div className="relative flex flex-col items-center">
            {/* Phone Stage */}
            <div className="relative w-full grid place-items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative"
                >
                  <Image
                    src={features[activeIndex].img}
                    alt={`Phone mockup showing ${features[activeIndex].title}`}
                    width={360}
                    height={760}
                    className="max-w-[320px] md:max-w-[360px] w-auto h-auto bg-transparent"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full border border-[#E3DCDC] bg-white/90 hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#660191]"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex gap-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#660191]",
                      activeIndex === index ? "bg-[#660191]" : "bg-[#E3DCDC]"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="p-2 rounded-full border border-[#E3DCDC] bg-white/90 hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#660191]"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
