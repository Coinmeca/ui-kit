"use client";
import { useState, useEffect } from "react";

export interface WindowSize {
    width: number;
    height: number;
}

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 1920,
        height: 1080,
    });

    useEffect(() => {
        function windowResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", windowResize);
        windowResize();

        return () => window.removeEventListener("resize", windowResize);
    }, []);

    return { windowSize };
}
