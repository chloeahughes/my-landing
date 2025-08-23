"use client";

import { motion, AnimatePresence } from "framer-motion";
import { motion as motionTokens } from "@/lib/tokens";
import { useState } from "react";

const faqs = [
  // Add your custom FAQ items here
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: motionTokens.enter, 
                  ease: motionTokens.ease,
                  delay: index * 0.1 
                }}
                className={`border-t border-border ${
                  openIndex === index ? 'border-l-4 border-l-brand-primary' : ''
                }`}
              >
                <details
                  open={openIndex === index}
                  onToggle={(e) => {
                    const target = e.target as HTMLDetailsElement;
                    setOpenIndex(target.open ? index : null);
                  }}
                  className="group"
                >
                  <summary className="cursor-pointer py-6 px-6 md:px-8 hover:bg-surface/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <h3 className="text-text font-medium text-[18px] pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-muted rounded-full relative transition-transform group-open:rotate-45">
                          <div className="absolute top-1/2 left-1/2 w-0.5 h-2 bg-muted -translate-x-1/2 -translate-y-1/2" />
                          <div className="absolute top-1/2 left-1/2 w-2 h-0.5 bg-muted -translate-x-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                    </div>
                  </summary>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 px-6 md:px-8">
                          <p className="text-muted max-w-[720px] leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
