import { Montserrat, Noto_Sans_KR } from "next/font/google";

const en = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    display: "swap",
});
const kr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
    variable: "--font-noto-kr",
    display: "swap",
});

export { en, kr };
