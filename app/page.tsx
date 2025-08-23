import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import ToolsShowcase from "@/components/ToolsShowcase";
import AnywhereSection from "@/components/AnywhereSection";
import FAQSection from "@/components/FAQSection";
import NewsletterSection from "@/components/NewsletterSection";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <StatsSection />
        <ToolsShowcase />
        <AnywhereSection />
        <FAQSection />
      </div>
      <NewsletterSection />
    </>
  );
}
