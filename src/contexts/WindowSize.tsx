"use client";
import { createContext, useEffect, useState } from "react";

export interface WindowSize {
    width: number;
    height: number;
}

export interface WindowSizeContext {
    windowSize?: WindowSize;
    windowWidth?: number;
    windowHeight?: number;
}

export const WindowSizeContext = createContext<WindowSizeContext>({} as WindowSizeContext);

export default function WindowSize({ children }: { children?: any }) {
    const [windowWidth, setWindowWidth] = useState<number>(1920);
    const [windowHeight, setWindowHeight] = useState<number>(1080);
    const [windowSize, setWindowSize] = useState<WindowSize>({
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

    return <WindowSizeContext.Provider value={{ windowSize, windowWidth, windowHeight }}>{children}</WindowSizeContext.Provider>;
}
