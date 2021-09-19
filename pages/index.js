import Head from 'next/head';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Home</title>
                <meta name="description" content="Welcome home!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Welcome home!</h1>
            </main>
        </div>
    );
}
