"use client";
import "./globals.scss";
import { Style } from "lib";
import { Screens } from "components";

export const metadata = {
    title: "Coinmeca",
    description: "The next generation decentralized exchange for new finance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <Style.Initialize>
                    <Screens.Exchange>{children}</Screens.Exchange>
                </Style.Initialize>
            </body>
        </html>
    );
}
