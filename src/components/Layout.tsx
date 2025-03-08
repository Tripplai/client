'use client';

import NavSection from './common/NavSection'
import Footer from './common/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavSection />
      <main className="flex-grow mt-20">
        {children}
      </main>
      <Footer />
    </div>
  )
} 