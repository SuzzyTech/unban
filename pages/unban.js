import { useState, useMemo } from 'react'
import Matrix from '../components/Matrix'
import { motion } from 'framer-motion'

const WHATSAPP_SUPPORT = process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT || 'support@support.whatsapp.com'

const templates = [
  { subject: 'Request for Review of Permanent Ban', body: `Dear WhatsApp Support,\n\nMy number {NUMBER} has been permanently banned, and I strongly believe this may be a mistake or an automated action. I respectfully request a detailed review of my account and activity.\n\nI always strive to follow WhatsApp's Terms of Service and community guidelines. If any issues were caused unintentionally, I assure you it was not with malicious intent, and I am ready to correct any mistakes.\n\nPlease consider reinstating my number. I truly rely on WhatsApp for personal and professional communication. Your assistance would mean a lot.\n\nThank you for your time and understanding.\n\nBest regards.` },
  { subject: 'Requesting Another Chance', body: `I acknowledge mistakes on number {NUMBER}. Requesting a final opportunity and committing to policy adherence.` },
  { subject: 'Humble Request to Unban', body: `Please unban my number {NUMBER}. I take full responsibility and seek one final chance to use WhatsApp responsibly.` },
  { subject: 'Request to Reconsider Permanent Ban', body: `This is a request to reconsider the permanent ban on my number {NUMBER}. I assure compliance in the future.` },
  { subject: 'Appeal for One More Opportunity', body: `My number {NUMBER} is permanently banned. I deeply regret any violation. Kindly give me one more opportunity.` },
  { subject: 'Request for Second Chance', body: `Dear WhatsApp Support, I humbly request a second chance for my number {NUMBER}. I understand the policies and promise to follow all rules henceforth.` },
  { subject: 'Urgent Appeal for Reactivation', body: `Please reactivate my number because I didn't violate any WhatsApp rules, suddenly my number was banned, please reactivate this number: {NUMBER}` },
  { subject: 'Beschwerde über gesperrtes WhatsApp-Konto', body: `Hallo WhatsApp-Team,\n\nIch möchte eine Beschwerde bezüglich meines gesperrten WhatsApp-Kontos einreichen. Ich habe große Schwierigkeiten, weil ich nicht auf mein WhatsApp-Konto zugreifen kann, obwohl ich diese Anwendung schon lange verwende und die von WhatsApp bereitgestellten Nutzungsbedingungen verstehe.\n\nAls ich versuchte, die WhatsApp-Anwendung zu öffnen, erhielt ich eine Nachricht, dass mein Konto gesperrt wurde. Ich bin sehr überrascht und verstehe nicht, warum dies geschieht, da ich glaube, dass ich keinen Verstoß gegen die von WhatsApp bereitgestellten Nutzungsbedingungen begangen habe.\n\nIch brauche dringend wieder Zugriff auf mein Konto, da ich auf WhatsApp angewiesen bin, um mit meiner Familie, Freunden und Kollegen zu kommunizieren. Bitte helfen Sie mir, mein WhatsApp-Konto oder meine WhatsApp-Nummer {NUMBER} zu entsperren.\n\nVielen Dank für Ihre Aufmerksamkeit.` },
  { subject: 'Mistaken Ban Appeal', body: `Hello Mark Zuckerberg and others, I think you made a mistake and banned me by mistake. I’m a loyal person. Will you please unban me again? I’m a verified user on WhatsApp without any problems. Review my ban and unban me as soon as possible. The Number is {NUMBER}.` },
  { subject: 'Verified User Appeal', body: `Hi, I’m a verified user on WhatsApp but my account was banned. Maybe I did something wrong or violated your WhatsApp terms without knowing and I’m sorry. As a verified user, I can’t talk to my customers or family since I was banned.\n\nPlease review this ban and unban me as soon as possible. My customers and relatives are waiting for me. My phone number is {NUMBER}.\n\nYours sincerely, [Your Name]` },
  { subject: 'Urgent: Wrongful Ban', body: `Dear WhatsApp Support Team,\n\nI am writing to express my distress and disappointment upon discovering that my WhatsApp account {NUMBER} has been banned without any justification. I strongly believe my account has been mistakenly banned due to false reports from malicious individuals.\n\nI have always used the official WhatsApp application and never engaged in any violations. Please help reinstate my account urgently.\n\nThank you.` },
  { subject: 'Urgent Assistance Needed', body: `I'm from Twitter Manager, and my WhatsApp account {NUMBER} is unlawfully blocked. I have not committed any violation against WhatsApp terms of service. Please review this urgently.` },
  { subject: 'Richiesta di Sblocco', body: `Il mio numero è nuovo, e con quello ho appena aperto il settore e in questo gruppo ho davvero bisogno del mio account. Non violo alcuna regola dell'informativa sulla privacy, quindi chiedo al team di supporto di WhatsApp di agire il prima possibile in modo che io possa avere accesso al materiale dal mio gruppo.\n\nIl mio numero è {NUMBER}.` },
  { subject: 'Pedido de Reativação', body: `Meu número é novo, e com isso acabei de abrir a indústria e neste grupo preciso muito da minha conta. Não estou infringindo nenhuma regra da política de privacidade, por isso solicito à equipe de suporte do WhatsApp que tome providências o mais rápido possível para que eu possa ter acesso ao material do meu grupo.\n\nMeu número è {NUMBER}.` }
]

