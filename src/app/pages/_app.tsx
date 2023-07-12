import "./globals.scss";
import { ThemeProvider } from "styled-components";
import { Style } from "lib";

export default function App({ Component, pageProps }: { Component: any; pageProps: any }) {
    return (
        <>
            {/* <ThemeProvider theme={theme}> */}
            <Component suppressHydrationWarning={true} {...pageProps} />
            {/* </ThemeProvider> */}
        </>
    );
}
