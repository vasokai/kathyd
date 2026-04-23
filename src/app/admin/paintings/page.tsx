import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { paintings } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { fmtPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PaintingsAdmin() {
  let rows: (typeof paintings.$inferSelect)[] = [];
  try { rows = await db.select().from(paintings).orderBy(desc(paintings.updatedAt)); }
  catch { rows = []; }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-medium">Paintings</h1>
        <Link href="/admin/paintings/new" className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] text-white text-sm hover:bg-[#1a1a1a] transition-colors rounded-md">
          <Plus className="w-4 h-4" /> Add Painting
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="bg-white border border-[#e5e5e5] rounded-lg p-12 text-center">
          <p className="text-sm text-[#7a7a7a]">No paintings yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e5e5]">
                <th className="text-left text-[11px] tracking-wider uppercase text-[#7a7a7a] font-medium px-5 py-3">Painting</th>
                <th className="text-left text-[11px] tracking-wider uppercase text-[#7a7a7a] font-medium px-5 py-3 hidden md:table-cell">Status</th>
                <th className="text-left text-[11px] tracking-wider uppercase text-[#7a7a7a] font-medium px-5 py-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} className="border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors">
                  <td className="px-5 py-4 text-sm font-medium">{p.title}</td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className={`text-[10px] tracking-wider uppercase font-medium px-2.5 py-1 rounded-full ${
                      p.status === "available" ? "bg-green-50 text-green-600" :
                      p.status === "sold" ? "bg-gray-50 text-gray-500" :
                      p.status === "auction" ? "bg-amber-50 text-amber-600" :
                      "bg-gray-50 text-gray-400"
                    }`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-4 text-sm">{p.price ? fmtPrice(p.price, p.currency) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
