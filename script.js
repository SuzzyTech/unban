// v3 script - animated neon site behavior
const TEMPLATES = {
  V1: { subject: "Appeal: Review Request V1", body: `Dear WhatsApp Support,

My number {NUMBER} has been permanently banned, and I strongly believe this may be a mistake or an automated action. I respectfully request a detailed review of my account and activity.

I always strive to follow WhatsApp's Terms of Service and community guidelines. If any issues were caused unintentionally, I assure you it was not with malicious intent, and I am ready to correct any mistakes.

Please consider reinstating my number. I truly rely on WhatsApp for personal and professional communication. Your assistance would mean a lot.

Thank you for your time and understanding.

Best regards.`},
  V2: { subject: "Appeal: Final Opportunity V2", body: `I acknowledge mistakes on number {NUMBER}. Requesting a final opportunity and committing to policy adherence.`},
  V3: { subject: "Appeal: Responsibility V3", body: `Please unban my number {NUMBER}. I take full responsibility and seek one final chance to use WhatsApp responsibly.`},
  V4: { subject: "Appeal: Reconsideration V4", body: `This is a request to reconsider the permanent ban on my number {NUMBER}. I assure compliance in the future.`},
  V5: { subject: "Appeal: Regret V5", body: `My number {NUMBER} is permanently banned. I deeply regret any violation. Kindly give me one more opportunity.`},
  V6: { subject: "Appeal: Second Chance V6", body: `Dear WhatsApp Support, I humbly request a second chance for my number {NUMBER}. I understand the policies and promise to follow all rules henceforth.`},
  V7: { subject: "Appeal: Wrongful Ban V7", body: `Please reactivate my number because I didn't violate any WhatsApp rules, suddenly my number was banned, please reactivate this number: {NUMBER}`},
  V8: { subject: "Appeal: DE V8", body: `Hallo WhatsApp-Team, ich möchte eine Beschwerde bezüglich meines gesperrten WhatsApp-Kontos einreichen. Ich habe große Schwierigkeiten, weil ich nicht auf mein WhatsApp-Konto zugreifen kann, obwohl ich diese Anwendung schon lange verwende und die von WhatsApp bereitgestellten Nutzungsbedingungen verstehe. Als ich versuchte, die WhatsApp-Anwendung zu öffnen, erhielt ich eine Nachricht, dass mein Konto gesperrt wurde. Ich bin sehr überrascht und verstehe nicht, warum dies geschieht, da ich glaube, dass ich keinen Verstoß gegen die von WhatsApp bereitgestellten Nutzungsbedingungen begangen habe. Ich brauche dringend wieder Zugriff auf mein Konto, da ich auf WhatsApp angewiesen bin, um mit meiner Familie, Freunden und Kollegen zu kommunizieren. Bitte helfen Sie mir, mein WhatsApp-Konto oder meine WhatsApp-Nummer {NUMBER} zu entsperren. Vielen Dank für Ihre Aufmerksamkeit.`},
  V9: { subject: "Appeal: Mistaken Ban V9", body: `Hello Mark Zuckerberg and others, I think you made a mistake and banned me by mistake. I’m a loyal person. Will you please unban me again? I’m a verified user on WhatsApp without any problems. Review my ban and unban me as soon as possible. The Number is {NUMBER}.`},
  V10: { subject: "Appeal: Verified User V10", body: `Hi, I’m a verified user on WhatsApp but my account was banned. Maybe I did something wrong or violated your WhatsApp terms without knowing and I’m sorry. As a verified user, I can’t talk to my customers or family since I was banned. Please review this ban and unban me as soon as possible. My customers and relatives are waiting for me. My phone number is {NUMBER}. Yours sincerely, [Your Name].`},
  V11: { subject: "Appeal: Urgent Review V11", body: `Urgent: Wrongful Ban of My WhatsApp Account - Request for Review and Reinstatement
Dear WhatsApp Support Team, I am writing to express my distress and disappointment upon discovering that my WhatsApp account has been banned without any justification. I strongly believe that my account has been mistakenly banned due to false reports from malicious individuals. I have always used the official WhatsApp application and never engaged in any violations. Please help reinstate my account urgently. My number: {NUMBER}.`},
  V12: { subject: "Appeal: Unlawful Block V12", body: `I'm from Twitter Manager, and my WhatsApp account {NUMBER} is unlawfully blocked. I have not committed any violation against WhatsApp terms of service. Please review this urgently.`},
  V13: { subject: "Appeal: IT V13", body: `Il mio numero è nuovo, e con quello ho appena aperto il settore e in questo gruppo ho davvero bisogno del mio account. Non violo alcuna regola dell'informativa sulla privacy, quindi chiedo al team di supporto di WhatsApp di agire il prima possibile in modo che io possa avere accesso al materiale dal mio gruppo. Il mio numero è {NUMBER}.`},
  V14: { subject: "Appeal: PT V14", body: `Meu número é novo, e com isso acabei de abrir a indústria e neste grupo preciso muito da minha conta. Não estou infringindo nenhuma regra da política de privacidade, por isso solicito à equipe de suporte do WhatsApp que tome providências o mais rápido possível para que eu possa ter acesso ao material do meu grupo. Meu número é {NUMBER}.`}
};

const numInput = document.getElementById('number');
const versionSelect = document.getElementById('version');
const badge = document.getElementById('versionBadge');
const openApp = document.getElementById('openApp');
const openGmail = document.getElementById('openGmail');

function sanitize(n){ return n.replace(/[^\d+]/g,''); }

function build(version){
  const num = sanitize(numInput.value.trim());
  const tpl = TEMPLATES[version] || TEMPLATES.V1;
  return { subject: tpl.subject, body: tpl.body.replaceAll('{NUMBER}', num || '{NUMBER}') };
}

function updateBadge(){
  const sel = versionSelect;
  const opt = sel.options[sel.selectedIndex];
  badge.textContent = opt.value;
  const c = opt.dataset.color || '#00fff6';
  badge.style.background = c;
  // set badge text color for contrast
  badge.style.color = (isBright(c) ? '#000':'#000');
}

function isBright(hex){
  try{
    const h = hex.replace('#','');
    const r = parseInt(h.substring(0,2),16);
    const g = parseInt(h.substring(2,4),16);
    const b = parseInt(h.substring(4,6),16);
    return (r*0.299 + g*0.587 + b*0.114) > 186;
  }catch(e){ return false; }
}

// app = opens mail client; web = opens gmail compose
openApp.addEventListener('click', ()=>{
  const v = versionSelect.value;
  const data = build(v);
  if(!numInput.value.trim()){ alert('Please enter your phone number (with country code)'); numInput.focus(); return; }
  window.location.href = `mailto:support@support.whatsapp.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.body)}`;
});

openGmail.addEventListener('click', ()=>{
  const v = versionSelect.value;
  const data = build(v);
  if(!numInput.value.trim()){ alert('Please enter your phone number (with country code)'); numInput.focus(); return; }
  const url = `https://mail.google.com/mail/?view=cm&fs=1&to=support@support.whatsapp.com&su=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.body)}`;
  window.open(url,'_blank','noopener');
});

versionSelect.addEventListener('change', updateBadge);
window.addEventListener('load', updateBadge);
