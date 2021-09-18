const curfews = [
    {
        from: 'Sep 18, 2021, 6:00 PM',
        to: 'Sep 20, 2021, 5:00 AM',
        repeats: {
            freq: 'weekly',
            byDay: ['sa'],
            until: 'Oct 29, 2021',
            exclude: ['Oct 16, 2021, 6:00 PM'], // exclude Heroes' Day weekend.
        },
    },
    {
        from: 'Sep 20, 2021, 8:00 PM',
        to: 'Sep 21, 2021, 5:00 AM',
        repeats: {
            freq: 'weekly',
            byDay: ['mo', 'tu', 'we', 'th', 'fr'],
            until: 'Oct 29, 2021',
            exclude: ['Oct 18, 2021, 8:00 PM'], // exclude Heroes' Day.
        },
    },
    {
        // Heroes' Day weekend.
        from: 'Oct 16, 2021, 6:00 PM',
        to: 'Oct 19, 2021, 5:00 AM',
    },
];

module.exports = curfews;
