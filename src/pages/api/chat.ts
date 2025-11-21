import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { prompt, userId, system } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!n8nWebhookUrl) {
    console.error('N8N_WEBHOOK_URL is not set');
    return res.status(500).json({ error: 'Internal server error' });
  }

  try {
    let sessionId = req.cookies.sessionId;
    if (!sessionId) {
      sessionId = uuid();
      res.setHeader(
        'Set-Cookie',
        `sessionId=${sessionId}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000`
      );
    }

    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, system, userId, sessionId }),
    });

    const rawText = await response.text();
    let raw;
    try {
      raw = JSON.parse(rawText);
    } catch (e) {
      return res.status(500).json({
        error: 'Invalid JSON received from n8n',
        raw: rawText,
      });
    }

    const reply =
      raw?.response?.body?.[0]?.output ??
      raw?.reply ??
      raw?.output ??
      raw?.data?.reply ??
      (Array.isArray(raw) ? raw[0]?.output : undefined) ??
      "Je n'ai pas pu obtenir de réponse.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('>>> ERROR FROM N8N WEBHOOK', error);
    return res.status(500).json({ error: String(error) });
  }
}
