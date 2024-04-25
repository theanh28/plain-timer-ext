import { startBadgeCountdown } from "./badgeText.js";

async function setTimer(message) {
  let { taskName, interval } = message;

  /// For peace of mind, isNaN false against all comparison, so cannot
  // do interval <= 0.
  if (typeof value === 'number' || !(interval > 0)) return;

  chrome.alarms.create("intervalEnd", { periodInMinutes: interval });
  chrome.storage.local.set({ 'timer': { taskName: taskName, interval } });

  startBadgeCountdown(interval)
}

async function clearTimer() {
  chrome.storage.local.set({ 'timer': { taskName: "", interval: 0 } });
  chrome.alarms.clear("intervalEnd")
};

const timerIntervalEndHandler = async (alarm) => {
  const { timer } = await chrome.storage.local.get('timer');
  const { taskName, interval } = timer;

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length == 0) return; // in chrome://, not an "active" tab.
    chrome.tabs.sendMessage(tabs[0].id, { taskName });
  });

  console.log("End of interval")
}

export {
  setTimer,
  clearTimer,
  timerIntervalEndHandler,
}