"use client";
import { useEffect, useState } from "react";

export type Mode = "light" | "dark";

export interface Theme {
    theme: Mode;
    setTheme: (mode: Mode) => void;
}

export default function useTheme(): Theme {
    const w = (typeof window !== 'undefined' && window) || global;
    const [theme, setTheme] = useState<Mode>((typeof window !== 'undefined' && w?.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light");

    const handleChange = (event: MediaQueryListEvent) => {
        setTheme(event?.matches ? "dark" : "light");
    };

    useEffect(() => {
        const mediaQuery = w?.matchMedia("(prefers-color-scheme: dark)");

        handleChange({ matches: mediaQuery.matches } as MediaQueryListEvent);

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return { theme, setTheme };
}