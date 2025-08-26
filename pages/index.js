import Link from 'next/link'
import Matrix from '../components/Matrix'
import { motion } from 'framer-motion'

export default function Home(){
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Matrix />
      <main className="relative z-10 w-full max-w-4xl p-8">
        <div className="card p-8 rounded-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="glitch" data-text="Suzzy Tech Unban Portal">Suzzy Tech Unban Portal</h1>
              <p className="mt-2 text-gray-300 max-w-xl">Unlock access by joining our WhatsApp channel. After joining you will be redirected to the unban generator — choose a template and send the appeal directly or open in Gmail.</p>
              <div className="mt-6 flex gap-4 items-center">
                <a href="https://whatsapp.com/channel/0029Vb6czaK3GJP2Dngjjj09" target="_blank" rel="noreferrer">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="button-neon">Join WhatsApp Channel</motion.button>
                </a>
                <Link href="/unban"><a className="button-ghost">Click here if not redirected</a></Link>
              </div>
            </div>
            <div className="text-right">
              <div className="p-4 rounded-lg border border-cyan-600/10">
                <p className="text-sm text-gray-400">Brand</p>
                <h2 className="text-xl font-bold">Suzzy Tech</h2>
                <p className="mt-2 text-xs"><a href="https://www.youtube.com/@SuzzyTech" target="_blank" rel="noreferrer" className="underline text-cyan-200">YouTube Channel</a></p>
                <p className="mt-4 text-xs text-gray-500">Secure • Fast • Hacker-themed</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">© Suzzy Tech</footer>
      </main>
    </div>
  )
}
