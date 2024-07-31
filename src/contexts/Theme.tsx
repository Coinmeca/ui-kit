"use client";
import { useTheme } from "hooks";
import { type Theme } from "hooks/useTheme";
import { createContext, useLayoutEffect } from "react";

export type Mode = "light" | "dark";

export const ThemeContext = createContext<Theme>({} as Theme);

export default function Theme({ children }: { children?: any }) {
    const { theme, setTheme } = useTheme();

    function update(theme: Mode) {
        setTheme(theme);
        localStorage?.setItem("theme", theme as Mode);
    }

    useLayoutEffect(() => {
        const stored = localStorage.getItem("theme") as Mode | null;
        if (stored) setTheme(stored);
    }, []);

    return <ThemeContext.Provider value={{ theme, setTheme: update }}>{children}</ThemeContext.Provider>;
}
