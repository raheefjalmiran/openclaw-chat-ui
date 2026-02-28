const blessed = require('blessed');
const contrib = require('blessed-contrib');
const chalk = require('chalk');
const figlet = require('figlet');
const { spawn } = require('child_process');
const path = require('path');

class OpenClawTUI {
  constructor(options = {}) {
    this.options = options;
    this.history = [];
    this.historyIndex = -1;
    this.conversations = [];
    this.currentConversation = null;
    this.isProcessing = false;
    this.openclawProcess = null;
  }

  start() {
    this.screen = blessed.screen({
      smartCSR: true,
      title: 'OpenClaw TUI',
      fullUnicode: true
    });

    this.setupLayout();
    this.setupKeybindings();
    this.showWelcome();
    this.screen.render();
  }

  setupLayout() {
    // Main container
    this.container = blessed.box({
      parent: this.screen,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      style: { bg: 'black' }
    });

    // Header
    this.header = blessed.box({
      parent: this.container,
      top: 0,
      left: 0,
      width: '100%',
      height: 3,
      content: ' {bold}{cyan-fg}🦞 OpenClaw TUI{/cyan-fg}{/bold} │ {green-fg}Ready{/green-fg} │ Press {yellow-fg}F1{/yellow-fg} for help',
      tags: true,
      style: {
        fg: 'white',
        bg: 'blue'
      }
    });

    // Sidebar - Conversations list
    this.sidebar = blessed.list({
      parent: this.container,
      label: ' {bold}Conversations{/bold} ',
      tags: true,
      top: 3,
      left: 0,
      width: '25%',
      height: '100%-6',
      border: { type: 'line' },
      style: {
        fg: 'white',
        bg: 'black',
        border: { fg: 'cyan' },
        selected: { bg: 'cyan', fg: 'black' },
        label: { fg: 'cyan' }
      },
      keys: true,
      vi: true,
      mouse: true,
      scrollbar: {
        ch: '│',
        style: { fg: 'cyan' }
      },
      items: ['📝 New Chat', '─────────────']
    });

    // Main chat area
    this.chatBox = blessed.box({
      parent: this.container,
      label: ' {bold}Chat{/bold} ',
      tags: true,
      top: 3,
      left: '25%',
      width: '75%',
      height: '100%-9',
      border: { type: 'line' },
      style: {
        fg: 'white',
        bg: 'black',
        border: { fg: 'green' },
        label: { fg: 'green' }
      },
      scrollable: true,
      alwaysScroll: true,
      scrollbar: {
        ch: '│',
        style: { fg: 'green' }
      },
      mouse: true,
      keys: true
    });

    // Input area
    this.inputBox = blessed.box({
      parent: this.container,
      top: '100%-6',
      left: '25%',
      width: '75%',
      height: 3,
      border: { type: 'line' },
      style: {
        fg: 'white',
        bg: 'black',
        border: { fg: 'yellow' }
      }
    });

    this.inputLabel = blessed.text({
      parent: this.inputBox,
      top: 0,
      left: 1,
      content: '{bold}{yellow-fg}>{/yellow-fg}{/bold} ',
      tags: true
    });

    this.input = blessed.textbox({
      parent: this.inputBox,
      top: 0,
      left: 3,
      width: '100%-5',
      height: 1,
      inputOnFocus: true,
      style: {
        fg: 'white',
        bg: 'black'
      }
    });

    // Status bar
    this.statusBar = blessed.box({
      parent: this.container,
      bottom: 0,
      left: 0,
      width: '100%',
      height: 3,
      content: ' {bold}F1{/bold} Help │ {bold}F2{/bold} New Chat │ {bold}F3{/bold} Settings │ {bold}Ctrl+C{/bold} Exit │ {bold}↑/↓{/bold} History │ {bold}Tab{/bold} Switch Panel',
      tags: true,
      style: {
        fg: 'black',
        bg: 'white'
      }
    });

    // Loading indicator
    this.loadingBox = blessed.box({
      parent: this.container,
      top: 'center',
      left: 'center',
      width: 40,
      height: 5,
      border: { type: 'line' },
      style: {
        fg: 'white',
        bg: 'black',
        border: { fg: 'yellow' }
      },
      content: '\n  {yellow-fg}⣾{/yellow-fg} Processing...',
      tags: true,
      hidden: true
    });

    // Help dialog
    this.helpDialog = blessed.box({
      parent: this.container,
      top: 'center',
      left: 'center',
      width: 60,
      height: 20,
      border: { type: 'line' },
      label: ' {bold}Help{/bold} ',
      tags: true,
      style: {
        fg: 'white',
        bg: 'black',
        border: { fg: 'cyan' },
        label: { fg: 'cyan' }
      },
      content: `
  {bold}{cyan-fg}OpenClaw TUI - Keyboard Shortcuts{/cyan-fg}{/bold}

  {yellow-fg}F1{/yellow-fg}        Show this help
  {yellow-fg}F2{/yellow-fg}        Start new conversation
  {yellow-fg}F3{/yellow-fg}        Open settings
  {yellow-fg}F5{/yellow-fg}        Refresh/Clear screen
  
  {yellow-fg}Enter{/yellow-fg}     Send message
  {yellow-fg}↑/↓{/yellow-fg}       Navigate history
  {yellow-fg}Tab{/yellow-fg}       Switch between panels
  {yellow-fg}Esc{/yellow-fg}       Close dialogs/Cancel
  
  {yellow-fg}Ctrl+C{/yellow-fg}    Exit application
  {yellow-fg}Ctrl+L{/yellow-fg}    Clear chat
  {yellow-fg}Ctrl+S{/yellow-fg}    Save conversation

  {gray-fg}Press Esc to close{/gray-fg}
`,
      hidden: true
    });

    // Settings dialog
    this.settingsDialog = blessed.form({
      parent: this.container,
      top: 'center',
      left: 'center',
      width: 50,
      height: 15,
      border: { type: 'line' },
      label: ' {bold}Settings{/bold} ',
      tags: true,
      style: {
        fg: 'white',
        bg: 'black',
        border: { fg: 'magenta' },
        label: { fg: 'magenta' }
      },
      keys: true,
      hidden: true
    });

    blessed.text({
      parent: this.settingsDialog,
      top: 1,
      left: 2,
      content: 'Model:',
      style: { fg: 'white' }
    });

    this.modelSelect = blessed.list({
      parent: this.settingsDialog,
      top: 1,
      left: 10,
      width: 30,
      height: 3,
      border: { type: 'line' },
      style: {
        fg: 'white',
        selected: { bg: 'magenta', fg: 'white' }
      },
      items: ['claude-3-opus', 'claude-3-sonnet', 'gpt-4', 'gpt-3.5-turbo'],
      keys: true,
      mouse: true
    });

    this.input.focus();
  }

