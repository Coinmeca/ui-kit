"use client";
import { useEffect, useState } from "react";

export type Mode = "light" | "dark";

export interface Theme {
    theme: Mode;
    setTheme: (mode: Mode) => void;
}

export default function useTheme(): Theme {
    const [theme, setThemeState] = useState<Mode>("light");

    function setTheme(mode: Mode) {
        setThemeState(mode);
        localStorage.setItem("theme", mode);
    }

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as Mode | null;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");

        const applyTheme = (isLight: boolean) => {
            const newTheme = isLight ? "light" : "dark";
            if (!storedTheme) {
                setThemeState(newTheme);
            }
        };

        if (storedTheme) {
            setThemeState(storedTheme);
        } else {
            applyTheme(mediaQuery.matches);
        }

        const handleChange = (event: MediaQueryListEvent) => {
            if (!localStorage.getItem("theme")) {
                applyTheme(event.matches);
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    return { theme, setTheme };
}
