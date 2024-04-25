const { CalendarTaskClient } = require('./api/notion.js')
const axios = require('axios')

  ; (async () => {
    // CalendarTaskClient.getTasks('0b4a231003b94290b141233f85f913b3');
    date = new Date(2024, 3, 9)
    console.log('qwe date', date)
    const newTask = await CalendarTaskClient.createOneTask('0b4a231003b94290b141233f85f913b3', {
      name: 'test npm test',
      due: date,
    });

    // axios.post('https://hook.us1.make.com/dvag2331fs39c8ev18a0m3scqts9d83z',
    //   {
    //     name: 'api check',
    //     due: new Date(2024, 3, 6, 9),
    //   }
    // )
  })()
