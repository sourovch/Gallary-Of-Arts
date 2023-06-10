import React from "react";
import Cursor from "@/components/cursor";
import "../styles/globals.css";
import localFont from "next/font/local";
import Head from 'next/head'

const fraktion = localFont({
  src: [
    {
      path: "../public/Fonts/PPFraktionMono-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Fonts/PPFraktionMono-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/Fonts/PPFraktionMono-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/Fonts/PPFraktionMono-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-fraktion",
});

export default function MyApp({ Component, pageProps }) {
  if (typeof window === "undefined") React.useLayoutEffect = () => {};

  return (
    <>
      <style global jsx>{`
        html {
          --font-fraktion: ${fraktion.style.fontFamily};
          font-family: ${fraktion.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>Gallary Of Arts</title>
      </Head>
      <Cursor />
      <Component {...pageProps} />
    </>
  );
}
