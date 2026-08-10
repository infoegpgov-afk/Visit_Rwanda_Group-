import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home - Rwanda Notice Board',
  description: 'Amakuru • Amatangazo • Amahirwe - Professional Rwanda information platform',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1F8E1F] via-white to-[#003A70]">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-[#1F8E1F]">🇷🇼 Rwanda Notice Board</h1>
          <p className="text-gray-600 mt-2">Amakuru • Amatangazo • Amahirwe</p>
        </div>
      </header>

      <nav className="bg-[#1F8E1F] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-8">
              <a href="/" className="hover:text-[#FFD700] transition">Home</a>
              <a href="/news" className="hover:text-[#FFD700] transition">News</a>
              <a href="/announcements" className="hover:text-[#FFD700] transition">Announcements</a>
              <a href="/jobs" className="hover:text-[#FFD700] transition">Jobs</a>
              <a href="/events" className="hover:text-[#FFD700] transition">Events</a>
            </div>
            <div className="flex space-x-4">
              <a href="/login" className="bg-[#FFD700] text-[#1F8E1F] px-4 py-2 rounded hover:bg-yellow-600 transition">Login</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#003A70] mb-4">Welcome to Rwanda Notice Board</h2>
          <p className="text-xl text-gray-700 mb-8">Your trusted source for news, opportunities, and information</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'News', icon: '📰', href: '/news' },
              { title: 'Announcements', icon: '📢', href: '/announcements' },
              { title: 'Jobs', icon: '💼', href: '/jobs' },
              { title: 'Opportunities', icon: '⭐', href: '/opportunities' },
              { title: 'Education', icon: '🎓', href: '/education' },
              { title: 'Health', icon: '🏥', href: '/health' },
              { title: 'Business', icon: '🏢', href: '/business' },
              { title: 'Events', icon: '🎉', href: '/events' },
              { title: 'Tourism', icon: '✈️', href: '/tourism' },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-[#1F8E1F]">{item.title}</h3>
              </a>
            ))}
          </div>
        </section>
      </div>

      <footer className="bg-[#003A70] text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Rwanda Notice Board. All rights reserved.</p>
          <p className="text-sm text-gray-300 mt-2">Amakuru • Amatangazo • Amahirwe</p>
        </div>
      </footer>
    </main>
  )
}
