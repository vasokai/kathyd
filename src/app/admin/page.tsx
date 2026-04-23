export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-xl font-medium mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Paintings", value: "0" },
          { label: "Active Auctions", value: "0" },
          { label: "Orders", value: "0" },
          { label: "Revenue", value: "€0" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#e5e5e5] rounded-lg p-6">
            <p className="text-[11px] tracking-[0.15em] uppercase text-[#7a7a7a] mb-2">{s.label}</p>
            <p className="text-2xl font-light">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
