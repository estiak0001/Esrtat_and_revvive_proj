import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { useCompanySettings } from '../hooks/useCompanySettings';

const schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email address'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
type FormData = z.infer<typeof schema>;

const inputClass =
  'w-full bg-slate-50 border border-slate-200 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 rounded-xl px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors';

const errorClass = 'text-red-500 text-xs mt-1.5';

export default function Contact() {
  const company = useCompanySettings();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    // In production, POST to FastAPI backend
    // await axios.post('/api/contact', data);
    console.log('Contact form submitted:', data);
    await new Promise((r) => setTimeout(r, 1000)); // simulate API delay
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-[#0D1B2A] pt-24 md:pt-36 pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, #C9A84C 1px, transparent 0)', backgroundSize: '50px 50px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-3">Get in Touch</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
            <div className="gold-divider mt-4" />
            <p className="text-white/60 mt-5 max-w-xl text-base">
              Our team is ready to assist you with professional and practical consultancy solutions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-14">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2"
            >
              <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-3">Let's Discuss Your Requirements</h2>
              <div className="gold-divider mb-6" />
              <p className="text-slate-500 text-sm leading-relaxed mb-10">
                Whether you require legal guidance, property consultancy, foreign power of attorney assistance, corporate advisory services, or bank loan documentation support, our team is ready to help.
              </p>

              <div className="space-y-6">
                {[
                  { Icon: MapPin, label: 'Address', value: company.address, href: undefined },
                  { Icon: Phone, label: 'Phone', value: company.phoneDisplay, href: `tel:${company.phone}` },
                  { Icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
                ].map(({ Icon: IcComp, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center shrink-0">
                      <IcComp size={18} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-[#0D1B2A] font-medium hover:text-[#C9A84C] transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-[#0D1B2A] font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp quick link */}
              <a
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 flex items-center gap-3 bg-[#25D366] text-white font-semibold px-6 py-4 rounded-xl hover:bg-[#1eb358] transition-colors text-sm"
              >
                <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white shrink-0">
                  <path d="M16.004 2C8.28 2 2 8.28 2 16c0 2.45.648 4.75 1.776 6.75L2 30l7.46-1.742A13.94 13.94 0 0016.004 30C23.72 30 30 23.72 30 16S23.72 2 16.004 2zm0 25.4a11.55 11.55 0 01-5.89-1.6l-.42-.25-4.43 1.036 1.06-4.31-.274-.44A11.54 11.54 0 014.6 16c0-6.296 5.11-11.4 11.404-11.4C22.3 4.6 27.4 9.71 27.4 16S22.3 27.4 16.004 27.4zm6.27-8.554c-.344-.172-2.034-1.004-2.35-1.118-.314-.116-.544-.172-.773.172-.228.344-.886 1.118-1.086 1.348-.2.228-.4.258-.744.086-.344-.172-1.452-.536-2.766-1.706-1.022-.912-1.712-2.038-1.912-2.382-.2-.344-.022-.53.15-.7.154-.154.344-.4.516-.6.172-.2.228-.344.344-.572.114-.228.058-.43-.028-.6-.086-.172-.773-1.864-1.058-2.552-.278-.672-.562-.58-.773-.59l-.658-.012a1.26 1.26 0 00-.914.43c-.314.344-1.2 1.172-1.2 2.858 0 1.686 1.228 3.316 1.4 3.544.172.228 2.416 3.692 5.854 5.178.818.354 1.456.566 1.952.724.82.262 1.568.224 2.158.136.658-.098 2.034-.83 2.32-1.634.286-.804.286-1.492.2-1.634-.086-.144-.314-.228-.658-.4z" />
                </svg>
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-10">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle2 size={56} className="text-green-500 mb-5" />
                    <h3 className="font-display text-2xl font-bold text-[#0D1B2A] mb-3">Message Sent!</h3>
                    <p className="text-slate-500">Thank you for reaching out. Our team will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                          Full Name *
                        </label>
                        <input
                          {...register('fullName')}
                          placeholder="Your full name"
                          className={inputClass}
                        />
                        {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                          Phone Number *
                        </label>
                        <input
                          {...register('phone')}
                          placeholder="+880 XXXX XXXXXX"
                          type="tel"
                          className={inputClass}
                        />
                        {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        {...register('email')}
                        placeholder="your@email.com"
                        type="email"
                        className={inputClass}
                      />
                      {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Subject *
                      </label>
                      <input
                        {...register('subject')}
                        placeholder="e.g. Property Registration Inquiry"
                        className={inputClass}
                      />
                      {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Message *
                      </label>
                      <textarea
                        {...register('message')}
                        rows={5}
                        placeholder="Describe your requirements in detail..."
                        className={`${inputClass} resize-none`}
                      />
                      {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-3 bg-[#C9A84C] hover:bg-[#b8963e] disabled:opacity-60 text-[#0D1B2A] font-bold py-4 rounded-xl text-sm transition-colors duration-200"
                    >
                      {isSubmitting ? (
                        <span className="inline-block w-5 h-5 border-2 border-[#0D1B2A]/30 border-t-[#0D1B2A] rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
