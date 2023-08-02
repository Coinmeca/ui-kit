"use client";
import "./global.scss";
import { Style } from "@coinmeca/ui/dist/lib";
import { Frames } from "@coinmeca/ui/dist/components";
import Data from "./data";

export const metadata = {
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
    const { header, sidebars } = Data();
    return (
        <html lang="en">
            <body>
                <Style.Initialize>
                    <Frames.Frame header={header} sidebar={sidebars} align={"right"} background={{ img: { src: 2 } }} side={56}>
                        {children}
                    </Frames.Frame>
                </Style.Initialize>
            </body>
        </html>
    );
}
