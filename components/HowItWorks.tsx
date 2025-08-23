"use client";

import { motion } from "framer-motion";
import { motion as motionTokens } from "@/lib/tokens";

const steps = [
  // Add your custom steps here
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Connecting lines on desktop */}
          <div className="hidden lg:block absolute top-[18px] left-1/4 right-1/4 h-0.5 bg-border -z-10" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: motionTokens.enter, 
                ease: motionTokens.ease,
                delay: index * 0.2 
              }}
              className="relative"
            >
              <div className="text-center space-y-4">
                {/* Step Index Circle */}
                <div className="flex justify-center">
                  <div className="w-9 h-9 bg-brand-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {step.index}
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-[20px] font-semibold text-text">
                    {step.title}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
