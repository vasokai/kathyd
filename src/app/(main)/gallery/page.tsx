import Link from "next/link";
import { Clock, Gavel } from "lucide-react";
import { db } from "@/lib/db";
import { paintings, auctions } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { fmtPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  let rows: (typeof paintings.$inferSelect)[] = [];
  try { rows = await db.select().from(paintings).where(eq(paintings.status, "available")).orderBy(desc(paintings.createdAt)); }
  catch { rows = []; }

  return (
    <main className="pt-16">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A96E] font-medium mb-3">Collection</p>
          <h1
            className="text-4xl md:text-5xl font-light tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
          >
            Gallery
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {rows.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[#7a7a7a] text-sm">New works coming soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {rows.map((p) => (
                <Link key={p.id} href={`/gallery/${p.slug}`} className="group relative aspect-[3/4] bg-[#f5f3ef] overflow-hidden">
                  {p.thumbnail ? (
                    <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#d0ccc5] text-sm">{p.title}</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white text-sm font-medium">{p.title}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-white/60 text-xs">{p.medium}</p>
                      {p.price && <p className="text-[#C9A96E] text-sm font-medium">{fmtPrice(p.price, p.currency)}</p>}
                    </div>
                  </div>
                  {p.status === "auction" && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase font-medium">
                      <Gavel className="w-3 h-3" /> Auction
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
