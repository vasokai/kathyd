export default function ContactPage() {
  return (
    <main className="pt-16">
      <section className="py-24 lg:py-32">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A96E] font-medium mb-6 text-center">Get in Touch</p>
          <h1
            className="text-4xl md:text-5xl font-light tracking-tight text-center mb-16"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
          >
            Contact
          </h1>

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a7a7a] mb-2">First Name</label>
                <input type="text" className="w-full border-b border-[#e5e5e5] py-3 text-sm outline-none focus:border-[#0a0a0a] transition-colors bg-transparent" />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a7a7a] mb-2">Last Name</label>
                <input type="text" className="w-full border-b border-[#e5e5e5] py-3 text-sm outline-none focus:border-[#0a0a0a] transition-colors bg-transparent" />
              </div>
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a7a7a] mb-2">Email</label>
              <input type="email" className="w-full border-b border-[#e5e5e5] py-3 text-sm outline-none focus:border-[#0a0a0a] transition-colors bg-transparent" />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a7a7a] mb-2">Subject</label>
              <select className="w-full border-b border-[#e5e5e5] py-3 text-sm outline-none focus:border-[#0a0a0a] transition-colors bg-transparent text-[#7a7a7a]">
                <option>Purchase inquiry</option>
                <option>Commission request</option>
                <option>Auction question</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#7a7a7a] mb-2">Message</label>
              <textarea rows={5} className="w-full border-b border-[#e5e5e5] py-3 text-sm outline-none focus:border-[#0a0a0a] transition-colors bg-transparent resize-none" />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-[#0a0a0a] text-white text-[13px] tracking-[0.1em] uppercase hover:bg-[#1a1a1a] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
