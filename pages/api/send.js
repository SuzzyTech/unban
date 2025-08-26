import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) return res.status(400).json({ error: 'Missing fields' });

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.FROM_EMAIL || process.env.SMTP_USER;

  if (!host || !user || !pass) {
    return res.status(500).json({ error: 'SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS in environment.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text: body,
    });

    return res.status(200).json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error('send error', err);
    return res.status(500).json({ error: 'Failed to send email', details: String(err) });
  }
}
