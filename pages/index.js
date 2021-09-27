import Head from 'next/head'
import { CalendarIcon } from '@heroicons/react/outline'
import { HeartIcon, ChevronDownIcon } from '@heroicons/react/solid'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import iCalExpander from 'ical-expander'
import generateCalendar from '../lib/generateCalendar'
import tippy from 'tippy.js'
import { domain } from '../lib/constants'
import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import GoogleIcon from '../assets/google.svg'
import AppleIcon from '../assets/apple.svg'
import TwitterIcon from '../assets/twitter.svg'
import GitHubIcon from '../assets/github.svg'
import 'tippy.js/dist/tippy.css'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const calendars = [
    { name: 'Add to Google Calendar', url: '/calendar/google', icon: GoogleIcon, external: true },
    { name: 'Add to Apple Calendar', url: '/calendar/apple', icon: AppleIcon },
    { name: 'Download iCalendar file', url: '/calendar.ics', icon: CalendarIcon },
]

function onEventMount({ event, el }) {
    const { title, start, end } = event

    const dateFormat = {
        month: 'long',
        day: 'numeric',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
    }
    const startDate = formatDate(start, dateFormat)
    const endDate = formatDate(end, dateFormat)

    const template = `
        <h1 class="text-lg font-semibold mb-2">${title}</h1>
        <p><span class="font-semibold">Starts:</span> ${startDate}</p>
        <p><span class="font-semibold">Ends:</span> ${endDate}</p>
    `

    tippy(el, {
        content: template,
        trigger: 'click',
        allowHTML: true,
    })
}

