import browserCheck from '@/bag/utils/BrowserChecker.js'
let html2canvas
let path
if (browserCheck.lowSysVersion() && browserCheck.isAndroid()) {
  path = './html2canvas.041.min.js'
  // html2canvas = require('./html2canvas.041.min.js')
  // _load('https://cdn.bootcss.com/html2canvas/0.4.1/html2canvas.min.js')
} else {
  path = './html2canvas.050beta4.min.js'
  // html2canvas = require('./html2canvas.050beta4.min.js')
  // _load('https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.min.js')
}
html2canvas = require(`${path}`)

export default html2canvas
