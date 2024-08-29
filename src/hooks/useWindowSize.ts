"use client";
import { useState, useEffect } from "react";

interface Size {
    width: number;
    height: number;
}

interface WindowSize {
    windowWidth: number;
    windowHeight: number;
    windowSize: Size;
}

export default function useWindowSize(): WindowSize {
    const w = typeof window !== "undefined" ? window : global;
    const [windowWidth, setWindowWidth] = useState<number>(w?.innerWidth || 1920);
    const [windowHeight, setWindowHeight] = useState<number>(w?.innerHeight || 1080);
    const [windowSize, setWindowSize] = useState<Size>({
        width: windowWidth,
        height: windowHeight,
    });

    useEffect(() => {
        function windowResize() {
            if (windowWidth !== window.innerWidth) setWindowWidth(window.innerWidth);
            if (windowHeight !== window.innerHeight) setWindowHeight(window.innerHeight);
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("change", windowResize);
        window.addEventListener("resize", windowResize);
        windowResize();

        return () => {
            window.removeEventListener("change", windowResize);
            window.removeEventListener("resize", windowResize);
        };
    }, []);

    return { windowSize, windowWidth, windowHeight };
}
