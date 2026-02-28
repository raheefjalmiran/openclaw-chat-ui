#!/usr/bin/env node

const path = require('path');
const { OpenClawTUI } = require('../src/index.js');

const args = process.argv.slice(2);
const options = {
  dev: args.includes('--dev'),
  config: args.find(a => a.startsWith('--config='))?.split('=')[1]
};

const tui = new OpenClawTUI(options);
tui.start();
