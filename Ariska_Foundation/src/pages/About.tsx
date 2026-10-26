import { motion } from 'framer-motion'
import { CheckCircle2, Award, Globe2, Users, Handshake, User, Shield, BadgeCheck, Briefcase, Target } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import StatCounter from '../components/StatCounter'
import GridBackdrop from '../components/GridBackdrop'
import { useApi, assetUrl } from '../lib/api'
import { defaultCompany, type Company, type Journey, type MissionPoint, type VisionFuture, type TitleDescription, type TeamMember as TeamMemberType } from '../lib/types'
import aboutStoryPhoto from '../assets/photos/gallery/about-story.jpg'
import aboutTeamPhoto from '../assets/photos/gallery/about-team.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06 } }),
}

// Icons & colors indexed to match teamValues order: Integrity, Reliability, Professionalism, Commitment, Partnership
const teamValueIcons = [Shield, BadgeCheck, Briefcase, Target, Handshake]
const teamValueColors = ['bg-teal-700', 'bg-amber-500', 'bg-sky-500', 'bg-emerald-500', 'bg-violet-500']

function TeamMemberCard({ member, index = 0 }: { member: TeamMemberType; index?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      custom={index}
      className="flex flex-col items-center text-center rounded-2xl border border-teal-900/10 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      {member.photo_url ? (
        <img
          src={assetUrl(member.photo_url)}
          alt={member.name}
          className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover ring-4 ring-white shadow-lg mb-4"
          draggable={false}
        />
      ) : (
        <div
          className={`h-28 w-28 sm:h-32 sm:w-32 rounded-full flex items-center justify-center ring-4 ring-white shadow-lg mb-4 ${member.color}`}
        >
          <User size={52} className="text-white/90" strokeWidth={1.5} />
        </div>
      )}
      <p className="font-display font-semibold text-base text-teal-950">{member.name}</p>
      <p className="text-xs text-teal-900/60 mt-1">{member.role}</p>
    </motion.div>
  )
}

