import { db } from "@/lib/db";
import { auctions, paintings } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { fmtPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AuctionsAdmin() {
  let rows: any[] = [];
  try {
    rows = await db.select({
      id: auctions.id,
      status: auctions.status,
      startingPrice: auctions.startingPrice,
      currentBid: auctions.currentBid,
      currency: auctions.currency,
      startsAt: auctions.startsAt,
      endsAt: auctions.endsAt,
      totalBids: auctions.totalBids,
      paintingTitle: paintings.title,
    }).from(auctions).leftJoin(paintings, eq(auctions.paintingId, paintings.id)).orderBy(desc(auctions.createdAt));
  } catch { rows = []; }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-medium">Auctions</h1>
      </div>

      {rows.length === 0 ? (
        <div className="bg-white border border-[#e5e5e5] rounded-lg p-12 text-center">
          <p className="text-sm text-[#7a7a7a]">No auctions yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e5e5]">
                <th className="text-left text-[11px] tracking-wider uppercase text-[#7a7a7a] font-medium px-5 py-3">Painting</th>
                <th className="text-left text-[11px] tracking-wider uppercase text-[#7a7a7a] font-medium px-5 py-3 hidden md:table-cell">Status</th>
                <th className="text-left text-[11px] tracking-wider uppercase text-[#7a7a7a] font-medium px-5 py-3 hidden md:table-cell">Current Bid</th>
                <th className="text-left text-[11px] tracking-wider uppercase text-[#7a7a7a] font-medium px-5 py-3 hidden lg:table-cell">Bids</th>
                <th className="text-left text-[11px] tracking-wider uppercase text-[#7a7a7a] font-medium px-5 py-3 hidden lg:table-cell">Ends</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a: any) => (
                <tr key={a.id} className="border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors">
                  <td className="px-5 py-4 text-sm font-medium">{a.paintingTitle || "—"}</td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className={`text-[10px] tracking-wider uppercase font-medium px-2.5 py-1 rounded-full ${
                      a.status === "live" ? "bg-green-50 text-green-600" :
                      a.status === "ended" ? "bg-gray-50 text-gray-500" :
                      "bg-amber-50 text-amber-600"
                    }`}>{a.status}</span>
                  </td>
                  <td className="px-5 py-4 text-sm hidden md:table-cell">{a.currentBid ? fmtPrice(a.currentBid, a.currency) : fmtPrice(a.startingPrice, a.currency)}</td>
                  <td className="px-5 py-4 text-sm text-[#7a7a7a] hidden lg:table-cell">{a.totalBids}</td>
                  <td className="px-5 py-4 text-sm text-[#7a7a7a] hidden lg:table-cell">{a.endsAt?.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
