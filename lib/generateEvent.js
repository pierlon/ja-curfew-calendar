const { ICalEvent, ICalCalendar } = require('ical-generator');
const { DateTime, Interval, Settings } = require('luxon');

Settings.defaultZone = 'America/Jamaica';

/**
 * Generate iCal event for given curfew.
 *
 * @param {Object} curfew Curfew.
 * @param {ICalCalendar} calendar iCalendar instance.
 * @return {ICalEvent} iCal event.
 */
function generateEvent(curfew, calendar) {
    const [startTime, endTime] = curfew.duration.split(' - ');

    const startDate = DateTime.fromFormat(`${curfew.from}, ${startTime}`, 'ff');
    const endDate = DateTime.fromFormat(`${curfew.to}, ${endTime}`, 'ff');

    const event = new ICalEvent(
        {
            start: startDate,
            end: endDate,
            summary: 'Curfew',
            timezone: 'America/Jamaica',
        },
        calendar
    );

    if (curfew.repeats) {
        event.repeating(curfew.repeats);
    }

    return event;
}

module.exports = generateEvent;
