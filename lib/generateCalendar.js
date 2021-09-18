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
    const now = DateTime.now();

    const startDate = DateTime.fromFormat(curfew.from, 'ff');
    const endDate = DateTime.fromFormat(curfew.to, 'ff');
    if (curfew.repeats) {
        if (curfew.repeats.until) {
            curfew.repeats.until = DateTime.fromFormat(curfew.repeats.until, 'DD');
        }

        if (curfew.repeats.exclude) {
            curfew.repeats.exclude = curfew.repeats.exclude.map(date => DateTime.fromFormat(date, 'ff'));
        }
    }

    // Skip event if the start, end, and "repeats until" date is before the current date.
    if (now > startDate && now > endDate && now > curfew.repeats?.until) {
        return null;
    }

    const event = new ICalEvent(
        {
            timezone,
            start: startDate,
            end: endDate,
            summary: 'Curfew',
            repeating: curfew.repeats ?? null,
        },
        calendar
    );

    return event;
}

module.exports = generateCalendar;
