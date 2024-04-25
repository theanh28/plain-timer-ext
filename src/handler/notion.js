import { createOneEvent } from '../api/ggCalendar.js';
import { CalendarTaskClient } from '../api/notion.js'

const OUR_DB = '0b4a231003b94290b141233f85f913b3'

/**
 * Sets up a Notion task + GG calendar at due.
 * @param {String} name 
 * @param {Date} due - preferrably from new Date()
 */
async function addTaskAndNoti(message) {
  // Potential Error for missing name.
  let { taskName, due } = message
  due = due ? new Date(due) : undefined
  CalendarTaskClient.createOneTask(OUR_DB, {
    name: taskName, due,
  });

  if (due) {
    // Notion yet has alarm API, create a 
    // GG calendar event instead.
    createOneEvent(taskName, due)
  }
}

export {
  addTaskAndNoti,
}