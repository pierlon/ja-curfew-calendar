const { ICalEvent, ICalCalendar } = require('ical-generator');
const { DateTime, Settings } = require('luxon');

const timezone = 'America/Jamaica';
Settings.defaultZone = timezone;

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

module.exports = generateEvent;
