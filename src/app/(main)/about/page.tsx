import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="pt-16">
      <section className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-[3/4] bg-[#f5f3ef] overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-[#d0ccc5] text-sm">Artist Photo</div>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A96E] font-medium mb-6">The Artist</p>
              <h1
                className="text-4xl md:text-5xl font-light tracking-tight mb-8"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
              >
                KathyD
              </h1>
              <div className="space-y-4 text-[#7a7a7a] text-sm leading-relaxed">
                <p>
                  KathyD is a contemporary fine artist whose work explores the intersection of nature, color, and emotion.
                  Working primarily in oil on canvas, each piece is a meditation on beauty and the transient moments that define our experience.
                </p>
                <p>
                  Her paintings have been exhibited across Europe and are held in private collections worldwide.
                  She draws inspiration from botanical forms, wildlife, and the interplay of light — creating works that are both classical in technique and modern in spirit.
                </p>
                <p>
                  Each painting is an original, one-of-a-kind work. No prints, no reproductions — only authentic art made by hand.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-10 text-[13px] tracking-[0.1em] uppercase text-[#0a0a0a] border-b border-[#0a0a0a] pb-1 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
              >
                Commission a Painting <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
