chrome.runtime.onInstalled.addListener(() => {
  // initialize an empty domains dict on INSTALL
  // { 'domainname': counterValue }
  const pair = 'btcusdt'

  chrome.storage.local.set({
    pair,
  })
})

// chrome.alarms.create('crypto-monitor', {
// navigationTimer will execute each second
// periodInMinutes: 1 / 60,
// })

// create websocket connection with Binance
const conn = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@miniTicker')

conn.onmessage = function onMessage(message) {
  const price = parseInt(JSON.parse(message.data).c, 10)
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
    currentWindow: true,
  }, (tabs) => {
    if (typeof tabs !== 'undefined') {
      try {
        chrome.tabs.sendMessage(tabs[0].id, { price })
      } catch (e) {
        // do nothing
      }
    }
  })
}

conn.onerror = function onErr(err) {
  console.log(`deu erro: ${err}`)
}

// chrome.alarms.onAlarm.addListener((alarm) => {
// if (alarm.name === 'crypto-monitor') {
// }
// })
