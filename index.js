const curfews = require('./curfews');
const http = require('http');
const ical = require('ical-generator');
const generateEvent = require('./lib/generateEvent');

const calendar = ical({
    name: 'Jamaica Curfews',
    prodId: '//ja-curfew-calendar.vercel.app//Jamaica Curfew Calendar//EN',
    timezone: 'America/Jamaica',
    ttl: 60 * 60 * 24, // 1 day
    url: 'https://ja-curfew-calendar.vercel.app/feed.ical',
});

curfews.forEach(curfew => {
    const event = generateEvent(curfew, calendar);
    calendar.createEvent(event);
}); 

const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    if (req.url === '/feed') {
        calendar.serve(res);
        return;
    }

    res.end();
});
server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
