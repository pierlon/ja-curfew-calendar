const { ICalEvent, ICalCalendar } = require('ical-generator');
const { DateTime, Settings } = require('luxon');
const curfews = require('../curfews');
const ical = require('ical-generator');

const timezone = 'America/Jamaica';
const domain = 'ja-curfew-calendar.vercel.app';

Settings.defaultZone = timezone;

/**
 * Generate iCalendar for the list of curfews.
 */
function generateCalendar() {
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

    return calendar;
}

/**
 * Generate iCal event for given curfew.
 *
 * @param {Object} curfew Curfew.
 * @param {ICalCalendar} calendar iCalendar instance.
 * @return {ICalEvent} iCal event.
 */
function generateEvent(curfew, calendar) {
    const startDate = DateTime.fromFormat(curfew.from, 'ff');
    const endDate = DateTime.fromFormat(curfew.to, 'ff');

    const event = new ICalEvent(
        {
            start: startDate,
            end: endDate,
            summary: 'Curfew',
            timezone,
        },
        calendar
    );

    if (curfew.repeats) {
        if (curfew.repeats.until) {
            curfew.repeats.until = DateTime.fromFormat(curfew.repeats.until, 'DD');
        }

        if (curfew.repeats.exclude) {
            curfew.repeats.exclude = curfew.repeats.exclude.map(date => DateTime.fromFormat(date, 'ff'));
        }

        event.repeating(curfew.repeats);
    }

    return event;
}

module.exports = generateCalendar;
