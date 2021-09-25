import Head from 'next/head'

const calendars = [
    { name: 'Add to Google Calendar', url: '/calendar/google', external: true },
    { name: 'Add to Apple Calendar', url: '/calendar/apple' },
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
                                        <span className="block">
                                            Keep up to date with the ongoing{' '}
                                            <span className="text-indigo-600">curfews</span>
                                        </span>
                                    </h1>
                                    <p className="mt-3 text-base text-gray-900 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                        Remind yourself when the next curfew is about to start by adding the schedule to
                                        your favourite calendar.
                                    </p>
                                    <div className="mt-5 sm:mt-8 sm:flex sm:flex-col sm:justify-center sm:space-y-4 lg:justify-start">
                                        { calendars.map((calendar) => (
                                            <div key={ calendar.name } className="rounded-md shadow">
                                                <a
                                                    href={calendar.url}
                                                    target={calendar.external ? '_blank' : null}
                                                    rel={calendar.external ? 'noopener noreferrer' : null}
                                                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                                                >
                                                    {calendar.name}
                                                </a>
                                            </div>
                                        )) }
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:flex lg:items-center">
                                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                                    {/* todo: add calender */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* todo: add footer */}
        </div>
    )
}
