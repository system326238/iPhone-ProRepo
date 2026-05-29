import { motion } from 'framer-motion';

const metricKeys = [
  ['releasePrice', 'Launch Price'],
  ['display.numeric', 'Display'],
  ['battery.capacity', 'Battery Capacity'],
  ['camera.main', 'Main Camera'],
  ['chipSeries', 'Chip Series'],
];

const getMetricValue = (device, metric) => {
  if (metric === 'releasePrice') return device.releasePrice;
  if (metric === 'display.numeric') return device.display.numeric;
  if (metric === 'battery.capacity') return parseInt(device.battery.capacity, 10) || 0;
  if (metric === 'camera.main') {
    const match = String(device.camera.main).match(/\d+/);
    return match ? Number(match[0]) : 0;
  }
  if (metric === 'chipSeries') return Number(String(device.chipSeries).replace(/[^0-9]/g, '')) || 0;
  return 0;
};

export default function ComparisonPanel({ devices, leftId, rightId, onLeftChange, onRightChange }) {
  const left = devices.find(device => device.id === leftId);
  const right = devices.find(device => device.id === rightId);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Battle dashboard</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Comparison tool</h2>
        </div>
        <div className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-medium text-amber-100">live comparison</div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="rounded-2xl bg-slate-950/70 p-3">
          <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-slate-400">Left device</span>
          <select value={leftId} onChange={(e) => onLeftChange(e.target.value)} className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm text-white">
            {devices.map(device => <option value={device.id} key={`left-${device.id}`}>{device.name}</option>)}
          </select>
        </label>
        <label className="rounded-2xl bg-slate-950/70 p-3">
          <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-slate-400">Right device</span>
          <select value={rightId} onChange={(e) => onRightChange(e.target.value)} className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm text-white">
            {devices.map(device => <option value={device.id} key={`right-${device.id}`}>{device.name}</option>)}
          </select>
        </label>
      </div>

      {left && right && (
        <div className="mt-5 space-y-3">
          {metricKeys.map(([key, label]) => {
            const leftValue = getMetricValue(left, key);
            const rightValue = getMetricValue(right, key);
            const maxValue = Math.max(leftValue, rightValue, 1);
            const leftWidth = (leftValue / maxValue) * 100;
            const rightWidth = (rightValue / maxValue) * 100;

            return (
              <motion.div key={key} layout className="rounded-2xl bg-slate-950/70 p-4">
                <div className="flex items-center justify-between text-sm text-slate-200">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</div>
                    <div className="mt-1 text-lg font-semibold text-white">{left.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{right.name}</div>
                    <div className="mt-1 text-lg font-semibold text-white">{rightValue}</div>
                  </div>
                </div>

                <div className="mt-3 grid gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-300"><span>{leftValue}</span><span>{rightValue}</span></div>
                    <div className="flex gap-2">
                      <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/5">
                        <div className="h-full rounded-full bg-cyan-300" style={{ width: `${leftWidth}%` }} />
                      </div>
                      <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/5">
                        <div className="h-full rounded-full bg-amber-300" style={{ width: `${rightWidth}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
