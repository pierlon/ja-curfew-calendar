const { ICalEvent, ICalCalendar } = require('ical-generator');
const { DateTime } = require('luxon');
const { curfews, timezone } = require('./curfews');
const { domain } = require('./constants');
const ical = require('ical-generator');

/**
 * Generate iCalendar for the list of curfews.
 */
function generateCalendar() {
    const calendar = ical({
        name: 'Curfews in Jamaica',
        prodId: `//${domain}//Jamaica Curfew Calendar//EN`,
        timezone,
        ttl: 60 * 60, // 1 hour.
        url: `https://${domain}/calendar.ics`,
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
