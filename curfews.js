const curfews = [
    {
        from: 'Sep 18, 2021',
        to: 'Sep 20, 2021',
        duration: '6:00 PM - 5:00 AM',
        repeats: {
            freq: 'weekly',
            byDay: ['sa'],
            until: 'Oct 28, 2021',
            exclude: ['Oct 16, 2021, 6:00 PM'], // exclude Heroes' Day weekend.
        },
    },
    {
        from: 'Sep 20, 2021',
        to: 'Sep 21, 2021',
        duration: '8:00 PM - 5:00 AM',
        repeats: {
            freq: 'weekly',
            byDay: ['mo', 'tu', 'we', 'th', 'fr'],
            until: 'Oct 28, 2021',
        },
    },
    {
        // Heroes' Day weekend.
        from: 'Oct 16, 2021',
        to: 'Oct 19, 2021',
        duration: '6:00 PM - 5:00 AM',
    },
];

module.exports = curfews;
