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
    const [windowWidth, setWindowWidth] = useState<number>((typeof window !== 'undefined' ? window : global)?.innerWidth || 1920);
    const [windowHeight, setWindowHeight] = useState<number>((typeof window !== 'undefined' ? window : global)?.innerHeight || 1080);
    const [windowSize, setWindowSize] = useState<Size>({
        width: windowWidth,
        height: windowHeight,
    });

    function windowResize() {
        if (windowWidth !== window?.innerWidth) setWindowWidth(window?.innerWidth);
        if (windowHeight !== window?.innerHeight) setWindowHeight(window?.innerHeight);
        setWindowSize({
            width: window?.innerWidth,
            height: window?.innerHeight,
        });
    }

    useLayoutEffect(() => {
        window.addEventListener("resize", windowResize);
        windowResize();

        return () => window.removeEventListener("resize", windowResize);
    }, []);

    return { windowSize, windowWidth, windowHeight };
}
