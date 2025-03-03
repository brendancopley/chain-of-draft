#!/usr/bin/env node

/**
 * Node.js wrapper for the Chain of Draft Python server
 * This provides better compatibility with Claude Desktop
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Path to the Python server script
const serverPath = path.join(__dirname, 'server.py');

// Error if server.py doesn't exist
if (!fs.existsSync(serverPath)) {
  console.error(`Error: Server file not found at ${serverPath}`);
  process.exit(1);
}

// Launch the Python process
const pythonProcess = spawn('python3', [serverPath], {
  env: {
    ...process.env,
    PYTHONUNBUFFERED: '1' // Ensure Python output isn't buffered
  }
});

// Pass stdin to the Python process
process.stdin.pipe(pythonProcess.stdin);

// Pipe Python's stdout to our stdout
pythonProcess.stdout.pipe(process.stdout);

// Log stderr but don't pipe it to avoid protocol errors
pythonProcess.stderr.on('data', (data) => {
  console.error(`[COD Server]: ${data}`);
});

// Handle process termination
pythonProcess.on('close', (code) => {
  console.error(`Chain of Draft server exited with code ${code}`);
  process.exit(code);
});

// Forward termination signals
process.on('SIGINT', () => {
  pythonProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  pythonProcess.kill('SIGTERM');
});