const http = require('http');
const generateCalendar = require('./lib/generateCalendar');

const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    if (req.url === '/feed') {
        const calendar = generateCalendar();
        calendar.serve(res);
        return;
    }

    res.end();
});
server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
