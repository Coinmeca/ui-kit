"use client";
import { useLayoutEffect, useState } from "react";

export type Mode = "light" | "dark";

export interface Theme {
    theme: Mode;
    setTheme: (mode: Mode) => void;
    isForcedDark?: () => boolean;
}

export function detectForcedDarkMode(): boolean {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return false; // Return false if context is not available
        }
        const img = new Image();
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IndoaXRlIi8+PC9zdmc+';

        // Synchronously check if the image is complete and draw it to the canvas
        if (img.complete) {
            ctx.drawImage(img, 0, 0);
            const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
            return (r & g & b) < 255;
        } else return false;
    } catch {
        // If the image is not loaded yet, return false
        return false;
    }
}

export default function useTheme(initial?: Mode): Theme {
    const w = (typeof window !== 'undefined' ? window : global);
    const [theme, setTheme] = useState<Mode>(initial || w?.matchMedia?.("(prefers-color-scheme: dark)") ? "dark" : "light");
    const update = (theme: boolean) => setTheme(theme ? "dark" : "light");

    useLayoutEffect(() => {
        if (!initial) {
            const theme = w.matchMedia("(prefers-color-scheme: dark)");
            update(theme.matches);
            theme.addEventListener("change", (event: any) => update(event?.matches));
            return () => theme.removeEventListener("change", (event: any) => update(event?.matches));
        } else setTheme(initial);
    }, []);

    return { theme, setTheme };
}
