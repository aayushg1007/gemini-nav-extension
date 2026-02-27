let lastLength = 0;

function init() {
  if (document.getElementById('gemini-nav-sidebar')) return;

  const sidebar = document.createElement('div');
  sidebar.id = 'gemini-nav-sidebar';
  sidebar.innerHTML = `<div id="nav-list"></div>`;
  document.body.appendChild(sidebar);
  
  // Watch for new chat bubbles
  const observer = new MutationObserver(debounce(() => updateSidebar(), 500));
  observer.observe(document.body, { childList: true, subtree: true });
  
  updateSidebar(); // Run once immediately
}

function updateSidebar() {
  const navList = document.getElementById('nav-list');
  if (!navList) return;

  // Use the robust selectors you confirmed worked
  const userMessages = document.querySelectorAll('div[data-message-author-role="user"], .user-query-content, .query-text');
  
  if (userMessages.length === lastLength && lastLength !== 0) return;
  lastLength = userMessages.length;
  
  navList.innerHTML = '';

  userMessages.forEach((msg, index) => {
    const textContent = msg.innerText.trim();
    if (!textContent) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'nav-item-wrapper';

    // The minimalist line
    const line = document.createElement('div');
    line.className = 'nav-line';

    // The hover content
    const tooltip = document.createElement('div');
    tooltip.className = 'nav-tooltip';

    let displayText = textContent.split('\n')[2];
    displayText = displayText.length > 50 ? displayText.substring(0, 50) + '...' : displayText;
    tooltip.innerText = `${index + 1}. ${displayText}`;

    wrapper.appendChild(line);
    wrapper.appendChild(tooltip);

    wrapper.onclick = () => {
      msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Visual feedback on the message itself
      msg.animate([
        { backgroundColor: 'rgba(138, 180, 248, 0.2)' },
        { backgroundColor: 'transparent' }
      ], { duration: 1500 });
    };

    navList.appendChild(wrapper);
  });
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

// Keep the sidebar alive during navigation
setInterval(() => {
  if (!document.getElementById('gemini-nav-sidebar')) init();
}, 1500);

init();