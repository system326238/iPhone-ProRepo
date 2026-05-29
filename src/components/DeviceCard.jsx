import { motion } from 'framer-motion';

export default function DeviceCard({ device, isBookmarked, onSelect, onBookmark, onCompare }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative z-10 flex h-full flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">{device.year} • {device.family}</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{device.name}</h3>
          </div>
          <button
            onClick={() => onBookmark(device.id)}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${isBookmarked ? 'bg-amber-400 text-black' : 'bg-slate-800/80 text-slate-200'}`}
          >
            {isBookmarked ? '★ Saved' : '☆ Save'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-slate-200">
          <div className="rounded-2xl bg-black/30 p-3">
            <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Chip</div>
            <div className="mt-1 text-sm font-medium text-white">{device.chip}</div>
          </div>
          <div className="rounded-2xl bg-black/30 p-3">
            <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Display</div>
            <div className="mt-1 text-sm font-medium text-white">{device.display.size}</div>
          </div>
          <div className="rounded-2xl bg-black/30 p-3">
            <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Camera</div>
            <div className="mt-1 text-sm font-medium text-white">{device.camera.main}</div>
          </div>
          <div className="rounded-2xl bg-black/30 p-3">
            <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Launch Price</div>
            <div className="mt-1 text-sm font-medium text-white">${device.releasePrice}</div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <button
            onClick={() => onSelect(device)}
            className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-950"
          >
            View details
          </button>
          <button
            onClick={() => onCompare(device.id)}
            className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-white"
          >
            Compare
          </button>
        </div>
      </div>
    </motion.article>
  );
}
