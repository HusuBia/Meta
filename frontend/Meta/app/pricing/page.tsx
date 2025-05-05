'use client'

export default function PricingPage() {
  return (
    <main className="min-h-screen px-6 py-12 bg-gradient-to-b from-white to-purple-50 text-gray-800">
      <section className="max-w-6xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">Choose the Right Plan for You</h1>
        <p className="text-lg text-gray-600">Flexible plans for students, professionals, and institutions.</p>
      </section>

      {/* Freemium vs Premium */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-24">
        {/* Free Plan */}
        <div className="bg-white p-8 rounded-2xl shadow-md text-center border border-purple-100">
          <h2 className="text-2xl font-semibold text-purple-600 mb-2">Free</h2>
          <p className="text-gray-500 mb-4">Access to basic features</p>
          <ul className="text-sm text-gray-700 mb-6 space-y-2 text-left">
            <li>✔️ Basic personality test</li>
            <li>✔️ Limited career planner</li>
            <li>✔️ Access to articles</li>
            <li>✔️ One AI mock interview</li>
          </ul>
          <span className="text-xl font-bold text-purple-600">€0 / month</span>
        </div>

        {/* Premium Plan */}
        <div className="bg-white p-8 rounded-2xl shadow-md text-center border border-purple-200">
          <h2 className="text-2xl font-semibold text-purple-600 mb-2">Premium</h2>
          <p className="text-gray-500 mb-4">Everything you need for career success</p>
          <ul className="text-sm text-gray-700 mb-6 space-y-2 text-left">
            <li>✔️ Unlimited AI interview simulations</li>
            <li>✔️ Detailed personalized recommendations</li>
            <li>✔️ Full-featured career planner with notifications</li>
            <li>✔️ Access to mentorship sessions</li>
            <li>✔️ Chat with professionals from various fields</li>
          </ul>
          <span className="text-xl font-bold text-purple-600 block mb-2">€9.99 / month</span>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-xl shadow hover:bg-purple-700 transition">
            Subscribe Now
          </button>
        </div>
      </section>

      {/* 1:1 Mentorship Sessions */}
      <section className="max-w-4xl mx-auto mb-24 text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">1:1 Mentorship Sessions</h2>
        <p className="text-gray-600 mb-6">
          Book personalized sessions with mentors in your field. Get advice on career paths, education, or skill development.
        </p>
        <p className="text-sm text-gray-500 mb-4">NextStep takes a 20% commission on each session.</p>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-xl shadow hover:bg-purple-700 transition">
          Browse Mentors
        </button>
      </section>

      {/* B2B Partnerships */}
      <section className="max-w-5xl mx-auto text-center bg-white p-10 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">B2B Partnerships</h2>
        <p className="text-gray-600 mb-6">
          We offer tailored solutions for universities, companies, and NGOs.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-left text-sm text-gray-700 mb-6">
          <div>
            <h3 className="text-purple-600 font-semibold mb-2">🎓 Universities</h3>
            <p>Offer full access to students through per-student licenses or institutional packages.</p>
          </div>
          <div>
            <h3 className="text-purple-600 font-semibold mb-2">🏢 Companies</h3>
            <p>Help employees with internal career mobility through upskilling and reskilling.</p>
          </div>
          <div>
            <h3 className="text-purple-600 font-semibold mb-2">🤝 NGOs</h3>
            <p>Partner on youth employment and reintegration programs through personalized career guidance.</p>
          </div>
        </div>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-xl shadow hover:bg-purple-700 transition">
          Contact Us
        </button>
      </section>
    </main>
  )
}
