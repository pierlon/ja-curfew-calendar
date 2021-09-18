const generateCalendar = require('../lib/generateCalendar');

module.exports = (req, res) => {
    if (req.method !== 'GET') {
        return res.status(404);
    }

    const calendar = generateCalendar();
    calendar.serve(res);
  };
  