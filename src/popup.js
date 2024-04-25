'use strict';

// Function to populate input fields with current task name and timer interval
async function populateInputFields() {
  const { timer } = await chrome.storage.local.get('timer');
  document.getElementById("taskNameInput").value = timer.taskName || '';
  document.getElementById("intervalInput").value = timer.interval || 0;
}

// Call populateInputFields function when popup is opened
populateInputFields();

function setTimer() {
  const taskName = document.getElementById("taskNameInput").value;
  const interval = parseInt(document.getElementById("intervalInput").value);
  chrome.runtime.sendMessage({ action: "setTimer", taskName, interval });

  document.getElementById("confirmText").textContent = "Task timer SET";
}

function clearTimer() {
  chrome.runtime.sendMessage({ action: "clearTimer" });

  document.getElementById("taskNameInput").value = '';
  document.getElementById("intervalInput").value = 0;
  document.getElementById("confirmText").textContent = "Task timer CLEARED";
}

// Function to handle creation of calendar task
function createCalendarTask() {
  // Getting input values
  const taskName = document.getElementById("calendarTaskInput").value;
  const dueDate = document.getElementById("dueDateInput").value;

  // Validation - checking if both fields are filled
  if (taskName.trim() === "") {
    document.getElementById("taskConfirmationText").textContent = "Task name?";
    return;
  }

  // Processing due date input (optional, depending on your needs)
  // default = no due = empty string
  console.log('[X] time', `**${dueDate}**`)
  const dueDateObject = dueDate ? new Date(dueDate) : undefined;

  // Invoke the background spell.
  chrome.runtime.sendMessage({ action: "addTask", taskName, due: dueDateObject });

  // Displaying confirmation message
  document.getElementById("taskConfirmationText").textContent = "Task created!";
}

// Add task listener to the Set Timer button
document.getElementById("setTimerButton").addEventListener("click", setTimer);
// Add task listener for "Enter" key press in Inputs
document.getElementById("taskNameInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") setTimer();
});
document.getElementById("intervalInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") setTimer();
});

// Clear Timer btn
document.getElementById("clearTimerButton").addEventListener("click", clearTimer);

// Adding task listener to the "Create task" button
document.getElementById("createTaskButton").addEventListener("click", createCalendarTask);
