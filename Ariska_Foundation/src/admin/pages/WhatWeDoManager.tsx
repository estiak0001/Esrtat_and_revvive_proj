import { api } from '../api'
import ListManager from '../components/ListManager'

type Item = { title: string; description: string }

export default function WhatWeDoManager() {
  return (
    <ListManager<Item>
      title="What We Do"
      description="The 4-pillar overview shown on the Home page and Services page process timeline."
      fetchFn={() => api.get('/api/content/what-we-do')}
      saveFn={(data) => api.put('/api/content/what-we-do', data)}
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
