import { api } from '../api'
import ListManager from '../components/ListManager'

type Item = { title: string; description: string }

export default function BusinessValuesManager() {
  return (
    <ListManager<Item>
      title="Business Values"
      description="The numbered list shown in the About page's 'What We Believe In' section."
      fetchFn={() => api.get('/api/content/business-values')}
      saveFn={(data) => api.put('/api/content/business-values', data)}
      emptyItem={{ title: '', description: '' }}
      renderRow={(item, i, update) => (
        <div className="space-y-2">
          <input
            value={item.title}
            onChange={(e) => update(i, { ...item, title: e.target.value })}
            placeholder="Title"
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
