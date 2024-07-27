import "./global.scss";
import { Metadata, Viewport } from "next";
import { StrictMode } from "react";
import { Notification } from "contexts";
import { Style } from "lib";

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
                    <Style.Initialize>
                        <Notification>{children}</Notification>
                    </Style.Initialize>
                </StrictMode>
            </body>
        </html>
    );
}
