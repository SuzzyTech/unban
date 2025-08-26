export default function Unban() {
  const messages = [
    "V1: Dear WhatsApp Support, My number has been permanently banned, and I strongly believe this may be a mistake...",
    "V2: I acknowledge mistakes on number +218931171679. Requesting a final opportunity and committing to policy adherence",
    "V3: Please unban my number +218931171679. I take full responsibility and seek one final chance...",
    "V4: This is a request to reconsider the permanent ban on my number +218931171679. I assure compliance in the future.",
    "V5: My number +218931171679 is permanently banned. I deeply regret any violation. Kindly give me one more opportunity.",
    "V6: Dear WhatsApp Support, I humbly request a second chance for my number +218931171679. I understand the policies and promise to follow all rules henceforth.",
    "V7: Please reactivate my number because I didn't violate any WhatsApp rules, suddenly my number was banned, please reactivate this number: +218931171679",
    "V8: Hallo WhatsApp-Team, ich möchte eine Beschwerde bezüglich meines gesperrten WhatsApp-Kontos einreichen...",
    "V9: Hello Mark Zuckerbug and others,I think u made a mistake and banned me by mistake,Im a loyal person...",
    "V10: Hi, Im a verified user on whatsapp but my account was banned.Maybe I did anything wrong...",
    "V11: Urgent: Wrongful Ban of My WhatsApp Account - Request for Review and Reinstatement...",
    "V12: I'm from Twitter manager. And my WhatsApp account is unlawfully blocked...",
    "V13: Il mio numero è nuovo...",
    "V14: Meu número é novo..."
  ];
  return (
    <div className="matrix-bg min-h-screen p-6 text-green-400">
      <h1 className="text-3xl font-bold mb-6">📜 WhatsApp Unban Messages</h1>
      <div className="space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="p-4 border border-green-500 rounded-lg bg-black bg-opacity-60 shadow-lg">
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}
