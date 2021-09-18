const { ICalEvent, ICalCalendar } = require('ical-generator');
const { DateTime, Interval, Settings } = require('luxon');

Settings.defaultZone = 'America/Jamaica';

/**
 * Get duration of curfew in minutes.
 *
 * @param {string} startTime Start time of curfew.
 * @param {string} endTime End time of curfew.
 * @return {Number} Curfew time duration in minutes.
 */
function getCurfewDuration(startTime, endTime) {
    const start = DateTime.fromFormat(startTime, 't');
    const end = DateTime.fromFormat(endTime, 't');

    let diffInMins = end.diff(start, 'minutes').as('minutes');
    if (diffInMins < 0) {
        diffInMins += 60 * 24 // add a day to offset the difference.
    }

    return diffInMins;
}

/**
 * Generate iCal event for given curfew.
 *
 * @param {Object} curfew Curfew.
 * @param {ICalCalendar} calendar iCalendar instance.
 * @return {ICalEvent} iCal event.
 */
function generateEvent(curfew, calendar) {
    const [startTime, endTime] = curfew.duration.split(' - ');
    const durationInMins = getCurfewDuration(startTime, endTime);

    const startDate = DateTime.fromFormat(`${curfew.from}, ${startTime}`, 'ff');

    let endDate;
    if (curfew.allDay) {
        endDate = DateTime.fromFormat(`${curfew.to}, ${endTime}`, 'ff');
    } else {
        endDate = startDate.plus({ minutes:  durationInMins });
    }

    const event = new ICalEvent(
        {
            start: startDate,
            end: endDate,
            summary: 'Curfew',
            timezone: 'America/Jamaica',
        },
        calendar
    );

    if (! curfew.allDay) {
        const lastCurfewDate = DateTime.fromFormat(`${curfew.to}, ${startTime}`, 'ff');
        const timesRepeating = Interval.fromDateTimes(startDate, lastCurfewDate).length('days');

        if (timesRepeating >= 1) {
            event.repeating({
                freq: 'DAILY',
                count: timesRepeating + 1, // add 1 to repeat on last day.
            });
        }
    }

    return event;
}

module.exports = generateEvent;
