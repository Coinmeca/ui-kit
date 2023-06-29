import { Style } from "lib";
import "./globals.scss";

export const metadata = {
    title: "Coinmeca",
    description: "The next generation decentralized exchange for new finance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <Style.Initialize>{children}</Style.Initialize>
            </body>
        </html>
    );
}
