const curfews = require('../curfews');
const generateEvent = require('../lib/generateEvent');
const ical = require('ical-generator');

const domain = 'ja-curfew-calendar.vercel.app';

module.exports = (req, res) => {
    if (req.method !== 'GET') {
        return res.status(404);
    }

    const calendar = ical({
        name: 'Jamaica Curfews',
        prodId: `//$${domain}//Jamaica Curfew Calendar//EN`,
        timezone: 'America/Jamaica',
        ttl: 60 * 60, // 1 hour.
        url: `https://${domain}//api/feed`,
    });

    curfews.forEach(curfew => {
        const event = generateEvent(curfew, calendar);
        calendar.createEvent(event);
    });

    calendar.serve(res);
  };