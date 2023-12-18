import "./global.scss";
import { Metadata } from "next";
import { Style } from "lib";
import { NotificationCenter } from "contexts";
import { StrictMode } from "react";

export const metadata: Metadata = {
    title: "Coinmeca",
    description: "The next generation decentralized exchange for new finance.",
    viewport: {
        width: "device-width",
        initialScale: 1,
        interactiveWidget: "overlays-content",
    },
    themeColor: "black",
};

export default function RootLayout({ children }: { children: any }) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <StrictMode>
                    <Style.Initialize>
                        <NotificationCenter>{children}</NotificationCenter>
                    </Style.Initialize>
                </StrictMode>
            </body>
        </html>
    );
}
