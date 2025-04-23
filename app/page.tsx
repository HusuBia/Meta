'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50 px-6 py-8 flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between max-w-6xl mx-auto w-full py-6">
        {/* Logo + App name */}
        <div className="flex items-center gap-3">
          <img src="/favicon.ico" alt="NextStep Logo" className="h-12 w-12 rounded-full shadow-lg transform transition duration-300 hover:scale-105" />
          <span className="text-3xl font-semibold text-purple-800 tracking-wide">NextStep</span>
        </div>

        {/* Butoane de autentificare */}
        <div className="space-x-4">
          <Link href="/login">
          <button className="text-gray-800 font-medium hover:text-purple-700 transition duration-200">Login</button>
          </Link>

          <Link href="/signUp">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-purple-700 transition duration-200 transform hover:scale-105">
            Sign Up
          </button>
          </Link>
        </div>
      </header>

      {/* Descriere zone */}
      <section className="flex-grow flex flex-col items-center justify-center text-center mt-24 md:mt-32">
        <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight max-w-3xl mx-auto">
          Start your journey with <span className="text-purple-600">NextStep</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-12 mx-auto">
          AI-powered personalized career counseling to help you take the next step forward.
        </p>

        {/*buttons */}
        <div className="flex flex-col md:flex-row gap-6">
          <Link href ="/pricing">
          <button className="bg-white border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-xl shadow-md hover:bg-purple-50 transition duration-200 transform hover:scale-105">
            View Pricing
          </button>
          </Link>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-purple-700 transition duration-200 transform hover:scale-105">
            View Contact Info
          </button>
        </div>
      </section>
    </main>
  )
}
