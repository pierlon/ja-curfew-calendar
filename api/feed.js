const generateCalendar = require('../lib/generateCalendar');

module.exports = (req, res) => {
    if (req.method !== 'GET') {
        return res.status(404);
    }

    try {
        const calendar = generateCalendar();
        calendar.serve(res);
    } catch (e) {
        console.error(e);

        const statusCode = e.statusCode || 500;
        const message = 'Internal Server Error';

        res.status(statusCode).send(message);
    }
  };
  