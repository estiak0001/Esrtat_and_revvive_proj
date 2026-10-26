import { api } from '../api'
import ListManager from '../components/ListManager'

type Item = { country: string; description: string }

export default function MarketsManager() {
  return (
    <ListManager<Item>
      title="Global Markets"
      description="International markets shown on the Home page connections diagram and Global Network page."
      fetchFn={() => api.get('/api/content/markets')}
      saveFn={(data) => api.put('/api/content/markets', data)}
      emptyItem={{ country: '', description: '' }}
      renderRow={(item, i, update) => (
        <div className="space-y-2">
          <input
            value={item.country}
            onChange={(e) => update(i, { ...item, country: e.target.value })}
            placeholder="Country"
            className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
          />
          <textarea
            value={item.description}
            onChange={(e) => update(i, { ...item, description: e.target.value })}
            placeholder="Description"
            rows={2}
            className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition resize-none"
          />
        </div>
      )}
    />
  )
}
