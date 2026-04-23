import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const nav = [
  { label: "Dashboard", href: "/admin" },
  { label: "Paintings", href: "/admin/paintings" },
  { label: "Auctions", href: "/admin/auctions" },
  { label: "Orders", href: "/admin/orders" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let session;
  try { session = await auth(); } catch { session = null; }
  if (!session?.user || (session.user as any).role !== "admin") redirect("/login");

  return (
    <div className="min-h-screen bg-[#fafafa] flex">
      <aside className="w-[220px] bg-white border-r border-[#e5e5e5] fixed inset-y-0 left-0 hidden lg:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-[#e5e5e5]">
          <Link href="/admin" className="text-xs tracking-[0.2em] font-semibold uppercase">KathyD</Link>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="block px-4 py-2.5 text-sm text-[#7a7a7a] hover:text-[#0a0a0a] hover:bg-[#f5f3ef] rounded-md transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#e5e5e5]">
          <Link href="/" className="text-xs text-[#7a7a7a] hover:text-[#0a0a0a] transition-colors">View Site &rarr;</Link>
        </div>
      </aside>
      <div className="flex-1 lg:ml-[220px]">
        <header className="h-16 flex items-center px-6 border-b border-[#e5e5e5] bg-white sticky top-0 z-30">
          <span className="text-xs text-[#7a7a7a]">Admin</span>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
