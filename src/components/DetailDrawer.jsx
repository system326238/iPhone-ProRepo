import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const tabs = ['Display', 'Camera', 'Processor', 'Audio', 'Connectivity'];

export default function DetailDrawer({ device, onClose }) {
  const [activeTab, setActiveTab] = useState('Display');

  if (!device) return null;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        className="fixed inset-y-4 right-4 z-40 w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/85 p-5 backdrop-blur-2xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Device drawer</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{device.name}</h2>
          </div>
          <button onClick={onClose} className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white">Close</button>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${activeTab === tab ? 'bg-cyan-300 text-slate-950' : 'bg-white/5 text-slate-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 space-y-3"
        >
          {activeTab === 'Display' && (
            <div className="space-y-2 text-sm text-slate-200">
              <div className="rounded-2xl bg-white/5 p-3"><span className="text-slate-400">Panel:</span> {device.display.technology}</div>
              <div className="rounded-2xl bg-white/5 p-3"><span className="text-slate-400">Size:</span> {device.display.size}</div>
              <div className="rounded-2xl bg-white/5 p-3"><span className="text-slate-400">Resolution:</span> {device.display.resolution}</div>
            </div>
          )}

          {activeTab === 'Camera' && (
            <div className="space-y-2 text-sm text-slate-200">
              <div className="rounded-2xl bg-white/5 p-3"><span className="text-slate-400">Main camera:</span> {device.camera.main}</div>
              <div className="rounded-2xl bg-white/5 p-3"><span className="text-slate-400">Ultra-wide:</span> {device.camera.ultraWide}</div>
              <div className="rounded-2xl bg-white/5 p-3"><span className="text-slate-400">Telephoto:</span> {device.camera.telephoto}</div>
              <div className="rounded-2xl bg-white/5 p-3"><span className="text-slate-400">Selfie:</span> {device.camera.selfie}</div>
            </div>
          )}

          {activeTab === 'Processor' && (
            <div className="space-y-2 text-sm text-slate-200">
              <div className="rounded-2xl bg-white/5 p-3"><span className="text-slate-400">Chip:</span> {device.chip}</div>
              <div className="rounded-2xl bg-white/5 p-3"><span className="text-slate-400">Series:</span> {device.chipSeries}</div>
              <div className="rounded-2xl bg-white/5 p-3"><span className="text-slate-400">Launch price:</span> ${device.releasePrice}</div>
            </div>
          )}

          {activeTab === 'Audio' && (
            <div className="space-y-2 text-sm text-slate-200">
              <div className="rounded-2xl bg-white/5 p-3">Spatial audio and high-fidelity tuning with immersive output.</div>
              <div className="rounded-2xl bg-white/5 p-3">Optimized speaker tuning across the device lineup.</div>
            </div>
          )}

          {activeTab === 'Connectivity' && (
            <div className="space-y-2 text-sm text-slate-200">
              <div className="rounded-2xl bg-white/5 p-3">5G and Wi-Fi radios with modern power management.</div>
              <div className="rounded-2xl bg-white/5 p-3">USB-C / Lightning evolution and MagSafe compatibility when applicable.</div>
            </div>
          )}
        </motion.div>
      </motion.aside>
    </AnimatePresence>
  );
}
