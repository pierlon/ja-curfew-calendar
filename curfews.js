const { DateTime } = require('luxon');

const curfews = [
    {
        start: DateTime.fromFormat('Sep 18, 2021, 6:00 PM', 'ff'),
        end: DateTime.fromFormat('Sep 20, 2021, 5:00 AM', 'ff'),
        repeats: {
            freq: 'weekly',
            byDay: ['sa'],
            until: DateTime.fromFormat('Oct 29, 2021', 'DD'),
            exclude: [DateTime.fromFormat('Oct 16, 2021, 6:00 PM', 'ff')], // exclude Heroes' Day weekend.
        },
    },
    {
        start: DateTime.fromFormat('Sep 20, 2021, 8:00 PM', 'ff'),
        end: DateTime.fromFormat('Sep 21, 2021, 5:00 AM', 'ff'),
        repeats: {
            freq: 'weekly',
            byDay: ['mo', 'tu', 'we', 'th', 'fr'],
            until: DateTime.fromFormat('Oct 29, 2021', 'DD'),
            exclude: [DateTime.fromFormat('Oct 18, 2021, 8:00 PM', 'ff')], // exclude Heroes' Day.
        },
    },
    {
        // Heroes' Day weekend.
        start: DateTime.fromFormat('Oct 16, 2021, 6:00 PM', 'ff'),
        end: DateTime.fromFormat('Oct 19, 2021, 5:00 AM', 'ff'),
    },
];

module.exports = curfews;
