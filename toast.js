class ToastManager {
    constructor() {
      this.container = this.createContainer();
    }
    
    createContainer() {
      const container = document.createElement('div');
      container.className = 'custom-toast-container';
      if (document.body) {
        document.body.appendChild(container);
      } else {
        // Fallback if body isn't ready
        document.addEventListener('DOMContentLoaded', () => {
          document.body.appendChild(container);
        });
      }
      return container;
    }
    
    show(title, message) {
      const toast = document.createElement('div');
      toast.className = 'custom-toast show';
      toast.innerHTML = `
        <div class="custom-toast-title">${title}</div>
        <div class="custom-toast-message">${message}</div>
      `;
      this.container.appendChild(toast);
      
      // Remove after animation
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500); 
      }, 1200); // 1.2s display
    }
  }
  
  const toastManager = new ToastManager();
  
  // Let background know this content script is ready
  browser.runtime.sendMessage({ type: 'CONTENT_SCRIPT_READY' });
  
  browser.runtime.onMessage.addListener((message) => {
    if (message.type === 'SHOW_TOAST') {
      toastManager.show(message.title, message.message);
    }
  });
  