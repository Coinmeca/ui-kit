"use client";
import { useEffect, useState } from "react";

export type Mode = "light" | "dark";

export interface Theme {
    theme: Mode;
    setTheme: (mode: Mode) => void;
}

export default function useTheme(): Theme {
    const [theme, setTheme] = useState<Mode>(() => {
        const mediaQuery = window?.matchMedia("(prefers-color-scheme: dark)");
        return mediaQuery.matches ? "dark" : "light";
    });

    const handleChange = (event: MediaQueryListEvent) => {
        setTheme(event?.matches ? "dark" : "light");
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        handleChange({ matches: mediaQuery.matches } as MediaQueryListEvent);

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return { theme, setTheme };
}