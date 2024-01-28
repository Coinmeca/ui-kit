"use client";
import { useState, useEffect, useLayoutEffect } from "react";

export interface WindowSize {
    width: number;
    height: number;
}

export default function useWindowSize() {
    const [windowWidth, setWindowWidth] = useState<number>(global?.innerWidth || 1920);
    const [windowHeight, setWindowHeight] = useState<number>(global?.innerHeight || 1080);
    const [windowSize, setWindowSize] = useState<WindowSize>({ width: windowWidth, height: windowHeight });

    useLayoutEffect(() => {
        function windowResize() {
            setWindowWidth(global?.innerWidth);
            setWindowHeight(global?.innerHeight);
            setWindowSize({
                width: global?.innerWidth,
                height: global?.innerHeight,
            });
        }

        if (global) {
            windowResize();
            global.addEventListener("resize", windowResize);
        }
        return () => global.removeEventListener("resize", windowResize);
    }, []);

    return { windowSize, windowWidth, windowHeight };
}
