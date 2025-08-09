import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { FeaturedAdventures } from "@/components/featured-adventures";
import { CallToAction } from "@/components/call-to-action";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Hero />
        <Features />
        <FeaturedAdventures />
        <CallToAction />
      </main>
    </div>
  );
}
