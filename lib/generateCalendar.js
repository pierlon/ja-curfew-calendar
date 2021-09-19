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
        name: 'Curfews in Jamaica',
        prodId: `//${domain}//Jamaica Curfew Calendar//EN`,
        timezone,
        ttl: 60 * 60, // 1 hour.
        url: `https://${domain}//api/feed`,
    });

    curfews.forEach(curfew => {
        const event = generateEvent(curfew, calendar);

        if (event) {
            calendar.createEvent(event);
        }
    });

    return calendar;
}

/**
 * Generate iCal event for given curfew.
 *
 * @param {Object} curfew Curfew.
 * @param {ICalCalendar} calendar iCalendar instance.
 * @return {ICalEvent|null} iCal event or null if the event is stale.
 */
function generateEvent(curfew, calendar) {
    const { start, end, repeats } = curfew;
    const now = DateTime.now();

    // Skip creating event if the start, end, and "repeats until" date is before the current date.
    if (now > start && now > end && now > repeats?.until) {
        return null;
    }

    const event = new ICalEvent(
        {
            timezone,
            start,
            end,
            summary: 'Curfew',
            repeating: repeats ?? null,
        },
        calendar
    );

    return event;
}

module.exports = generateCalendar;
