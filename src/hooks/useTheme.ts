"use client";
import { useEffect, useState } from "react";

export type Mode = "light" | "dark";

export interface Theme {
    theme: Mode;
    setTheme: (mode: Mode) => void;
}

export default function useTheme(): Theme {
    const w = (typeof window !== "undefined" && window) || global;
    const [theme, setTheme] = useState<Mode>(w?.matchMedia("(prefers-color-scheme: dark)") || CSS.supports("color-scheme", "dark") ? "dark" : "light");

    useEffect(() => {
        const theme = w?.matchMedia("(prefers-color-scheme: dark)") || CSS.supports("color-scheme", "dark");
        theme.addEventListener("theme", (event: any) => setTheme(event.matche ? "dark" : "light"));
        setTheme(theme.matches ? "dark" : "light");

        return () => theme.removeEventListener("theme", (event: any) => setTheme(event.matches));
    }, []);

    return { theme, setTheme };
}
