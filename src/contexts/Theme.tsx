"use client";
import { useTheme } from "hooks";
import { createContext } from "react";

export type Mode = "light" | "dark";

export interface ThemeContext {
    theme: Mode;
    setTheme: (mode: Mode) => void;
}

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

export default function Theme({ children }: { children?: any }) {
    const { theme, setTheme } = useTheme();
    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
