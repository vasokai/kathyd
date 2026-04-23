import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#e5e5e5] bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="tracking-[0.2em] text-xs font-semibold uppercase mb-6">KathyD</p>
            <p className="text-sm text-[#7a7a7a] leading-relaxed">
              Original fine art paintings. Each piece is unique, hand-painted, and available for collectors worldwide.
            </p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.15em] uppercase text-[#7a7a7a] font-medium mb-6">Navigate</p>
            <ul className="space-y-3">
              <li><Link href="/gallery" className="text-sm text-[#7a7a7a] hover:text-[#0a0a0a] transition-colors">Gallery</Link></li>
              <li><Link href="/about" className="text-sm text-[#7a7a7a] hover:text-[#0a0a0a] transition-colors">About the Artist</Link></li>
              <li><Link href="/contact" className="text-sm text-[#7a7a7a] hover:text-[#0a0a0a] transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.15em] uppercase text-[#7a7a7a] font-medium mb-6">Follow</p>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-[#7a7a7a] hover:text-[#0a0a0a] transition-colors">Instagram</a></li>
              <li><a href="#" className="text-sm text-[#7a7a7a] hover:text-[#0a0a0a] transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-[#e5e5e5] text-center">
          <p className="text-xs text-[#b0b0b0]">&copy; KathyD {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
