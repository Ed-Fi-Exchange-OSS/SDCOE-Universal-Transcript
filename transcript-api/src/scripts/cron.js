const { cronProcess: cronLinux } = require('./processLinux');
const { cronProcess: cronWindow } = require('./processWindows');

// On Windows, it returns win32 (even on 64 bit).
if (process.platform === 'win32') {
  cronWindow();
} else {
  cronLinux();
}
