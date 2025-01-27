import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps, router }: AppProps) {
  const noLayout = router.pathname === "/";
  return noLayout ? (
    <div>
      <Component {...pageProps} />
    </div>
  ) : (
    <SessionProvider>
        <Component {...pageProps} />
    </SessionProvider>
  );
}
