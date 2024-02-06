"use client";
import { useEffect, useState } from "react";

export type Mode = "light" | "dark";

export interface Theme {
    theme: Mode;
    setTheme: (mode?: Mode) => void;
}

export default function useTheme(): Theme {
    const [theme, updateTheme] = useState<Mode | undefined>();

    function setTheme(mode?: Mode) {
        updateTheme(mode);
        mode ? localStorage?.setItem("theme", mode) : localStorage?.removeItem("theme");
    }

    useEffect(() => {
        function changeTheme(mode: boolean) {
            if (!localStorage?.getItem("theme")) updateTheme(mode ? "light" : "dark");
        }

        const theme = window.matchMedia("(prefers-color-scheme: light)") || CSS.supports("color-scheme", "light");
        theme.addEventListener("theme", (event: any) => changeTheme(event.matches));
        changeTheme(theme.matches);

        return () => theme.removeEventListener("theme", (event: any) => changeTheme(event.matches));
    }, []);

    return { theme, setTheme };
}
