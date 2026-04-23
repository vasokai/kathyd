import { db } from "@/lib/db";
import { orders, users, paintings } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { fmtPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function OrdersAdmin() {
  let rows: any[] = [];
  try {
    rows = await db.select({
      id: orders.id,
      amount: orders.amount,
      currency: orders.currency,
      status: orders.status,
      createdAt: orders.createdAt,
      buyerName: users.name,
      buyerEmail: users.email,
      paintingTitle: paintings.title,
    }).from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .leftJoin(paintings, eq(orders.paintingId, paintings.id))
      .orderBy(desc(orders.createdAt));
  } catch { rows = []; }

  return (
    <div>
      <h1 className="text-xl font-medium mb-8">Orders</h1>

      {rows.length === 0 ? (
        <div className="bg-white border border-[#e5e5e5] rounded-lg p-12 text-center">
          <p className="text-sm text-[#7a7a7a]">No orders yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e5e5]">
                <th className="text-left text-[11px] tracking-wider uppercase text-[#7a7a7a] font-medium px-5 py-3">Buyer</th>
                <th className="text-left text-[11px] tracking-wider uppercase text-[#7a7a7a] font-medium px-5 py-3 hidden md:table-cell">Painting</th>
                <th className="text-left text-[11px] tracking-wider uppercase text-[#7a7a7a] font-medium px-5 py-3">Amount</th>
                <th className="text-left text-[11px] tracking-wider uppercase text-[#7a7a7a] font-medium px-5 py-3 hidden md:table-cell">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o: any) => (
                <tr key={o.id} className="border-b border-[#f0f0f0] hover:bg-[#fafafa] transition-colors">
                  <td className="px-5 py-4 text-sm">{o.buyerName || o.buyerEmail}</td>
                  <td className="px-5 py-4 text-sm text-[#7a7a7a] hidden md:table-cell">{o.paintingTitle}</td>
                  <td className="px-5 py-4 text-sm font-medium">{fmtPrice(o.amount, o.currency)}</td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className={`text-[10px] tracking-wider uppercase font-medium px-2.5 py-1 rounded-full ${
                      o.status === "paid" ? "bg-green-50 text-green-600" :
                      o.status === "shipped" ? "bg-blue-50 text-blue-600" :
                      "bg-gray-50 text-gray-400"
                    }`}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
