"use client";

import { motion } from "framer-motion";
import { motion as motionTokens } from "@/lib/tokens";

const features = [
  // Add your custom features here
];

export default function Features() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: motionTokens.enter, 
                ease: motionTokens.ease,
                delay: index * 0.1 
              }}
              whileHover={{ 
                y: -2,
                transition: { duration: 0.2 }
              }}
              className="bg-white shadow-card border border-border rounded-xl p-6 md:p-8 group cursor-pointer"
            >
              <div className="space-y-4">
                {/* Icon */}
                <div className="text-4xl w-10 h-10 flex items-center justify-center">
                  {feature.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-text font-semibold text-[22px]">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted text-[16px] leading-[24px]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
