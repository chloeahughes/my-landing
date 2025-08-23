"use client";

import { motion } from "framer-motion";
import { motion as motionTokens } from "@/lib/tokens";

const stats = [
  {
    number: "10,000+",
    label: "Files processed."
  },
  {
    number: "100+",
    label: "Hours analyzing."
  },
  {
    number: "15+",
    label: "Stakeholders."
  }
];

export default function StatsSection() {
  return (
    <section 
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #F7EAFE 0%, #EAF5FF 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionTokens.enter, ease: motionTokens.ease }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-bold text-[32px] md:text-[42px] lg:text-[48px] leading-tight">
            Your <span className="text-[#660191]">time</span> is precious.
            <br />
            Don't waste it.
          </h2>
        </motion.div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: motionTokens.enter, 
                ease: motionTokens.ease,
                delay: index * 0.1 
              }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-black">
                {stat.number}
              </div>
              <div className="text-gray-500 text-base md:text-lg mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
