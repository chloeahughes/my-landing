"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is Abodex?",
    answer: "Abodex is a centralized deal management platform for commercial real estate (CRE) teams. It integrates your spreadsheets, emails, and documents into one frictionless workspace, while AI automatically organizes deal data into structured, analyzable intelligence."
  },
  {
    question: "Who is Abodex built for?",
    answer: "We designed Abodex for acquisitions teams, investment firms, developers, and brokerages who want to close transactions faster without chasing data across multiple tools."
  },
  {
    question: "How does Abodex save my team time?",
    answer: "On average, acquisitions teams lose 12—30% of their week hunting for deal information across silos. Abodex automatically ingests emails, spreadsheets, and PDFs, maps them to the correct deal, and updates stakeholders in real-time, cutting hours of manual work."
  },
  {
    question: "Does Abodex replace my existing tools?",
    answer: "No. Abodex integrates with the tools you already use. Instead of forcing you to switch platforms, it connects and centralizes your existing workflows."
  },
  {
    question: "Can I use Abodex offline?",
    answer: "Yes! You can access your firm's files, messages, property information, and Abodex's data extraction tools offline."
  },
  {
    question: "How long does it take to onboard my team?",
    answer: "Most teams are up and running within days. We support fast migration of deal documents and train your team on best practices for centralized workflows."
  },
  {
    question: "How is Abodex priced?",
    answer: "We offer flexible per-seat and enterprise plans depending on team size and deal volume. Contact us for custom pricing."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className="relative"
      style={{
        background: "linear-gradient(180deg, #F5E8F3 0%, #FFFFFF 100%)",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8 py-20 md:py-28">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-center text-3xl md:text-5xl font-semibold tracking-tight text-[#3C0F18]">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-center text-[#6B7280]">
            If you can't find what you are looking for, don't hesitate to contact us.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-[#E3DCDC]">
              <button
                onClick={() => toggleItem(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                className="w-full py-5 md:py-6 flex items-start justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#660191] focus-visible:ring-offset-2"
              >
                <h3 className="text-lg md:text-xl font-medium text-[#111827] pr-4">
                  {faq.question}
                </h3>
                
                {/* Icon Button */}
                <div className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#660191] text-white shrink-0">
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {openIndex === index ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    )}
                  </motion.svg>
                </div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 md:pb-6">
                      <p className="mt-3 text-[#4B5563] md:text-lg max-w-[78ch]">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
