import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DeviceCard from './components/DeviceCard';
import TimelineScrub from './components/TimelineScrub';
import ComparisonPanel from './components/ComparisonPanel';
import DetailDrawer from './components/DetailDrawer';
import CollectionStats from './components/CollectionStats';
import devices from './data/iphones.json';

const chipOptions = ['All', ...new Set(devices.map(device => device.chipSeries))];
const displayBuckets = ['All', 'Compact', 'Standard', 'Pro', 'Max'];
const cameraOptions = ['All', 'single', 'dual', 'triple'];
const generationCount = new Set(devices.map(device => device.family)).size;

function classifyDisplaySize(size) {
  if (size <= 4.7) return 'Compact';
  if (size <= 5.8) return 'Standard';
  if (size <= 6.3) return 'Pro';
  return 'Max';
}

export default function App() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [chipFilter, setChipFilter] = useState('All');
  const [displayFilter, setDisplayFilter] = useState('All');
  const [cameraFilter, setCameraFilter] = useState('All');
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [comparisonLeftId, setComparisonLeftId] = useState('iphone-15-pro-max');
  const [comparisonRightId, setComparisonRightId] = useState('iphone-16-pro-max');

  useEffect(() => {
    const stored = window.localStorage.getItem('tate-iphone-bookmarks');
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to read bookmarks', error);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('tate-iphone-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const filteredDevices = useMemo(() => {
    return devices.filter(device => {
      const yearMatch = device.year <= selectedYear;
      const chipMatch = chipFilter === 'All' || device.chipSeries === chipFilter;
      const displayMatch = displayFilter === 'All' || classifyDisplaySize(device.display.numeric) === displayFilter;
      const cameraMatch = cameraFilter === 'All' || device.cameraTier === cameraFilter;
      return yearMatch && chipMatch && displayMatch && cameraMatch;
    }).sort((a, b) => b.year - a.year);
  }, [selectedYear, chipFilter, displayFilter, cameraFilter]);

  const toggleBookmark = (id) => {
    setBookmarks(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  };

  const compareDevices = filteredDevices.filter(device => device.id === comparisonLeftId || device.id === comparisonRightId);
  const selectedComparison = [devices.find(d => d.id === comparisonLeftId), devices.find(d => d.id === comparisonRightId)].filter(Boolean);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl"
        >
          <div className="grid gap-6 lg:grid-cols-[1.25fr,0.75fr]">
            <div>
              <div className="inline-flex rounded-full bg-cyan-400/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-100">
                Premium product archive
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Tate iPhone Archive
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">
                A high-fidelity Apple-inspired archive covering iPhone generations from the original device through 2026. Explore launch history, compare hardware, bookmark favorites, and inspect every model through an interactive glass interface.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-950/70 p-4 border border-white/10">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Models catalogued</div>
                  <div className="mt-2 text-3xl font-semibold text-white">{devices.length}</div>
                </div>
                <div className="rounded-2xl bg-slate-950/70 p-4 border border-white/10">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Generations tracked</div>
                  <div className="mt-2 text-3xl font-semibold text-white">{generationCount}</div>
                </div>
                <div className="rounded-2xl bg-slate-950/70 p-4 border border-white/10">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Saved to local storage</div>
                  <div className="mt-2 text-3xl font-semibold text-white">{bookmarks.length}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr,0.7fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Filter controls</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Advanced filtering</h2>
                </div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">{filteredDevices.length} visible</div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <label className="rounded-2xl bg-slate-950/70 p-3">
                  <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-slate-400">Chip series</span>
                  <select value={chipFilter} onChange={(e) => setChipFilter(e.target.value)} className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm text-white">
                    {chipOptions.map(option => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
                <label className="rounded-2xl bg-slate-950/70 p-3">
                  <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-slate-400">Display family</span>
                  <select value={displayFilter} onChange={(e) => setDisplayFilter(e.target.value)} className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm text-white">
                    {displayBuckets.map(option => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
                <label className="rounded-2xl bg-slate-950/70 p-3">
                  <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-slate-400">Camera profile</span>
                  <select value={cameraFilter} onChange={(e) => setCameraFilter(e.target.value)} className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm text-white">
                    {cameraOptions.map(option => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
              </div>
            </div>

            <TimelineScrub year={selectedYear} onYearChange={setSelectedYear} devices={devices} />

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Archive grid</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Sorted by release year</h2>
                </div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">{filteredDevices.length} devices</div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <AnimatePresence>
                  {filteredDevices.slice(0, 10).map(device => (
                    <DeviceCard
                      key={device.id}
                      device={device}
                      isBookmarked={bookmarks.includes(device.id)}
                      onSelect={setSelectedDevice}
                      onBookmark={toggleBookmark}
                      onCompare={(id) => {
                        if (comparisonLeftId === id) {
                          setComparisonLeftId(comparisonRightId);
                          setComparisonRightId(id);
                        } else if (comparisonRightId === id) {
                          setComparisonRightId(comparisonLeftId);
                          setComparisonLeftId(id);
                        } else {
                          setComparisonLeftId(id);
                        }
                      }}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <CollectionStats collection={bookmarks} allDevices={devices} />

            <ComparisonPanel
              devices={devices}
              leftId={comparisonLeftId}
              rightId={comparisonRightId}
              onLeftChange={setComparisonLeftId}
              onRightChange={setComparisonRightId}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedDevice && <DetailDrawer device={selectedDevice} onClose={() => setSelectedDevice(null)} />}
      </AnimatePresence>
    </div>
  );
}
