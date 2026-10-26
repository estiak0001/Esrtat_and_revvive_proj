import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../api'

type CompanyForm = {
  name: string
  tagline: string
  founded: string
  experience: string
  phone: string
  website: string
  registeredAddress: string
  businessAddress: string
}

const FIELDS: { key: keyof CompanyForm; label: string; textarea?: boolean }[] = [
  { key: 'name', label: 'Company Name' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'founded', label: 'Founded Year' },
  { key: 'experience', label: 'Years of Experience (e.g. "15+")' },
  { key: 'phone', label: 'Phone' },
  { key: 'website', label: 'Website' },
  { key: 'registeredAddress', label: 'Registered Address', textarea: true },
  { key: 'businessAddress', label: 'Business Address', textarea: true },
]

export default function CompanySettings() {
  const { register, handleSubmit, reset } = useForm<CompanyForm>()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    api.get('/api/company').then((res) => {
      reset(res.data)
      setLoading(false)
    })
  }, [reset])

  const onSubmit = async (data: CompanyForm) => {
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
    <div>
      <h1 className="font-display text-xl font-bold text-teal-950">Company Info</h1>
      <p className="text-sm text-teal-900/60 mt-1">Core company details shown across the site (header, footer, contact page).</p>

      {message && (
        <div className="mt-4 rounded-lg px-4 py-2.5 text-sm font-medium bg-emerald-50 text-emerald-700">{message}</div>
      )}

      {loading ? (
        <p className="text-sm text-teal-900/50 mt-6">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4 max-w-xl">
          {FIELDS.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-teal-950 mb-1.5">{field.label}</label>
              {field.textarea ? (
                <textarea
                  {...register(field.key)}
                  rows={2}
                  className="w-full rounded-lg border border-teal-900/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition resize-none"
                />
              ) : (
                <input
                  {...register(field.key)}
                  className="w-full rounded-lg border border-teal-900/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-teal-950 font-semibold px-6 py-2.5 text-sm transition-colors"
          >
            {saving ? 'Saving...' : 'Save Company Info'}
          </button>
        </form>
      )}
    </div>
  )
}
