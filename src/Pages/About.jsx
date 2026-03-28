import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { FiUsers, FiLayers, FiCheckCircle, FiChevronDown } from 'react-icons/fi'

const statsData = [
  { label: 'Users', value: 12000 },
  { label: 'Projects', value: 3400 },
  { label: 'Tasks Completed', value: 98000 }
]

const featuresList = [
  { title: 'Smart Tasks', icon: <FiLayers />, desc: 'Create, schedule and prioritize tasks with ease.' },
  { title: 'Team Collaboration', icon: <FiUsers />, desc: 'Invite teammates, comment and work together in real-time.' },
  { title: 'Reliable Tracking', icon: <FiCheckCircle />, desc: 'Track progress with milestones, deadlines and reports.' }
]

const team = [
  { name: 'Ava Martinez', role: 'Product Lead', bio: 'Ava leads product strategy and UX.' },
  { name: 'Ravi Patel', role: 'Engineering Lead', bio: 'Ravi builds scalable systems and APIs.' },
  { name: 'Lina Chen', role: 'Community Manager', bio: 'Lina supports users and grows community.' }
]

const About = () => {
  const [counts, setCounts] = useState(statsData.map(() => 0))
  const [openFeature, setOpenFeature] = useState(null)
  const [openFAQ, setOpenFAQ] = useState(null)
  const [selectedMember, setSelectedMember] = useState(null)

  useEffect(() => {
    const intervals = statsData.map((s, i) => {
      const step = Math.max(1, Math.floor(s.value / 60))
      return setInterval(() => {
        setCounts(prev => {
          const next = [...prev]
          if (next[i] < s.value) next[i] = Math.min(s.value, next[i] + step)
          return next
        })
      }, 30)
    })
    return () => intervals.forEach(clearInterval)
  }, [])

  const faqs = [
    { q: 'Is Nexus free to use?', a: 'Yes — we offer a generous free tier alongside paid plans.' },
    { q: 'Can I invite teammates?', a: 'Absolutely — invite teammates and manage roles easily.' },
    { q: 'Do you have mobile apps?', a: 'Mobile apps are coming soon; the web app is responsive today.' }
  ]

  function handleContactSubmit(e) {
    e.preventDefault()
    alert('Thanks! Your message was sent (demo).')
    e.target.reset()
  }

  return (
    <div className="pb-12 bg-gradient-to-b from-indigo-50 to-white min-h-screen text-gray-800">
      <Navbar />

      <header className="max-w-4xl mx-auto text-center mt-8 px-4">
        <h1 className="text-3xl font-bold">About Nexus</h1>
        <p className="mt-4 text-gray-600">
          Nexus is your go-to platform for seamless task management and collaboration. Our mission is to
          empower individuals and teams to achieve their goals efficiently and effectively.
        </p>
      </header>

      <section className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {statsData.map((s, i) => (
          <div key={s.label} className="bg-white rounded-lg shadow p-6 text-center ring-1 ring-gray-100">
            <div className="text-2xl font-semibold">{counts[i].toLocaleString()}</div>
            <div className="mt-2 text-gray-500">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="max-w-5xl mx-auto mt-12 px-4">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuresList.map((f, idx) => (
            <button
              key={f.title}
              onClick={() => setOpenFeature(openFeature === idx ? null : idx)}
              className="text-left bg-white p-4 rounded-lg shadow hover:shadow-lg hover:bg-indigo-50 transition flex flex-col"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl text-indigo-600">{f.icon}</div>
                <div className="font-semibold">{f.title}</div>
                <div className="ml-auto transform transition-transform" style={{ transform: openFeature === idx ? 'rotate(180deg)' : 'none' }}>
                  <FiChevronDown />
                </div>
              </div>
              {openFeature === idx && <div className="mt-3 text-gray-600">{f.desc}</div>}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto mt-12 px-4">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked</h2>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded shadow">
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                className="w-full flex items-center justify-between p-4"
              >
                <div className="font-medium">{f.q}</div>
                <div className="text-gray-500">{openFAQ === i ? '-' : '+'}</div>
              </button>
              {openFAQ === i && <div className="p-4 border-t text-gray-600">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto mt-12 px-4">
        <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {team.map((m, i) => (
            <div
              key={m.name}
              onClick={() => setSelectedMember(i)}
              className="cursor-pointer bg-white rounded-lg shadow p-4 hover:scale-105 transform transition ring-1 ring-gray-100"
            >
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">{m.name.split(' ')[0][0]}</div>
              <div className="mt-3 font-semibold">{m.name}</div>
              <div className="text-sm text-gray-500">{m.role}</div>
            </div>
          ))}
        </div>

        {selectedMember !== null && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-lg">{team[selectedMember].name}</div>
                  <div className="text-sm text-gray-500">{team[selectedMember].role}</div>
                </div>
                <button onClick={() => setSelectedMember(null)} className="text-gray-500">Close</button>
              </div>
              <div className="mt-4 text-gray-600">{team[selectedMember].bio}</div>
            </div>
          </div>
        )}
      </section>

      <section className="max-w-4xl mx-auto mt-12 px-4">
        <h2 className="text-2xl font-semibold mb-4">Get in touch</h2>
        <form onSubmit={handleContactSubmit} className="grid grid-cols-1 gap-3">
          <input name="name" placeholder="Your name" className="p-3 border rounded" required />
          <input name="email" type="email" placeholder="Your email" className="p-3 border rounded" required />
          <textarea name="message" placeholder="Message" className="p-3 border rounded" rows={4} required />
          <div>
            <button className="bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-200 text-white px-4 py-2 rounded">Send message</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default About