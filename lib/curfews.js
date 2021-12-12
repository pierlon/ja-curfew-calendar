const { DateTime, Settings } = require('luxon');

const timezone = 'America/Jamaica';
Settings.defaultZone = timezone;

const curfews = [
    {
        start: DateTime.fromFormat('Sep 18, 2021, 6:00 PM', 'ff'),
        end: DateTime.fromFormat('Sep 20, 2021, 5:00 AM', 'ff'),
        repeats: {
            freq: 'weekly',
            byDay: ['sa'],
            until: DateTime.fromFormat('Oct 30, 2021', 'DD'),
            exclude: [DateTime.fromFormat('Oct 16, 2021, 6:00 PM', 'ff')], // exclude Heroes' Day weekend.
        },
    },
    {
        start: DateTime.fromFormat('Sep 20, 2021, 8:00 PM', 'ff'),
        end: DateTime.fromFormat('Sep 21, 2021, 5:00 AM', 'ff'),
        repeats: {
            freq: 'weekly',
            byDay: ['mo', 'tu', 'we', 'th', 'fr'],
            until: DateTime.fromFormat('Oct 30, 2021', 'DD'),
            exclude: [DateTime.fromFormat('Oct 18, 2021, 8:00 PM', 'ff')], // exclude Heroes' Day.
        },
    },
    {
        // Heroes' Day weekend.
        start: DateTime.fromFormat('Oct 16, 2021, 6:00 PM', 'ff'),
        end: DateTime.fromFormat('Oct 19, 2021, 5:00 AM', 'ff'),
    },
    {
        start: DateTime.fromFormat('Oct 29, 2021, 8:00 PM', 'ff'),
        end: DateTime.fromFormat('Oct 30, 2021, 5:00 AM', 'ff'),
        repeats: {
            freq: 'daily',
            until: DateTime.fromFormat('Nov 19, 2021', 'DD'),
        },
    },
    {
        start: DateTime.fromFormat('Nov 18, 2021, 9:00 PM', 'ff'),
        end: DateTime.fromFormat('Nov 19, 2021, 5:00 AM', 'ff'),
        repeats: {
            freq: 'daily',
            until: DateTime.fromFormat('Dec 11, 2021', 'DD'),
        },
    },
    {
        start: DateTime.fromFormat('Dec 10, 2021, 10:00 PM', 'ff'),
        end: DateTime.fromFormat('Dec 11, 2021, 5:00 AM', 'ff'),
        repeats: {
            freq: 'daily',
            until: DateTime.fromFormat('Jan 15, 2022', 'DD'),
            exclude: [
                    DateTime.fromFormat('Dec 24, 2021, 10:00 PM', 'ff'), // exclude Christmas Eve.
                    DateTime.fromFormat('Dec 31, 2021, 10:00 PM', 'ff')  // exclude New Years Eve.
                ], 
        },
    },
    {
        // Christmas Eve.
        start: DateTime.fromFormat('Dec 25, 2021, 1:00 AM', 'ff'),
        end: DateTime.fromFormat('Dec 25, 2021, 5:00 AM', 'ff'),
    },
    {
        // New Years Eve.
        start: DateTime.fromFormat('Jan 1, 2022, 1:00 AM', 'ff'),
        end: DateTime.fromFormat('Jan 1, 2022, 5:00 AM', 'ff'),
    },
];

module.exports = {
    curfews,
    timezone,
};