export default function About() {
  const { data: company } = useApi<Company>('/api/company', defaultCompany)
  const { data: journey } = useApi<Journey[]>('/api/content/journey', [])
  const { data: missionPoints } = useApi<MissionPoint[]>('/api/content/mission-points', [])
  const { data: visionFuture } = useApi<VisionFuture[]>('/api/content/vision-future', [])
  const { data: teamValues } = useApi<TitleDescription[]>('/api/content/team-values', [])
  const { data: whyAriska } = useApi<TitleDescription[]>('/api/content/why-ariska', [])
  const { data: businessValues } = useApi<TitleDescription[]>('/api/content/business-values', [])
  const { data: teamMembers } = useApi<TeamMemberType[]>('/api/content/team-members', [])

  return (
    <div>
      <PageHero
        eyebrow="About Ariska"
        title="Creating Connections, Building Success"
        subtitle="ARISKA began its journey under the ARISKA name in 2024, building upon more than 15 years of business experience of our team."
      />

      {/* Story */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <p className="text-teal-900/80 text-base sm:text-lg leading-relaxed">
              While the {company.name} name is relatively new, our team has been involved in business,
              trading, sourcing, and supply activities for more than 15 years. This experience has
              helped us develop valuable knowledge, business relationships, and an understanding of
              different markets.
            </p>
            <p className="mt-5 text-teal-900/80 text-base sm:text-lg leading-relaxed">
              Our focus today is to build {company.name} as a modern and internationally connected
              trading company from Bangladesh. We work with businesses and partners across borders,
              currently maintaining business connections with Indonesia, China, and Sri Lanka.
            </p>
            <p className="mt-5 text-teal-900/80 text-base sm:text-lg leading-relaxed">
              Our activities include the supply of essential goods, printing and packaging products,
              sourcing and trading, and the export of selected Bangladeshi products. As we move
              forward, we plan to expand our international network, enter new markets, develop new
              product categories, and establish long-term partnerships with businesses around the
              world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative order-1 lg:order-2 max-w-md mx-auto lg:mx-0"
          >
            <img
              src={aboutStoryPhoto}
              alt="ARISKA team closing a business agreement"
              className="w-full aspect-[4/5] sm:aspect-square object-cover rounded-3xl shadow-xl border border-teal-900/5 select-none"
              draggable={false}
            />
            <div className="absolute top-2 left-2 sm:-top-4 sm:-left-6 flex items-center gap-2 rounded-xl bg-white shadow-lg border border-teal-900/5 px-3 sm:px-4 py-2 sm:py-2.5">
              <Award size={16} className="text-amber-500 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-teal-950 whitespace-nowrap">15+ Years Experience</span>
            </div>
            <div className="absolute bottom-2 right-2 sm:-bottom-4 sm:-right-6 flex items-center gap-2 rounded-xl bg-white shadow-lg border border-teal-900/5 px-3 sm:px-4 py-2 sm:py-2.5">
              <Globe2 size={16} className="text-amber-500 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-teal-950 whitespace-nowrap">3+ Markets</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey stats */}
      <section className="relative overflow-hidden bg-teal-700">
        <GridBackdrop />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20">
          <h3 className="text-center text-amber-400 uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-12">
            Our Journey
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {journey.map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={i}
                className="text-center rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-amber-400/40 transition-colors py-8 px-4"
              >
                <StatCounter
                  value={item.value}
                  className="block font-display text-2xl sm:text-3xl font-extrabold text-amber-400"
                />
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-24">
        <SectionHeading eyebrow="Our Mission" title={company.mission_heading} subtitle={company.mission_intro} />
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {missionPoints.map((point) => (
            <div key={point.text} className="flex items-start gap-3 rounded-xl bg-teal-700/[0.03] border border-teal-900/10 p-4">
              <CheckCircle2 size={20} className="text-amber-500 shrink-0 mt-0.5" />
              <span className="text-sm text-teal-900/80 leading-relaxed">{point.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section className="relative overflow-hidden bg-teal-700 text-white">
        <GridBackdrop />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-24">
          <SectionHeading eyebrow="Our Vision" title={company.vision_heading} subtitle={company.vision_intro} light />
          <p className="text-center text-white/60 max-w-2xl mx-auto -mt-6 mb-12 text-sm leading-relaxed">
            {company.vision_sub}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visionFuture.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h4 className="font-display font-semibold text-amber-400">{item.title}</h4>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-md mx-auto lg:mx-0"
          >
            <img
              src={aboutTeamPhoto}
              alt="ARISKA team members collaborating in a meeting"
              className="w-full aspect-[4/5] sm:aspect-square object-cover rounded-3xl shadow-xl border border-teal-900/5 select-none"
              draggable={false}
            />
            <div className="absolute top-2 right-2 sm:-top-4 sm:-right-6 flex items-center gap-2 rounded-xl bg-white shadow-lg border border-teal-900/5 px-3 sm:px-4 py-2 sm:py-2.5">
              <Users size={16} className="text-amber-500 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-teal-950 whitespace-nowrap">Dedicated Team</span>
            </div>
            <div className="absolute bottom-2 left-2 sm:-bottom-4 sm:-left-6 flex items-center gap-2 rounded-xl bg-white shadow-lg border border-teal-900/5 px-3 sm:px-4 py-2 sm:py-2.5">
              <Handshake size={16} className="text-amber-500 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-teal-950 whitespace-nowrap">Client-Focused</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center lg:text-left"
          >
            <p className="text-amber-600 uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-4">
              Our Team
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-teal-950 leading-snug">
              The People Behind Ariska
            </h2>
            <p className="mt-5 text-teal-900/70 leading-relaxed">
              Our team is the foundation of our business. With more than 15 years of business
              experience, our team brings practical knowledge of trading, sourcing, supply,
              business development, and international commerce. We work together to understand
              market requirements, build supplier relationships, support clients, and develop new
              business opportunities.
            </p>
          </motion.div>
        </div>

        {teamMembers.length > 4 ? (
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] mb-14">
            <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
              {[...teamMembers, ...teamMembers].map((member, i) => (
                <div key={`${member.name}-${i}`} className="w-52 shrink-0">
                  <TeamMemberCard member={member} index={i % teamMembers.length} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {teamMembers.map((member, i) => (
              <TeamMemberCard key={member.name} member={member} index={i} />
            ))}
          </div>
        )}

        <p className="text-center font-display font-semibold text-teal-950 mb-8">Team Values</p>
        <div className="relative">
          <div className="hidden lg:block absolute top-9 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-teal-900/15 to-transparent" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {teamValues.map((v, i) => {
              const Icon = teamValueIcons[i]
              const accent = teamValueColors[i]
              return (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  custom={i}
                  className="relative flex flex-col items-center text-center"
                >
                  <div
                    className={`relative z-10 h-14 w-14 rounded-2xl flex items-center justify-center mb-4 rotate-3 hover:rotate-0 transition-transform shadow-md ${accent}`}
                  >
                    <Icon size={24} className="text-white" strokeWidth={2} />
                  </div>
                  <h4 className="font-display font-semibold text-teal-950">{v.title}</h4>
                  <p className="mt-2 text-sm text-teal-900/70 leading-relaxed">{v.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Ariska */}
      <section className="bg-teal-700/[0.03]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-24">
          <SectionHeading eyebrow="Why Ariska" title="Why Work With Us?" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyAriska.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                className="rounded-2xl bg-white p-6 shadow-sm border border-teal-900/5"
              >
                <h4 className="font-display font-semibold text-teal-950">{item.title}</h4>
                <p className="mt-2 text-sm text-teal-900/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business values */}
      <section className="bg-teal-950/[0.03]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 md:py-24">
          <SectionHeading eyebrow="Our Business Values" title="What We Believe In" />
          <div className="border-t border-teal-900/10">
            {businessValues.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={i}
                className="group flex items-center gap-5 sm:gap-8 py-6 border-b border-teal-900/10"
              >
                <span className="font-display text-4xl sm:text-5xl font-bold text-teal-900/10 group-hover:text-amber-500/30 transition-colors w-14 sm:w-20 shrink-0 text-center">
                  0{i + 1}
                </span>
                <div className="min-w-0">
                  <h4 className="font-display font-semibold text-teal-950 text-base sm:text-lg">{v.title}</h4>
                  <p className="mt-1 text-sm text-teal-900/70 leading-relaxed">{v.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
