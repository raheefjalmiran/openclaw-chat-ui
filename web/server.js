const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static(__dirname));

const conversationHistory = new Map();

app.post('/api/chat', async (req, res) => {
  const { message, conversationId, provider, apiKey } = req.body;
  
  if (!apiKey) {
    return res.status(400).json({ error: 'API key required' });
  }

  try {
    let history = conversationHistory.get(conversationId) || [];
    history.push({ role: 'user', content: message });

    let apiUrl, headers, body;

    if (provider === 'openai') {
      apiUrl = 'https://api.openai.com/v1/chat/completions';
      headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      };
      body = JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are OpenClaw, a helpful AI assistant. Be concise, friendly, and helpful.' },
          ...history
        ],
        max_tokens: 2048,
        temperature: 0.7
      });
    } else if (provider === 'anthropic') {
      apiUrl = 'https://api.anthropic.com/v1/messages';
      headers = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      };
      body = JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 2048,
        system: 'You are OpenClaw, a helpful AI assistant. Be concise, friendly, and helpful.',
        messages: history.map(m => ({ role: m.role, content: m.content }))
      });
    } else {
      return res.status(400).json({ error: 'Unknown provider' });
    }

    const response = await fetch(apiUrl, { method: 'POST', headers, body });
    const data = await response.json();
    
    let assistantMessage;
    if (provider === 'openai') {
      if (data.error) return res.status(400).json({ error: data.error.message });
      assistantMessage = data.choices[0].message.content;
    } else if (provider === 'anthropic') {
      if (data.error) return res.status(400).json({ error: data.error.message });
      assistantMessage = data.content[0].text;
    }

    history.push({ role: 'assistant', content: assistantMessage });
    conversationHistory.set(conversationId, history);

    res.json({ message: assistantMessage });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

app.post('/api/chat/clear', (req, res) => {
  const { conversationId } = req.body;
  conversationHistory.delete(conversationId);
  res.json({ success: true });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🦞 OpenClaw running at http://localhost:${PORT}\n`);
});
