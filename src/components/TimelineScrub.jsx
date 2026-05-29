import { motion } from 'framer-motion';

export default function TimelineScrub({ year, onYearChange, devices }) {
  const yearlyCounts = Array.from({ length: 2025 - 2007 + 1 }, (_, i) => 2007 + i).map(y => ({
    year: y,
    count: devices.filter(device => device.year === y).length,
  }));

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Timeline scrub</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Hardware evolution</h2>
        </div>
        <div className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-cyan-100">{year}</div>
      </div>

      <div className="mt-5">
        <input
          type="range"
          min="2007"
          max="2025"
          value={year}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className="w-full accent-cyan-300"
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-10">
        {yearlyCounts.map(item => (
          <div key={item.year} className="rounded-2xl border border-white/10 bg-slate-950/70 p-2 text-center">
            <div className="text-xs text-slate-400">{item.year}</div>
            <div className={`mt-1 rounded-full px-2 py-1 text-[10px] font-semibold ${item.year === year ? 'bg-cyan-300 text-slate-950' : 'bg-white/10 text-white'}`}>
              {item.count} models
            </div>
          </div>
        ))}
      </div>

      <motion.div
        key={year}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 rounded-2xl bg-slate-950/70 p-4"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Selected era</p>
            <p className="mt-2 text-xl font-semibold text-white">{year} overview</p>
          </div>
          <div className="rounded-full bg-cyan-400/20 px-3 py-1 text-xs font-medium text-cyan-100">
            {devices.filter(device => device.year === year).length} devices in year
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-200">
          The timeline scrub highlights how Apple’s hardware pipeline matured from the original touch-first phone into the current generation of titanium, ultra-wide, AI-ready devices.
        </p>
      </motion.div>
    </section>
  );
}
