import { motion } from 'framer-motion';

export default function CollectionStats({ collection, allDevices }) {
  const totalValue = collection.reduce((sum, id) => {
    const device = allDevices.find(item => item.id === id);
    return sum + (device ? device.releasePrice : 0);
  }, 0);

  const years = [...new Set(collection.map(id => allDevices.find(item => item.id === id)?.year).filter(Boolean))].sort((a,b)=>a-b);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Collection mode</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Your archive</h2>
        </div>
        <div className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-medium text-emerald-100">
          {collection.length} saved devices
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-950/60 p-4 border border-white/5">
          <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Saved devices</div>
          <div className="mt-2 text-3xl font-semibold text-white">{collection.length}</div>
        </div>
        <div className="rounded-2xl bg-slate-950/60 p-4 border border-white/5">
          <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Estimated value</div>
          <div className="mt-2 text-3xl font-semibold text-white">${totalValue}</div>
        </div>
        <div className="rounded-2xl bg-slate-950/60 p-4 border border-white/5">
          <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Years covered</div>
          <div className="mt-2 text-3xl font-semibold text-white">{years.length}</div>
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-200">
        Market value estimate uses launch price and is preserved locally between sessions. Saved devices are stored in browser localStorage.
      </div>
    </motion.section>
  );
}