export default function Home({ events, twitterUrl }) {
    return (
        <div className="relative bg-gray-100 min-h-screen overflow-hidden">
            <nav className="bg-primary text-white shadow-sm">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-36">
                    <div className="flex justify-between h-16 leading-5">
                        <div className="flex items-center">
                            <CalendarIcon className="h-10 w-10" aria-hidden="true" />
                            <Link href="/">
                                <a className="flex pl-2 sm:flex-col">
                                    <span className="text-xl font-semibold">Curfew Calendar</span>
                                    <span className="sr-only sm:not-sr-only sm:text-xs">for Jamaica</span>
                                </a>
                            </Link>
                        </div>

                        <div className="flex items-center sm:ml-6">
                            <a
                                href={twitterUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-sm hover:text-primary-light transition-colors duration-150"
                            >
                                <TwitterIcon className="opacity-60 h-5 w-5" aria-hidden="true" />
                                <p>
                                    Share{' '}
                                    <span className="sr-only sm:not-sr-only">on Twitter</span>
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="py-10 flex flex-col">
                <main>
                    <div className="max-w-full mx-auto sm:px-6 lg:px-36">
                        <div className="px-4 pb-8 sm:px-0">
                            <Menu as="div" className="relative inline-block text-left lg:hidden">
                                <div>
                                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary">
                                    Add to my calendar
                                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-left z-10 absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                                        <div className="py-1">
                                            { calendars.map((calendar) => (
                                                <Menu.Item key={ calendar.name }>
                                                    {({ active }) => (
                                                        // eslint-disable-next-line react/jsx-no-target-blank
                                                        <a
                                                        href={calendar.url}
                                                        target={calendar.external ? '_blank' : null}
                                                        rel={calendar.external ? 'noopener noreferrer' : null}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'group flex items-center px-4 py-2 text-sm'
                                                        )}
                                                        >
                                                        <calendar.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                                        {calendar.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            )) }
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <div className="grid grid-cols-5 lg:gap-x-10 lg:py-10">
                                <div className="text-center hidden col-span-2 lg:block lg:max-w-lg lg:text-left">
                                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                                        <span className="block">
                                            Keep up to date with the ongoing{' '}
                                            <span className="text-primary">curfews</span>
                                        </span>
                                    </h1>
                                    <p className="mt-3 text-base text-gray-900 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                        Be reminded of when the next curfew starts by adding the schedule to
                                        your favourite calendar.

                                        <span className="inline lg:hidden">
                                            {' '}Or, <a href="#calendar" className="underline text-primary">view the calendar</a>.
                                        </span>
                                    </p>
                                    <div className="mt-5 sm:mt-8 sm:flex sm:flex-col space-y-4">
                                        { calendars.map((calendar) => (
                                            <div key={ calendar.name } className="rounded-md shadow">
                                                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                                                <a
                                                    href={calendar.url}
                                                    target={calendar.external ? '_blank' : null}
                                                    rel={calendar.external ? 'noopener noreferrer' : null}
                                                    className="grid grid-cols-3 gap-2 px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark md:py-4 md:text-lg md:px-10 sm:max-w-xl lg:max-w-none"
                                                >
                                                    <calendar.icon className="w-6 h-6 justify-self-end" aria-hidden="true" />
                                                    <span className="justify-self-start col-span-2">{calendar.name}</span>
                                                </a>
                                            </div>
                                        )) }
                                    </div>
                                </div>

                                <div id="calendar" className="bg-white rounded-lg shadow mt-4 col-span-5 my-auto lg:mt-0 lg:col-span-3">
                                    <FullCalendar
                                        height="auto"
                                        plugins={[ dayGridPlugin ]}
                                        initialView="dayGridMonth"
                                        events={events}
                                        nextDayThreshold="09:00:00"
                                        eventTimeFormat={{
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            omitZeroMinute: true,
                                            meridiem: 'short'
                                        }}
                                        eventDidMount={onEventMount}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer>
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-36 lg:max-w-full">
                        <div className="border-t border-gray-200 pt-8 text-sm text-gray-500 text-center leading-5 space-y-6 md:text-left md:flex md:justify-between md:space-y-0">
                            <div className="flex flex-col items-center md:flex-row">
                                <p>
                                    Made with{' '}
                                    <HeartIcon className="w-5 h-5 text-red-600 inline-flex" aria-hidden="true" />
                                    {' '}by{' '}
                                    <a
                                        href="https://github.com/pierlon"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium text-gray-900 hover:text-gray-500 transition-colors duration-150"
                                    >
                                        @pierlon
                                    </a>
                                </p>
                            </div>

                            <div className="flex items-center flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
                                <a href={twitterUrl} rel="noopener noreferrer" target="_blank" className="inline-flex items-center font-medium space-x-2">
                                    <TwitterIcon className="w-5 h-5" aria-hidden="true" />
                                    <p>
                                        Share{' '}
                                        <span className="sr-only sm:not-sr-only">on Twitter</span>
                                    </p>
                                </a>
                                
                                <a href="https://github.com/pierlon/ja-curfew-calendar" rel="noopener noreferrer" target="_blank" className="inline-flex items-center font-medium space-x-2">
                                    <GitHubIcon className="w-5 h-5" aria-hidden="true" />
                                    <p>
                                        Contribute{' '}
                                        <span className="sr-only sm:not-sr-only">on GitHub</span>
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            {/* <Notification /> */}
        </div>
    )
}

export async function getStaticProps() {
    const ics = generateCalendar().toString()
    const icsExpander = new iCalExpander({ ics, maxIterations: 1000 })
    
    const events = icsExpander.all()
    // todo: keep timezone
    const mappedEvents = events.events.map(e => ({
        title: e.summary,
        start: e.startDate.toString(),
        end: e.endDate.toString(),
    }))
    const mappedOccurrences = events.occurrences.map(o => ({
        title: o.item.summary,
        start: o.startDate.toString(),
        end: o.endDate.toString(),
    }))
    const allEvents = [].concat(mappedEvents, mappedOccurrences);

    const tweetParams = [
        ['text', 'Check out the website by @pie_rlo that allows you to keep track of the curfews in Jamaica, with the option of adding them to your personal calendar!'],
        ['url', `https://${domain}`],
    ].map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join('&')
    const twitterUrl = `https://twitter.com/intent/tweet?${tweetParams}`

    return {
        props: {
            events: allEvents,
            twitterUrl,
        },
    }
}
