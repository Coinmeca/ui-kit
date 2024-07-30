"use client";
import { createContext, useEffect, useState } from "react";

export type Mode = "light" | "dark";

export interface ThemeContext {
    theme: Mode;
    setTheme: (mode: Mode) => void;
}

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

export default function Theme({ children }: { children?: any }) {
    const w = (typeof window !== "undefined" && window) || global;
    const [theme, updateTheme] = useState<Mode>(w?.matchMedia("(prefers-color-scheme: dark)") || CSS.supports("color-scheme", "dark") ? "dark" : "light");

    function setTheme(mode: Mode) {
        updateTheme(mode);
        localStorage.setItem("theme", mode);
    }

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as Mode | null;
        const theme = w?.matchMedia("(prefers-color-scheme: dark)") || CSS.supports("color-scheme", "dark");

        const applyTheme = (isDark: boolean) => {
            const newTheme = isDark ? "dark" : "light";
            if (!storedTheme) {
                updateTheme(newTheme);
            }
        };

        if (storedTheme) {
            updateTheme(storedTheme);
        } else {
            applyTheme(theme.matches);
        }

        const handleChange = (event: MediaQueryListEvent) => {
            if (!localStorage.getItem("theme")) {
                applyTheme(event.matches);
            }
        };

        theme.addEventListener("change", handleChange);

        return () => {
            theme.removeEventListener("change", handleChange);
        };
    }, []);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
