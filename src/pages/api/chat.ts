import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { prompt, userId } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!n8nWebhookUrl) {
    console.error('N8N_WEBHOOK_URL is not set');
    return res.status(500).json({ error: 'Internal server error' });
  }

  try {
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, userId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from n8n webhook: ${response.status} ${errorText}`);
      return res.status(response.status).json({ error: `Error from n8n webhook: ${errorText}` });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error calling n8n webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
