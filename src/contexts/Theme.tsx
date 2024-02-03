"use client";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

export type Mode = "light" | "dark";

export interface ThemeContext {
    theme?: Mode;
    updateTheme: Dispatch<SetStateAction<Mode | undefined>>;
    setTheme: (mode?: Mode) => void;
}

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

export default function Theme({ children }: { children?: any }) {
    const [theme, updateTheme] = useState<Mode | undefined>();

    function setTheme(mode?: Mode) {
        updateTheme(mode);
        mode ? localStorage?.setItem("theme", mode) : localStorage?.removeItem("theme");
    }

    useEffect(() => {
        const theme = window?.matchMedia("(prefers-color-scheme: light)");
        function changeTheme(mode: boolean) {
            if (!localStorage?.getItem("theme")) updateTheme(mode ? "light" : "dark");
        }
        theme.addEventListener("theme", (event: any) => changeTheme(event.matches));
        changeTheme(theme.matches);

        return () => theme.removeEventListener("theme", (event: any) => changeTheme(event.matches));
    }, []);

    return <ThemeContext.Provider value={{ theme, setTheme, updateTheme }}>{children}</ThemeContext.Provider>;
}
