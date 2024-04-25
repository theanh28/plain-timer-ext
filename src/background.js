'use strict';

import { setTimer, clearTimer, timerIntervalEndHandler } from './handler/timer.js';
import { badgeTextUpdateHandler, clearBadgeText } from './handler/badgeText.js';
import { addTaskAndNoti } from './handler/notion.js';

// Event interceptor
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Background received message", message)
  if (message.action === "setTimer") {
    setTimer(message);
  }
  if (message.action === "clearTimer") {
    clearTimer()
    clearBadgeText()
  }
  if (message.action === "addTask") {
    addTaskAndNoti(message)
  }
});

// Alarm handler dispatch. Force script wakes up.
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("Alarm received", alarm)
  if (alarm.name === "intervalEnd") timerIntervalEndHandler(alarm);
  if (alarm.name === "badgeTextUpdate") badgeTextUpdateHandler(alarm);
});

// Prepare on start up for time sync.
chrome.runtime.onStartup.addListener(async () => {
  // Move badge text to max as timer starts now.
  const { badge } = await chrome.storage.local.get('badge');
  let { interval } = badge;
  chrome.action.setBadgeText({ text: String(interval) });
  // If there was a task before start up (from prev session),
  // Chrome starts it for us, and we update it here.
})