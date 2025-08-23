"use client";

import { motion } from "framer-motion";
import { motion as motionTokens } from "@/lib/tokens";

const stats = [
  // Add your custom stats here
];

export default function Stats() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
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
              <div className="text-4xl md:text-5xl font-bold text-brand-primary">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-muted mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
