# 🦞 OpenClaw TUI

A beautiful, user-friendly Terminal User Interface for [OpenClaw CLI](https://github.com/openclaw) - Your open source AI assistant.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![npm](https://img.shields.io/badge/npm-openclaw--tui-red.svg)

## ✨ Features

- 🎨 **Beautiful TUI** - Modern terminal interface with colors and Unicode support
- 💬 **Conversation Management** - Create, switch, and manage multiple chat sessions
- ⌨️ **Keyboard-First** - Full keyboard navigation with intuitive shortcuts
- 📜 **Message History** - Navigate through your previous messages with ↑/↓
- 🔧 **Configurable** - Easy settings for model selection and preferences
- 🚀 **Fast & Lightweight** - Minimal dependencies, instant startup

## 📦 Installation

```bash
# Install globally via npm
npm install -g openclaw-tui

# Or use npx
npx openclaw-tui
```

## 🚀 Quick Start

```bash
# Start the TUI
openclaw-tui

# Or use the short alias
octui
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `F1` | Show help |
| `F2` | New conversation |
| `F3` | Open settings |
| `F5` | Clear/Refresh screen |
| `Enter` | Send message |
| `↑/↓` | Navigate message history |
| `Tab` | Switch between panels |
| `Esc` | Close dialogs |
| `Ctrl+C` | Exit application |
| `Ctrl+L` | Clear chat |

## 📸 Screenshots

```
┌─────────────────────────────────────────────────────────────────┐
│ 🦞 OpenClaw TUI │ Ready │ Press F1 for help                     │
├──────────────────┬──────────────────────────────────────────────┤
│ Conversations    │ Chat                                         │
│ ──────────────── │                                              │
│ 📝 New Chat      │    Welcome to OpenClaw TUI!                  │
│ ─────────────    │                                              │
│ 💬 Chat 1        │    Your friendly AI assistant is ready.     │
│ 💬 Chat 2        │    Type your message and press Enter.        │
│                  │                                              │
│                  │ [10:30:15] You:                              │
│                  │ Hello, how are you?                          │
│                  │                                              │
│                  │ [10:30:17] 🦞 OpenClaw:                      │
│                  │ I'm doing great! How can I help you today?   │
├──────────────────┴──────────────────────────────────────────────┤
│ > Type your message here...                                     │
├─────────────────────────────────────────────────────────────────┤
│ F1 Help │ F2 New Chat │ F3 Settings │ Ctrl+C Exit               │
└─────────────────────────────────────────────────────────────────┘
```

## ⚙️ Configuration

OpenClaw TUI works with your existing OpenClaw CLI configuration. Make sure you have OpenClaw CLI installed and configured:

```bash
# Install OpenClaw CLI
npm install -g openclaw

# Configure your API key
openclaw config set api_key YOUR_API_KEY
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/yourusername/openclaw-tui.git
cd openclaw-tui

# Install dependencies
npm install

# Run in development mode
npm run dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenClaw](https://github.com/openclaw) - The amazing open source AI assistant
- [Blessed](https://github.com/chjj/blessed) - Terminal interface library
- All our amazing contributors!

---

Made with ❤️ by the community
