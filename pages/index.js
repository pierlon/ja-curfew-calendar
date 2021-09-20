import Head from 'next/head'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ShareIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'

const calendars = [
    { name: 'Google Calendar', url: '/calendar/google' },
    { name: 'Apple Calendar', url: '/calendar/apple' },
    { name: 'Download iCal file', url: '/calendar.ics' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Home() {
    return (
        <div className="relative bg-gray-100 min-h-screen overflow-hidden">
            <Head>
                <title>JA Curfew Calendar</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
                    <div className="mx-auto max-w-8xl lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                                <div className="lg:py-24">
                                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                                        <span className="block">Keep up to date</span>
                                        <span className="block">with the ongoing</span>
                                        <span className="block text-indigo-600">curfews</span>
                                    </h1>
                                    <p className="mt-3 text-base text-gray-900 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                        Having a hard time keeping up with all the curfews and no movement days?
                                        Easily keep up to date with them by clicking the button below to keep track of them via your favourite calendar app,
                                        or simply check-in here to view the schedule.
                                    </p>
                                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                        <Menu as="div" className="relative md:inline-block text-left">
                                            <div>
                                                <Menu.Button className="inline-flex justify-center items-center w-full rounded-md shadow px-8 py-3 border border-transparent text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                                                    Add to my calendar
                                                    <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
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
                                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="py-1">
                                                        {
                                                            calendars.map(calendar => (
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <a
                                                                            href={ calendar.url }
                                                                            target={ calendar.name === 'Google Calendar' ? '_blank' : null }
                                                                            rel={ calendar.name === 'Google Calendar' ? 'noopener' : null }
                                                                            className={classNames(
                                                                                active ? 'bg-indigo-100 text-indigo-900' : 'text-indigo-700',
                                                                                'block px-4 py-2 text-sm',
                                                                                'md:py-2 md:text-base'
                                                                            )}
                                                                        >
                                                                            { calendar.name }
                                                                        </a>
                                                                    )}
                                                                </Menu.Item>
                                                            ))
                                                        }
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                        <div className="mt-3 sm:mt-0 sm:ml-3">
                                            <a
                                                href="https://twitter.com/intent/tweet?text=Keep%20up%20to%20date%20with%20the%20curfew%20dates%20in%20Jamaica%20by%20adding%20them%20to%20your%20calendar%20via%20https%3A%2F%2Fja-curfew-calendar.vercel.app%21"
                                                target="_blank"
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                                            >
                                                <ShareIcon className="mr-3 h-6 w-6" aria-hidden="true"/>
                                                Share
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:flex lg:items-center">
                                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                                    <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&src=cDJ0Z2k1NzY0aG11dDhzOHA2Nmw0ZnE2dXNudGtsZjBAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&showPrint=0&showNav=1&showTitle=0&showTabs=0&showCalendars=0&showTz=1" style={{ borderWidth: 0, width: 650, height: 450, frameborder: 0, scrolling: 'no' }}></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
