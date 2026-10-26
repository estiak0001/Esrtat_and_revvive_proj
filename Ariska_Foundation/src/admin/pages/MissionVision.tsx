import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../api'
import ListManager from '../components/ListManager'

type MissionVisionForm = {
  mission_heading: string
  mission_intro: string
  vision_heading: string
  vision_intro: string
  vision_sub: string
}

type MissionPoint = { text: string }
type VisionFuture = { title: string; description: string }

export default function MissionVision() {
  const { register, handleSubmit, reset } = useForm<MissionVisionForm>()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    api.get('/api/company').then((res) => {
      reset(res.data)
      setLoading(false)
    })
  }, [reset])

  const onSubmit = async (data: MissionVisionForm) => {
    setSaving(true)
    try {
      await api.put('/api/company', data)
      setMessage('Saved successfully!')
    } catch {
      setMessage('Error saving changes.')
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-xl font-bold text-teal-950">Mission &amp; Vision</h1>
        <p className="text-sm text-teal-900/60 mt-1">The mission/vision statements shown on the About page.</p>

        {message && (
          <div className="mt-4 rounded-lg px-4 py-2.5 text-sm font-medium bg-emerald-50 text-emerald-700">{message}</div>
        )}

        {loading ? (
          <p className="text-sm text-teal-900/50 mt-6">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4 max-w-xl">
            <div>
              <label className="block text-sm font-medium text-teal-950 mb-1.5">Mission Heading</label>
              <input
                {...register('mission_heading')}
                className="w-full rounded-lg border border-teal-900/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-950 mb-1.5">Mission Intro</label>
              <textarea
                {...register('mission_intro')}
                rows={3}
                className="w-full rounded-lg border border-teal-900/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-950 mb-1.5">Vision Heading</label>
              <input
                {...register('vision_heading')}
                className="w-full rounded-lg border border-teal-900/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-950 mb-1.5">Vision Intro</label>
              <textarea
                {...register('vision_intro')}
                rows={3}
                className="w-full rounded-lg border border-teal-900/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-950 mb-1.5">Vision Sub-text</label>
              <textarea
                {...register('vision_sub')}
                rows={2}
                className="w-full rounded-lg border border-teal-900/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-teal-950 font-semibold px-6 py-2.5 text-sm transition-colors"
            >
              {saving ? 'Saving...' : 'Save Mission & Vision Text'}
            </button>
          </form>
        )}
      </div>

      <div className="border-t border-teal-900/10 pt-10">
        <ListManager<MissionPoint>
          title="Mission Points"
          description="The checklist of mission points shown on the About page."
          fetchFn={() => api.get('/api/content/mission-points')}
          saveFn={(data) => api.put('/api/content/mission-points', data)}
          emptyItem={{ text: '' }}
          renderRow={(item, i, update) => (
            <input
              value={item.text}
              onChange={(e) => update(i, { ...item, text: e.target.value })}
              placeholder="Mission point"
              className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            />
          )}
        />
      </div>

      <div className="border-t border-teal-900/10 pt-10">
        <ListManager<VisionFuture>
          title="Vision — Looking Ahead"
          description="The 'future' cards shown in the Vision section of the About page."
          fetchFn={() => api.get('/api/content/vision-future')}
          saveFn={(data) => api.put('/api/content/vision-future', data)}
          emptyItem={{ title: '', description: '' }}
          renderRow={(item, i, update) => (
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                value={item.title}
                onChange={(e) => update(i, { ...item, title: e.target.value })}
                placeholder="Title"
                className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
              />
              <input
                value={item.description}
                onChange={(e) => update(i, { ...item, description: e.target.value })}
                placeholder="Description"
                className="w-full rounded-lg border border-teal-900/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
              />
            </div>
          )}
        />
      </div>
    </div>
  )
}
