const badgeTextUpdateHandler = async (alarm) => {
  const { badge } = await chrome.storage.local.get('badge');
  let { current, interval } = badge;

  current = current <= 1 ? interval : current - 1;
  chrome.storage.local.set({ 'badge': { ...badge, current } })
  chrome.action.setBadgeText({ text: String(current) });
}

function startBadgeCountdown(interval) {
  // Timer update remaining time til badge text update.
  chrome.alarms.create("badgeTextUpdate", { periodInMinutes: 1 });
  // Initial badge text. Another event handler at the top of this file
  // handles per minute update.
  chrome.action.setBadgeText({ text: String(interval) });
  chrome.storage.local.set({ 'badge': { current: interval, interval } });
}

function clearBadgeText() {
  chrome.alarms.clear("badgeTextUpdate")
  chrome.action.setBadgeText({ text: '' })
}

export {
  badgeTextUpdateHandler,
  startBadgeCountdown,
  clearBadgeText,
}