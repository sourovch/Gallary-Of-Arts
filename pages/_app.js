import React from "react";
import Cursor from "@/components/cursor";
import "../styles/globals.css";
import localFont from "next/font/local";
import Head from "next/head";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { NavLink } from "@/components/NavLink";

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
      <AnimatePresence>
        <>
          <Cursor />
          <Component {...pageProps} />
          <nav className="navbar">
            <NavLink href={"/"} className="nav-item aspect-square block">
              <Image
                height={100}
                width={100}
                alt="home"
                src={"/icons/home-icon.png"}
                className="h-full"
              />
            </NavLink>
            <NavLink href={"/gallary"} className="nav-item aspect-square block">
              <Image
                height={100}
                width={100}
                alt="home"
                src={"/icons/gallary-icon.png"}
                className="h-full"
              />
            </NavLink>
          </nav>
        </>
      </AnimatePresence>
    </>
  );
}
