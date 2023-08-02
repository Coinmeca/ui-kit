import "./global.scss";
import { Style } from "@coinmeca/ui/dist/lib";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Style.Initialize>{children}</Style.Initialize>
            </body>
        </html>
    );
}
