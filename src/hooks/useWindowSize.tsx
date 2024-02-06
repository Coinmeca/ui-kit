"use client";
import { useState, useEffect } from "react";

export interface Size {
    width: number;
    height: number;
}

export interface WindowSize {
    windowWidth: number;
    windowHeight: number;
    windowSize: Size;
}

export default function useWindowSize(): WindowSize {
    const [windowWidth, setWindowWidth] = useState<number>(1920);
    const [windowHeight, setWindowHeight] = useState<number>(1080);
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

        window.addEventListener("resize", windowResize);
        windowResize();

        return () => window.removeEventListener("resize", windowResize);
    }, []);

    return { windowSize, windowWidth, windowHeight };
}
