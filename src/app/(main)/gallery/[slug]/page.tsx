import Link from "next/link";
import { ArrowLeft, ShoppingBag, Gavel, Shield, Truck, Award, ChevronDown } from "lucide-react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { paintings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { fmtPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

const demoPainting = {
  id: "demo",
  title: "Peacock Among Magnolias",
  slug: "peacock-among-magnolias",
  description: "A majestic peacock rests among blooming magnolia branches, rendered in rich impasto brushstrokes that bring depth and texture to every feather and petal. The golden background evokes the warmth of a late afternoon, while the blue plumage shimmers with iridescent detail. This piece explores the harmony between the natural world's most elegant creatures and the fleeting beauty of spring blossoms.",
  medium: "Oil on canvas",
  dimensions: "60 × 60 cm (23.6 × 23.6 in)",
  year: 2024,
  price: "2400.00",
  currency: "EUR",
  status: "available" as const,
  images: [
    "/paintings/kathyd-peacock-magnolia-front-view.webp",
    "/paintings/kathyd-peacock-magnolia-angle-right.webp",
    "/paintings/kathyd-peacock-magnolia-angle-left.webp",
    "/paintings/kathyd-peacock-magnolia-detail-frame-corner.webp",
    "/paintings/kathyd-peacock-magnolia-detail-feathers-texture.webp",
    "/paintings/kathyd-peacock-magnolia-interior-lifestyle.webp",
  ],
  thumbnail: "/paintings/kathyd-peacock-magnolia-front-view.webp",
  category: "Nature & Wildlife",
  isFeatured: true,
  soldAt: null,
  buyerId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default async function PaintingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let painting: typeof paintings.$inferSelect | null = null;
  try {
    const [row] = await db.select().from(paintings).where(eq(paintings.slug, slug)).limit(1);
    painting = row ?? null;
  } catch {
    if (slug === "peacock-among-magnolias") painting = demoPainting as any;
    else painting = null;
  }

  if (!painting) {
    if (slug === "peacock-among-magnolias") painting = demoPainting as any;
    else notFound();
  }

  const images = (painting!.images as string[]) || [];
  const p = painting!;

  return (
    <main className="pt-[60px] lg:pt-[72px]">
      <section className="py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/gallery" className="inline-flex items-center gap-2 text-[13px] tracking-[0.05em] uppercase text-[#7a7a7a] hover:text-[#0a0a0a] transition-colors mb-8 lg:mb-12">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Gallery
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16">
            {/* Left: Images — stacked vertical scroll */}
            <div className="lg:col-span-7 space-y-1">
              {images.map((img, i) => (
                <div key={i} className="bg-[#f5f3ef]">
                  <img
                    src={img}
                    alt={`${p.title} by KathyD — view ${i + 1}`}
                    className="w-full h-auto object-contain"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>

            {/* Right: Details — sticky sidebar */}
            <div className="lg:col-span-5 lg:sticky lg:top-[100px] lg:self-start pt-8 lg:pt-0">
              {/* Status badge */}
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A96E] font-medium mb-6">
                {p.status === "sold" ? "Sold" : p.status === "auction" ? "At Auction" : "Available"}
              </p>

              {/* Title */}
              <h1
                className="text-3xl md:text-4xl font-light tracking-tight leading-tight"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
              >
                {p.title}
              </h1>

              {/* Artist */}
              <p className="text-sm text-[#7a7a7a] mt-3">by <span className="text-[#0a0a0a]">KathyD</span></p>

              {/* Price */}
              {p.status === "available" && p.price && (
                <p className="text-2xl font-light tracking-tight mt-8">{fmtPrice(p.price, p.currency)}</p>
              )}

              {/* Buy / Bid */}
              {p.status === "available" && (
                <button className="mt-6 w-full flex items-center justify-center gap-3 py-4 bg-[#0a0a0a] text-white text-[13px] tracking-[0.1em] uppercase hover:bg-[#1a1a1a] transition-colors">
                  <ShoppingBag className="w-4 h-4" /> Buy Now
                </button>
              )}
              {p.status === "auction" && (
                <div className="mt-8 p-6 bg-[#f5f3ef]">
                  <div className="flex items-center gap-2 mb-4">
                    <Gavel className="w-4 h-4 text-[#C9A96E]" />
                    <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A96E] font-medium">Live Auction</p>
                  </div>
                  <p className="text-2xl font-light tracking-tight">Bidding Open</p>
                  <button className="mt-4 w-full py-3 bg-[#0a0a0a] text-white text-[13px] tracking-[0.1em] uppercase">
                    Place a Bid
                  </button>
                </div>
              )}
              {p.status === "sold" && (
                <div className="mt-8 p-6 bg-[#f5f3ef] text-center">
                  <p className="text-sm text-[#7a7a7a]">This painting has been sold</p>
                </div>
              )}

              {/* Artwork Details */}
              <div className="mt-10 border-t border-[#e5e5e5]">
                <details className="group" open>
                  <summary className="flex items-center justify-between py-5 cursor-pointer">
                    <span className="text-[11px] tracking-[0.15em] uppercase font-medium">Artwork Details</span>
                    <ChevronDown className="w-4 h-4 text-[#7a7a7a] group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pb-6 space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-[#f0f0f0]"><span className="text-[#7a7a7a]">Artist</span><span>KathyD</span></div>
                    {p.medium && <div className="flex justify-between py-2 border-b border-[#f0f0f0]"><span className="text-[#7a7a7a]">Medium</span><span>{p.medium}</span></div>}
                    {(p as any).dimensions && <div className="flex justify-between py-2 border-b border-[#f0f0f0]"><span className="text-[#7a7a7a]">Dimensions</span><span>{(p as any).dimensions}</span></div>}
                    {p.year && <div className="flex justify-between py-2 border-b border-[#f0f0f0]"><span className="text-[#7a7a7a]">Year</span><span>{p.year}</span></div>}
                    {p.category && <div className="flex justify-between py-2 border-b border-[#f0f0f0]"><span className="text-[#7a7a7a]">Subject</span><span>{p.category}</span></div>}
                    <div className="flex justify-between py-2 border-b border-[#f0f0f0]"><span className="text-[#7a7a7a]">Signed</span><span>Yes, by the artist</span></div>
                    <div className="flex justify-between py-2 border-b border-[#f0f0f0]"><span className="text-[#7a7a7a]">Condition</span><span>Excellent, new</span></div>
                  </div>
                </details>
              </div>

              {/* Framing */}
              <div className="border-t border-[#e5e5e5]">
                <details className="group">
                  <summary className="flex items-center justify-between py-5 cursor-pointer">
                    <span className="text-[11px] tracking-[0.15em] uppercase font-medium">Framing</span>
                    <ChevronDown className="w-4 h-4 text-[#7a7a7a] group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pb-6 text-sm text-[#7a7a7a] leading-relaxed">
                    <p>Presented in a hand-carved baroque gold leaf frame with ornate scrollwork and shell motifs. The frame is an integral part of the artwork's presentation and is included in the price.</p>
                    <p className="mt-3">Frame dimensions: approximately 75 × 75 cm (29.5 × 29.5 in) including frame.</p>
                  </div>
                </details>
              </div>

              {/* Description */}
              {p.description && (
                <div className="border-t border-[#e5e5e5]">
                  <details className="group">
                    <summary className="flex items-center justify-between py-5 cursor-pointer">
                      <span className="text-[11px] tracking-[0.15em] uppercase font-medium">Description</span>
                      <ChevronDown className="w-4 h-4 text-[#7a7a7a] group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="pb-6 text-sm text-[#7a7a7a] leading-relaxed">
                      {p.description}
                    </div>
                  </details>
                </div>
              )}

              {/* Provenance */}
              <div className="border-t border-[#e5e5e5]">
                <details className="group">
                  <summary className="flex items-center justify-between py-5 cursor-pointer">
                    <span className="text-[11px] tracking-[0.15em] uppercase font-medium">Provenance</span>
                    <ChevronDown className="w-4 h-4 text-[#7a7a7a] group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pb-6 text-sm text-[#7a7a7a] leading-relaxed">
                    Directly from the artist's studio. This work has not been previously owned or exhibited.
                  </div>
                </details>
              </div>

              {/* Shipping & Authentication */}
              <div className="border-t border-[#e5e5e5]">
                <details className="group">
                  <summary className="flex items-center justify-between py-5 cursor-pointer">
                    <span className="text-[11px] tracking-[0.15em] uppercase font-medium">Shipping & Returns</span>
                    <ChevronDown className="w-4 h-4 text-[#7a7a7a] group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pb-6 text-sm text-[#7a7a7a] leading-relaxed space-y-3">
                    <p>Professional fine art packaging with custom crating. Fully insured worldwide shipping via specialist art courier.</p>
                    <p>Delivery within 7–14 business days for European destinations, 14–21 days internationally.</p>
                    <p>Returns accepted within 14 days of delivery in original condition and packaging.</p>
                  </div>
                </details>
              </div>

              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="text-center py-4">
                  <Award className="w-5 h-5 mx-auto text-[#C9A96E] mb-2" />
                  <p className="text-[10px] tracking-[0.1em] uppercase text-[#7a7a7a]">Certificate of<br />Authenticity</p>
                </div>
                <div className="text-center py-4">
                  <Truck className="w-5 h-5 mx-auto text-[#C9A96E] mb-2" />
                  <p className="text-[10px] tracking-[0.1em] uppercase text-[#7a7a7a]">Insured<br />Shipping</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
