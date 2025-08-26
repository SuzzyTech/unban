import Link from "next/link";

export default function Home() {
  return (
    <div className="matrix-bg min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-green-400">🔓 Suzzy Tech WhatsApp Unban Tool</h1>
      <p className="text-lg mb-6 max-w-xl">Join our WhatsApp Channel to unlock access to unban requests. Stay connected and regain your WhatsApp today!</p>
      <a href="https://whatsapp.com/channel/0029Vb6czaK3GJP2Dngjjj09" target="_blank" rel="noopener noreferrer">
        <button className="button-glow">Join WhatsApp Channel</button>
      </a>
      <p className="mt-4">Not redirected? <Link href="/unban"><span className="underline cursor-pointer text-green-300">Click here</span></Link></p>
      <footer className="mt-12 text-sm text-gray-400">
        Contact Us via <a href="https://www.youtube.com/@SuzzyTech" target="_blank" className="underline">YouTube</a>
      </footer>
    </div>
  );
}
