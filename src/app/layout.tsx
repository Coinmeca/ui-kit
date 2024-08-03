import { Style } from "lib";
import { Metadata, Viewport } from "next";
import { StrictMode } from "react";
import "./global.scss";

export const metadata: Metadata = {
    title: "Coinmeca",
    description: "The next generation decentralized exchange for new finance.",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    interactiveWidget: "overlays-content",
    themeColor: "black",
};

export default function RootLayout({ children }: { children: any }) {
    return (
        <html>
            <body suppressHydrationWarning={true}>
                <StrictMode>
                    <Style.Initialize>{children}</Style.Initialize>
                </StrictMode>
            </body>
        </html>
    );
}