  setupKeybindings() {
    // Global keybindings
    this.screen.key(['C-c'], () => {
      this.exit();
    });

    this.screen.key(['f1'], () => {
      this.toggleHelp();
    });

    this.screen.key(['f2'], () => {
      this.newConversation();
    });

    this.screen.key(['f3'], () => {
      this.toggleSettings();
    });

    this.screen.key(['f5'], () => {
      this.clearChat();
    });

    this.screen.key(['escape'], () => {
      this.helpDialog.hide();
      this.settingsDialog.hide();
      this.input.focus();
      this.screen.render();
    });

    this.screen.key(['tab'], () => {
      if (this.sidebar.focused) {
        this.input.focus();
      } else {
        this.sidebar.focus();
      }
      this.screen.render();
    });

    // Input keybindings
    this.input.key(['enter'], () => {
      const text = this.input.getValue().trim();
      if (text && !this.isProcessing) {
        this.sendMessage(text);
      }
    });

    this.input.key(['up'], () => {
      if (this.history.length > 0) {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.setValue(this.history[this.history.length - 1 - this.historyIndex]);
          this.screen.render();
        }
      }
    });

    this.input.key(['down'], () => {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.input.setValue(this.history[this.history.length - 1 - this.historyIndex]);
      } else if (this.historyIndex === 0) {
        this.historyIndex = -1;
        this.input.setValue('');
      }
      this.screen.render();
    });

    this.input.key(['C-l'], () => {
      this.clearChat();
    });

    // Sidebar keybindings
    this.sidebar.on('select', (item, index) => {
      if (index === 0) {
        this.newConversation();
      } else if (index > 1) {
        this.loadConversation(index - 2);
      }
      this.input.focus();
      this.screen.render();
    });
  }

  showWelcome() {
    const welcome = `
{center}{bold}{cyan-fg}
   ___                    ____ _                
  / _ \\ _ __   ___ _ __  / ___| | __ ___      __
 | | | | '_ \\ / _ \\ '_ \\| |   | |/ _\` \\ \\ /\\ / /
 | |_| | |_) |  __/ | | | |___| | (_| |\\ V  V / 
  \\___/| .__/ \\___|_| |_|\\____|_|\\__,_| \\_/\\_/  
       |_|                                      
{/cyan-fg}{/bold}

{bold}Welcome to OpenClaw TUI!{/bold}

Your friendly AI assistant is ready to help.
Type your message below and press {yellow-fg}Enter{/yellow-fg} to send.

{gray-fg}─────────────────────────────────────────────────{/gray-fg}
{green-fg}Tips:{/green-fg}
  • Press {yellow-fg}F1{/yellow-fg} for keyboard shortcuts
  • Press {yellow-fg}F2{/yellow-fg} to start a new conversation
  • Use {yellow-fg}↑/↓{/yellow-fg} to navigate message history
{gray-fg}─────────────────────────────────────────────────{/gray-fg}
{/center}`;

    this.chatBox.setContent(welcome);
  }

  async sendMessage(text) {
    this.history.push(text);
    this.historyIndex = -1;
    this.input.clearValue();
    
    // Add user message to chat
    this.appendMessage('user', text);
    
    // Show loading
    this.showLoading(true);
    this.isProcessing = true;
    
    try {
      const response = await this.callOpenClaw(text);
      this.appendMessage('assistant', response);
    } catch (error) {
      this.appendMessage('error', `Error: ${error.message}`);
    }
    
    this.showLoading(false);
    this.isProcessing = false;
    this.input.focus();
    this.screen.render();
  }

  appendMessage(role, content) {
    const currentContent = this.chatBox.getContent();
    let newContent = currentContent;
    
    const timestamp = new Date().toLocaleTimeString();
    
    if (role === 'user') {
      newContent += `\n{gray-fg}[${timestamp}]{/gray-fg} {bold}{blue-fg}You:{/blue-fg}{/bold}\n${content}\n`;
    } else if (role === 'assistant') {
      newContent += `\n{gray-fg}[${timestamp}]{/gray-fg} {bold}{green-fg}🦞 OpenClaw:{/green-fg}{/bold}\n${content}\n`;
    } else if (role === 'error') {
      newContent += `\n{red-fg}${content}{/red-fg}\n`;
    }
    
    this.chatBox.setContent(newContent);
    this.chatBox.setScrollPerc(100);
    this.screen.render();
  }

  async callOpenClaw(message) {
    return new Promise((resolve, reject) => {
      // Try to call openclaw CLI
      const openclaw = spawn('openclaw', ['chat', '--message', message], {
        shell: true
      });
      
      let output = '';
      let errorOutput = '';
      
      openclaw.stdout.on('data', (data) => {
        output += data.toString();
      });
      
      openclaw.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });
      
      openclaw.on('close', (code) => {
        if (code === 0 && output) {
          resolve(output.trim());
        } else if (errorOutput) {
          // If openclaw is not installed, provide a helpful message
          if (errorOutput.includes('not recognized') || errorOutput.includes('not found')) {
            resolve(this.getMockResponse(message));
          } else {
            reject(new Error(errorOutput));
          }
        } else {
          resolve(this.getMockResponse(message));
        }
      });
      
      openclaw.on('error', () => {
        // Fallback to mock response if openclaw is not installed
        resolve(this.getMockResponse(message));
      });
      
      // Timeout after 30 seconds
      setTimeout(() => {
        openclaw.kill();
        resolve(this.getMockResponse(message));
      }, 30000);
    });
  }

  getMockResponse(message) {
    const responses = [
      `I understand you're asking about "${message.substring(0, 50)}..."\n\nThis is a demo response from OpenClaw TUI. To get real AI responses, make sure you have OpenClaw CLI installed and configured.\n\nInstall with: {yellow-fg}npm install -g openclaw{/yellow-fg}`,
      `Great question! Here's what I think about "${message.substring(0, 30)}..."\n\n{cyan-fg}Note:{/cyan-fg} This is running in demo mode. Install OpenClaw CLI for full functionality.`,
      `Thanks for your message! I'm OpenClaw TUI, a friendly interface for the OpenClaw CLI.\n\nYour message: "${message.substring(0, 40)}..."\n\n{green-fg}Tip:{/green-fg} Configure your API key with {yellow-fg}openclaw config{/yellow-fg}`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  showLoading(show) {
    if (show) {
      this.loadingBox.show();
      this.animateLoading();
    } else {
      this.loadingBox.hide();
    }
    this.screen.render();
  }

  animateLoading() {
    const frames = ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'];
    let i = 0;
    
    this.loadingInterval = setInterval(() => {
      if (this.loadingBox.hidden) {
        clearInterval(this.loadingInterval);
        return;
      }
      this.loadingBox.setContent(`\n  {yellow-fg}${frames[i]}{/yellow-fg} Processing...`);
      this.screen.render();
      i = (i + 1) % frames.length;
    }, 100);
  }

  toggleHelp() {
    if (this.helpDialog.hidden) {
      this.helpDialog.show();
      this.helpDialog.focus();
    } else {
      this.helpDialog.hide();
      this.input.focus();
    }
    this.screen.render();
  }

  toggleSettings() {
    if (this.settingsDialog.hidden) {
      this.settingsDialog.show();
      this.modelSelect.focus();
    } else {
      this.settingsDialog.hide();
      this.input.focus();
    }
    this.screen.render();
  }

  newConversation() {
    const id = Date.now();
    const name = `Chat ${this.conversations.length + 1}`;
    this.conversations.push({ id, name, messages: [] });
    this.currentConversation = this.conversations.length - 1;
    this.sidebar.addItem(`💬 ${name}`);
    this.clearChat();
    this.updateHeader(`New conversation: ${name}`);
  }

  loadConversation(index) {
    if (index >= 0 && index < this.conversations.length) {
      this.currentConversation = index;
      const conv = this.conversations[index];
      this.chatBox.setContent('');
      conv.messages.forEach(msg => {
        this.appendMessage(msg.role, msg.content);
      });
      this.updateHeader(`Loaded: ${conv.name}`);
    }
  }

  clearChat() {
    this.showWelcome();
    this.screen.render();
  }

  updateHeader(status) {
    this.header.setContent(` {bold}{cyan-fg}🦞 OpenClaw TUI{/cyan-fg}{/bold} │ {green-fg}${status}{/green-fg} │ Press {yellow-fg}F1{/yellow-fg} for help`);
    this.screen.render();
  }

  exit() {
    if (this.openclawProcess) {
      this.openclawProcess.kill();
    }
    this.screen.destroy();
    console.log(chalk.cyan('\n👋 Thanks for using OpenClaw TUI!\n'));
    process.exit(0);
  }
}

module.exports = { OpenClawTUI };
