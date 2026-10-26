import { useState } from 'react'
import { Phone, Globe, MapPin, Send, CheckCircle } from 'lucide-react'
import PageHero from '../components/PageHero'
import { company } from '../data/content'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Create Opportunities Together"
        subtitle="Looking for a reliable business partner in Bangladesh? Whether you require essential goods, printing and packaging products, sourcing support, supply solutions, or Bangladeshi products for international markets, ARISKA is ready to connect."
      />

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-24">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="font-display text-2xl font-bold text-teal-950">{company.name}</h3>
              <p className="text-amber-600 font-medium text-sm mt-1">{company.tagline}</p>
            </div>

            <div className="flex gap-4">
              <div className="h-11 w-11 shrink-0 rounded-xl bg-teal-700 flex items-center justify-center">
                <MapPin size={20} className="text-amber-400" />
              </div>
              <div>
                <p className="font-semibold text-teal-950 text-sm">Registered Address</p>
                <p className="text-sm text-teal-900/70 mt-1 leading-relaxed">{company.registeredAddress}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-11 w-11 shrink-0 rounded-xl bg-teal-700 flex items-center justify-center">
                <MapPin size={20} className="text-amber-400" />
              </div>
              <div>
                <p className="font-semibold text-teal-950 text-sm">Business Address</p>
                <p className="text-sm text-teal-900/70 mt-1 leading-relaxed">{company.businessAddress}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-11 w-11 shrink-0 rounded-xl bg-teal-700 flex items-center justify-center">
                <Phone size={20} className="text-amber-400" />
              </div>
              <div>
                <p className="font-semibold text-teal-950 text-sm">Phone</p>
                <a href={`tel:${company.phone.replace(/[^+\d]/g, '')}`} className="text-sm text-teal-900/70 mt-1 leading-relaxed hover:text-amber-600">
                  {company.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-11 w-11 shrink-0 rounded-xl bg-teal-700 flex items-center justify-center">
                <Globe size={20} className="text-amber-400" />
              </div>
              <div>
                <p className="font-semibold text-teal-950 text-sm">Website</p>
                <p className="text-sm text-teal-900/70 mt-1 leading-relaxed">{company.website}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full min-h-[24rem] rounded-2xl border border-teal-900/10 bg-teal-700/[0.03] flex flex-col items-center justify-center text-center p-10">
                <CheckCircle size={44} className="text-amber-500 mb-4" />
                <h3 className="font-display text-xl font-bold text-teal-950">Thank you</h3>
                <p className="mt-2 text-sm text-teal-900/70 max-w-sm">
                  Your message has been noted. Our team will get back to you shortly at the
                  contact details provided.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl border border-teal-900/10 bg-white p-6 sm:p-8 shadow-sm space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-teal-950 mb-1.5">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-lg border border-teal-900/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-teal-950 mb-1.5">Company</label>
                    <input
                      type="text"
                      placeholder="Your company"
                      className="w-full rounded-lg border border-teal-900/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-teal-950 mb-1.5">Email</label>
                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-teal-900/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-teal-950 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      placeholder="+880 ..."
                      className="w-full rounded-lg border border-teal-900/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-teal-950 mb-1.5">I&apos;m interested in</label>
                  <select className="w-full rounded-lg border border-teal-900/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition bg-white">
                    <option>Supply &amp; Procurement</option>
                    <option>Printing &amp; Packaging</option>
                    <option>Export &amp; Trading</option>
                    <option>Agro &amp; Fresh Produce</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-teal-950 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your requirements..."
                    className="w-full rounded-lg border border-teal-900/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-semibold px-6 py-3 text-sm transition-colors"
                >
                  Send Message <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
