"use client";
import { useLayoutEffect, useState } from "react";

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
    const w = (typeof window !== 'undefined' ? window : global);
    const [windowWidth, setWindowWidth] = useState<number>(w?.innerWidth || 1920);
    const [windowHeight, setWindowHeight] = useState<number>(w?.innerHeight || 1080);
    const [windowSize, setWindowSize] = useState<Size>({ width: windowWidth, height: windowHeight });

    useLayoutEffect(() => {
        function windowResize() {
            if (windowWidth !== w?.innerWidth) setWindowWidth(w?.innerWidth);
            if (windowHeight !== w?.innerHeight) setWindowHeight(w?.innerHeight);
            if (windowWidth !== w?.innerWidth || windowHeight !== w?.innerHeight) setWindowSize({ width: w?.innerWidth, height: w?.innerHeight });
        }

        w.addEventListener("change", windowResize);
        w.addEventListener("resize", windowResize);
        windowResize();

        return () => {
            w.removeEventListener("change", windowResize);
            w.removeEventListener("resize", windowResize);
        }
    }, []);

    return { windowSize, windowWidth, windowHeight };
}
