import { GG_CALENDAR_WEBHOOK } from "../secrets"

// Axios cannot runs out of the box in background.js due to reliance on XHR and HTTP adapter
// which are not available in the env.

/**
 * Create GG Calendar event, whole day, with notification at 11pm30 and 12pm before event day.
 * @param {String} name Event name 
 * @param {Date} due Due date, preferably from new Date(*).
 */
const createOneEvent = (name, due) => {
  // Send info of new event to the webhook, which creates a GG Calendar 
  // event with noti at 11pm30 and 12pm before `due` day. If noti at 9am
  // instead, the calendar gets cramped with multiple events at 9am, ugly. 
  const res = fetch(
    // Webhook to create calendar event.
    GG_CALENDAR_WEBHOOK,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        due,
      }),
    }
  )
}

export { createOneEvent }