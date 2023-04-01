import { type AppType } from "next/app";
import { type Session } from "next-auth";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";
import "~/styles/globals.css";
import ArrowLeftIcon from "~/components/icons/ArrowLeft";
import CogSixToothIcon from "~/components/icons/CogSixTooth";
import PaintBrushIcon from "~/components/icons/PaintBrush";
import LightBulbIcon from "~/components/icons/LightBulb";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { asPath } = useRouter();

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Smart Cities</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#16a34a" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <header className="fixed top-0 flex h-14 w-screen items-center bg-green-600 px-2 text-2xl font-medium text-green-950">
        {asPath === "/" || asPath === "/home" ? (
          <h1>Home</h1>
        ) : (
          <button onClick={Router.back} className="capitalize">
            <h1 className="inline-flex items-center gap-2">
              <ArrowLeftIcon />
              {asPath.split("/").pop()?.replaceAll("-", " ")}
            </h1>
          </button>
        )}
      </header>
      <main className="fixed top-[theme(space.14)] flex min-h-[calc(100vh-theme(space.14)-theme(space.16))] w-screen flex-col items-center justify-center">
        <Component {...pageProps} />
      </main>
      <footer className="fixed bottom-0 flex h-[calc(16+env(safe-area-inset-bottom))] w-screen items-center justify-center bg-green-600 text-green-950">
        <nav>
          <ul className="flex gap-2">
            <li
              aria-current={asPath === "/my-ideas" ? "page" : "false"}
              className="w-24 rounded-xl px-2  py-1 aria-[current=page]:bg-green-800 aria-[current=page]:font-medium aria-[current=page]:text-green-100 aria-[current=page]:shadow-md"
            >
              <Link
                className="flex flex-col items-center gap-1"
                href="/my-ideas"
              >
                <LightBulbIcon />
                My Ideas
              </Link>
            </li>
            <li
              aria-current={
                asPath === "/" || asPath.split("/").at(1) === "home"
                  ? "page"
                  : "false"
              }
              className="w-24 rounded-xl px-2 py-1 aria-[current=page]:bg-green-800 aria-[current=page]:font-medium aria-[current=page]:text-green-100 aria-[current=page]:shadow-md"
            >
              <Link className="flex flex-col items-center gap-1" href="/home">
                <PaintBrushIcon />
                Imagine
              </Link>
            </li>
            <li
              aria-current={asPath === "/settings" ? "page" : "false"}
              className="px- w-24 rounded-xl  py-1 aria-[current=page]:bg-green-800 aria-[current=page]:font-medium aria-[current=page]:text-green-100 aria-[current=page]:shadow-md"
            >
              <Link
                className="flex flex-col items-center gap-1"
                href="/settings"
              >
                <CogSixToothIcon />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
