# 🦞 OpenClaw Chat UI

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/raheefjalmiran/openclaw-chat-ui/issues)
[![GitHub Stars](https://img.shields.io/github/stars/raheefjalmiran/openclaw-chat-ui?style=social)](https://github.com/raheefjalmiran/openclaw-chat-ui)

**A modern, open-source AI chat interface with OpenAI GPT-4 and Anthropic Claude integration.**

[Demo](#demo) • [Features](#features) • [Installation](#installation) • [Usage](#usage) • [Contributing](#contributing) • [License](#license)

<img src="https://img.shields.io/badge/Made%20with-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />

---

## 📖 About

OpenClaw Chat UI is a **free and open-source** chat interface that connects to leading AI providers. Built with simplicity and user experience in mind, it provides a clean, professional interface similar to ChatGPT and Claude, but fully customizable and self-hosted.

**This project is 100% open source under the MIT License.** You are free to use, modify, distribute, and contribute to this project.

## ✨ Features

### 🎨 Modern Interface
- Clean, professional dark theme design
- Responsive layout that works on desktop and mobile
- Smooth animations and transitions
- ChatGPT/Claude-inspired UI

### 🔐 Setup Wizard
- Step-by-step onboarding experience
- Detailed instructions for obtaining API keys
- Direct links to OpenAI and Anthropic platforms
- Demo mode for trying without an API key

### 🤖 AI Provider Support
- **OpenAI GPT-4** - Most capable model
- **Anthropic Claude** - Great for analysis and writing
- **Demo Mode** - Try with simulated responses

### 💬 Chat Features
- Multiple conversation support
- Chat history in sidebar
- Copy, like/dislike, regenerate responses
- Markdown rendering (bold, italic, code blocks, quotes)
- Typing indicators
- Quick action prompts

### 🔒 Privacy First
- API keys stored locally in your browser
- No data sent to third-party servers (except your chosen AI provider)
- Self-hosted solution

## 🚀 Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/raheefjalmiran/openclaw-chat-ui.git

# Navigate to the project
cd openclaw-chat-ui

# Install dependencies
npm install

# Start the server
node web/server.js
```

Then open **http://localhost:3001** in your browser.

### Using npm (Global Installation)

```bash
npm install -g openclaw-chat-ui
openclaw-chat-ui
```

## 📱 Usage

### First Time Setup

1. **Welcome Screen** - Click "Get Started"
2. **Choose Provider** - Select OpenAI, Anthropic, or Demo Mode
3. **API Key** (if not demo) - Follow the step-by-step instructions to get your key
4. **Personalization** - Enter your name and preferences (optional)
5. **Start Chatting!**

### Getting API Keys

#### OpenAI
1. Go to [platform.openai.com](https://platform.openai.com/signup)
2. Sign up or log in
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy and paste into OpenClaw

#### Anthropic
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Navigate to [API Keys](https://console.anthropic.com/settings/keys)
4. Click "Create Key"
5. Copy and paste into OpenClaw

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Send message |
| `Shift+Enter` | New line |

## 🏗️ Project Structure

```
openclaw-chat-ui/
├── web/
│   ├── index.html      # Main chat UI
│   └── server.js       # Express server with API proxy
├── src/
│   └── index.js        # Terminal TUI (alternative interface)
├── bin/
│   └── cli.js          # CLI entry point
├── package.json
├── README.md
├── LICENSE             # MIT License
└── CONTRIBUTING.md     # Contribution guidelines
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/raheefjalmiran/openclaw-chat-ui.git
cd openclaw-chat-ui

# Install dependencies
npm install

# Run the web UI
node web/server.js

# Run the terminal TUI
npm start
```

## 🤝 Contributing

We love contributions! This is an open-source project and we welcome:

- 🐛 Bug reports
- 💡 Feature requests
- 📝 Documentation improvements
- 🔧 Code contributions

Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a pull request.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 OpenClaw Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for GPT-4
- [Anthropic](https://anthropic.com) for Claude
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Lucide Icons](https://lucide.dev) for icons
- All our amazing [contributors](https://github.com/raheefjalmiran/openclaw-chat-ui/graphs/contributors)

## 📞 Support

- 🐛 [Report a Bug](https://github.com/raheefjalmiran/openclaw-chat-ui/issues/new)
- 💡 [Request a Feature](https://github.com/raheefjalmiran/openclaw-chat-ui/issues/new)
- 💬 [Discussions](https://github.com/raheefjalmiran/openclaw-chat-ui/discussions)

## ⭐ Star History

If you find this project useful, please consider giving it a star! It helps others discover the project.

---

<div align="center">

**Made with ❤️ by the open-source community**

**This project is 100% free and open source under the MIT License**

</div>
