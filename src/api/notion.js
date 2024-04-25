import { Client } from "@notionhq/client"

const CalendarTaskClient = {
  notion: new Client({
    auth: 'secret_GT13SsLoAGnivAXtCOFCnD5kGRKYaqaRzyIcOdH9Sfx',
  }),

  /**
   * get tasks
   * @param {String} databaseId calendar id
   * @param {Object} properties 
   * @returns 
   */
  // TODO: test this.
  async getTasks(
    databaseId, properties
  ) {
    // and read back what we just did
    const queryResponse = await this.notion.databases.query({
      database_id: databaseId,
    })
    console.log('qwe res:', queryResponse.results.slice(0, 2))
    const res = queryResponse.results.slice(0, 20)
    res.forEach(task => {
      if (task.properties.Status.status.id === 'not-started') {
        console.log(task.properties.Due)
      }
    })
  },

  /**
   * Create Notion task at db with properties
   * 
   * @param {Number} databaseId db to add task 
   * @param {Object} properties name, due
   * @returns 
   */ 
  async createOneTask(
    databaseId, properties
  ) {
    const { name, due } = properties
    const taskProps = {}

    if (name) {
      taskProps['Task name'] = {
        title: [{
          text: { content: name },
        }]
      }
    } else {
      throw new Error('notion::createOneTask(): Missing task name')
    }

    if (due) {
      // Due is optional.
      taskProps.Due = {
        type: 'date',
        date: { start: due }
      }
    }

    return this.notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: taskProps,
    })
  }

}

export { CalendarTaskClient }