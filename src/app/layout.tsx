export const metadata = {
    title: "Coinmeca",
    description: "The next generation decentralized exchange for new finance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
