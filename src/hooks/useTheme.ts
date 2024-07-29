"use client";
import { useEffect, useState } from "react";

export type Mode = "light" | "dark";

export interface Theme {
    theme: Mode;
    setTheme: (mode: Mode) => void;
}

export default function useTheme(): Theme {
    const [theme, setTheme] = useState<Mode>("light");

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (event: MediaQueryListEvent) => {
            const newTheme = event.matches ? "dark" : "light";
            setTheme(newTheme);
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    return { theme, setTheme };
}
