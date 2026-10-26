import { api } from '../api'
import ListManager from '../components/ListManager'

type Item = { value: string; label: string }

export default function JourneyManager() {
  return (
    <ListManager<Item>
      title="Journey Stats"
      description="The stat counters shown in the About page's 'Our Journey' section."
      fetchFn={() => api.get('/api/content/journey')}
      saveFn={(data) => api.put('/api/content/journey', data)}
      emptyItem={{ value: '', label: '' }}
      renderRow={(item, i, update) => (
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            value={item.value}
            onChange={(e) => update(i, { ...item, value: e.target.value })}
            placeholder="Value (e.g. 15+ Years)"
            className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
          />
          <input
            value={item.label}
            onChange={(e) => update(i, { ...item, label: e.target.value })}
            placeholder="Label"
            className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
          />
        </div>
      )}
    />
  )
}
