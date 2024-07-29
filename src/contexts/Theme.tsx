"use client";
import { createContext, useEffect, useState } from "react";

export type Mode = "light" | "dark";

export interface ThemeContext {
    theme: Mode;
    setTheme: (mode: Mode) => void;
}

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

export default function Theme({ children }: { children?: any }) {
    const [theme, updateTheme] = useState<Mode>("light");

    function setTheme(mode: Mode) {
        updateTheme(mode);
        localStorage.setItem("theme", mode);
    }

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as Mode | null;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = (isDark: boolean) => {
            const newTheme = isDark ? "dark" : "light";
            if (!storedTheme) {
                updateTheme(newTheme);
            }
        };

        if (storedTheme) {
            updateTheme(storedTheme);
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

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