function normalizeNumber(input){
  const t = (input||'').trim();
  if(!t) return '';
  if(/^\+/.test(t)) return '+' + t.replace(/[^0-9]/g,'');
  return '+' + t.replace(/[^0-9]/g,'');
}

function buildGmailLink(to, subject, body){
  const base = 'https://mail.google.com/mail/?view=cm&fs=1';
  const params = new URLSearchParams({ to, su: subject, body });
  return base + '&' + params.toString();
}

export default function Unban(){
  const [phone, setPhone] = useState('');
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const sanitized = useMemo(()=> normalizeNumber(phone), [phone]);
  const active = templates[index];
  const body = (active.body || '').replaceAll('{NUMBER}', sanitized || '{NUMBER}');
  const subject = active.subject || 'Request to Review Ban';
  const gmail = buildGmailLink(process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT || 'support@support.whatsapp.com', subject, body);

  async function sendDirect(tmpl){
    setLoading(true); setMsg('');
    try{
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT || 'support@support.whatsapp.com', subject: tmpl.subject, body: tmpl.body.replaceAll('{NUMBER}', sanitized||'{NUMBER}') })
      });
      const data = await res.json();
      if(res.ok){ setMsg('Sent successfully (server-side).'); }
      else { setMsg('Server error: ' + (data.error||'Unknown')); }
    }catch(e){
      setMsg('Network error: ' + String(e));
    }finally{ setLoading(false); }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Matrix />
      <main className="relative z-10 max-w-5xl mx-auto p-6">
        <div className="flex items-start gap-6">
          <div className="w-full">
            <div className="card p-6 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="glitch" data-text="Unban Generator">Unban Generator</h1>
                  <p className="text-gray-300 mt-2">Paste your banned number, pick a template and either send directly (server) or open Gmail to send manually.</p>
                </div>
                <div className="flex items-center gap-3">
                  <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+2348012345678" className="bg-transparent border border-green-600/20 rounded px-3 py-2 text-white" />
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-400">Templates</label>
                  <div className="mt-2 space-y-3">
                    {templates.map((t, i)=>(
                      <div key={i} className="p-3 border border-green-700/10 rounded-lg bg-black bg-opacity-40">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs text-gray-400">Unban v{i+1}</div>
                            <div className="font-semibold">{t.subject}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={()=>{ setIndex(i); setOpen(open===i?null:i); }} className="button-ghost">Preview</button>
                            <button onClick={()=>sendDirect(t)} disabled={loading} className="button-neon">Send Direct</button>
                            <a href={buildGmailLink(process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT || 'support@support.whatsapp.com', t.subject, t.body.replaceAll('{NUMBER}', sanitized || '{NUMBER}'))} target="_blank" rel="noreferrer" className="button-ghost">Open Gmail</a>
                          </div>
                        </div>
                        <div className={open===i? 'collapse-open mt-3':'collapse-close mt-3'}>
                          <pre className="whitespace-pre-wrap text-sm text-gray-200 bg-black/40 p-3 rounded">{t.body.replaceAll('{NUMBER}', sanitized || '{NUMBER}')}</pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 card rounded-lg">
                  <div className="text-sm text-gray-400">Preview</div>
                  <div className="mt-3">
                    <h3 className="font-semibold text-white">{subject}</h3>
                    <pre className="whitespace-pre-wrap mt-2 text-sm text-gray-200 p-2 bg-black/30 rounded">{body}</pre>
                    <div className="mt-4 flex gap-3">
                      <button onClick={()=>sendDirect(active)} disabled={loading} className="button-neon">Send Direct (Server)</button>
                      <a href={gmail} target="_blank" rel="noreferrer" className="button-ghost">Open Gmail Compose</a>
                    </div>
                    {loading && <div className="mt-3 text-sm text-yellow-300">Sending...</div>}
                    {msg && <div className="mt-3 text-sm text-cyan-200">{msg}</div>}
                  </div>
                </div>
              </div>

            </div>
            <div className="mt-6 text-center text-gray-500">Note: Direct send requires SMTP credentials in environment variables. Gmail fallback opens your mail client.</div>
          </div>
        </div>
      </main>
    </div>
  )
}
