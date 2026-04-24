import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="h-svh flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#f5f3ef]" />
        <div className="relative z-10 text-center px-6">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A96E] font-medium mb-6">
            Fine Art Collection
          </p>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95]"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
          >
            KathyD
          </h1>
          <p className="text-[#7a7a7a] mt-6 text-lg md:text-xl font-light max-w-md mx-auto leading-relaxed">
            Original paintings. Timeless beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              href="/gallery"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#0a0a0a] text-white text-[13px] tracking-[0.1em] uppercase hover:bg-[#1a1a1a] transition-colors"
            >
              View Gallery
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/gallery?filter=auction"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-[#0a0a0a] text-[#0a0a0a] text-[13px] tracking-[0.1em] uppercase hover:bg-[#0a0a0a] hover:text-white transition-colors"
            >
              Live Auctions
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A96E] font-medium mb-3">Selected Works</p>
              <h2
                className="text-3xl md:text-4xl font-light tracking-tight"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
              >
                Featured Paintings
              </h2>
            </div>
            <Link href="/gallery" className="hidden md:flex items-center gap-2 text-[13px] tracking-[0.1em] uppercase text-[#7a7a7a] hover:text-[#0a0a0a] transition-colors">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {[
              { title: "Peacock Among Magnolias", medium: "Oil on canvas", price: "€2,400", href: "/gallery/peacock-among-magnolias", img: "/paintings/kathyd-peacock-magnolia-front-view.webp" },
              { title: "Coming Soon", medium: "", price: "", href: "/gallery", img: "" },
              { title: "Coming Soon", medium: "", price: "", href: "/gallery", img: "" },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group relative aspect-[3/4] bg-[#f5f3ef] overflow-hidden">
                {item.img ? (
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[#d0ccc5] text-sm">{item.title}</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white text-sm font-medium">{item.title}</p>
                  {item.medium && <p className="text-white/60 text-xs mt-1">{item.medium}</p>}
                  {item.price && <p className="text-[#C9A96E] text-sm mt-2 font-medium">{item.price}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="py-24 lg:py-32 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/kathyd-artist-studio.webp"
                alt="KathyD — Fine art painter in her studio"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A96E] font-medium mb-6">The Artist</p>
              <h2
                className="text-3xl md:text-4xl font-light tracking-tight leading-tight mb-8"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
              >
                Kathy Dobrev
              </h2>
              <p
                className="text-xl md:text-2xl font-light leading-relaxed text-[#3a3a3a] mb-8"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
              >
                &ldquo;Every brushstroke carries intention. Every painting tells a story that words cannot.&rdquo;
              </p>
              <p className="text-sm text-[#7a7a7a] leading-relaxed mb-10">
                KathyD is a contemporary fine artist working primarily in oil on canvas. Her paintings explore the harmony between nature, color, and emotion — each piece a unique, hand-painted original for collectors worldwide.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[13px] tracking-[0.1em] uppercase text-[#0a0a0a] border-b border-[#0a0a0a] pb-1 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
              >
                About the Artist <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A96E] font-medium mb-3 text-center">Collect</p>
          <h2
            className="text-3xl md:text-4xl font-light tracking-tight text-center mb-20"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
          >
            Two Ways to Own
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className="bg-[#f5f3ef] p-12 lg:p-16">
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A96E] font-medium mb-4">01</p>
              <h3 className="text-xl font-medium mb-4">Buy Now</h3>
              <p className="text-[#7a7a7a] text-sm leading-relaxed">
                Select a painting at its listed price and complete your purchase instantly. Secure checkout with worldwide shipping.
              </p>
            </div>
            <div className="bg-[#0a0a0a] text-white p-12 lg:p-16">
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A96E] font-medium mb-4">02</p>
              <h3 className="text-xl font-medium mb-4">Bid at Auction</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Place bids on exclusive works in live timed auctions. Watch in real-time as collectors compete for unique pieces.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
