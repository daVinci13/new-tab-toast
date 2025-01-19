function getHostname(url) {
    try {
      return new URL(url).hostname;
    } catch (e) {
      return url;
    }
  }
  
  const readyTabs = new Set();
  const messageQueue = new Map();
  
  function processMessageQueue(tabId) {
    if (!messageQueue.has(tabId)) return;
      
    const messages = messageQueue.get(tabId);
    if (messages.length === 0) {
      messageQueue.delete(tabId);
      return;
    }
  
    const message = messages[0];
    browser.tabs.sendMessage(tabId, message)
      .then(() => {
        messages.shift();
        if (messages.length > 0) {
          processMessageQueue(tabId);
        }
      })
      .catch(() => {
        setTimeout(() => processMessageQueue(tabId), 100);
      });
  }
  
  function queueMessage(tabId, message) {
    if (!messageQueue.has(tabId)) {
      messageQueue.set(tabId, []);
    }
    const messages = messageQueue.get(tabId);
    messages.push(message);
    if (readyTabs.has(tabId) && messages.length === 1) {
      processMessageQueue(tabId);
    }
  }
  browser.runtime.onMessage.addListener((message, sender) => {
    if (message.type === 'CONTENT_SCRIPT_READY') {
      readyTabs.add(sender.tab.id);
      processMessageQueue(sender.tab.id);
    }
  });
  browser.tabs.onRemoved.addListener((tabId) => {
    readyTabs.delete(tabId);
    messageQueue.delete(tabId);
  });
  browser.webNavigation.onCreatedNavigationTarget.addListener((details) => {
    browser.tabs.get(details.sourceTabId).then((sourceTab) => {
      browser.tabs.query({ active: true, currentWindow: true }).then((activeTabs) => {
        if (activeTabs[0]) {
          const activeTabId = activeTabs[0].id;
          const domain = getHostname(details.url);
          queueMessage(activeTabId, {
            type: 'SHOW_TOAST',
            title: 'Tab Opened',
            message: domain
          });
        }
      });
    });
  });
  browser.webNavigation.onCompleted.addListener((details) => {
    if (details.frameId !== 0) return;
  });
  