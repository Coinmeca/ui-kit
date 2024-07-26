'use client';
import { createContext, useLayoutEffect, useState } from 'react';

export interface Size {
    width: number;
    height: number;
}

export interface WindowSizeContext {
    windowWidth: number;
    windowHeight: number;
    windowSize: Size;
}

export const WindowSizeContext = createContext<WindowSizeContext>({} as WindowSizeContext);

export default function WindowSize({ children }: { children?: any }) {
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
        window.addEventListener('resize', windowResize);
        windowResize();

        return () => window.removeEventListener('resize', windowResize);
    }, []);

    return <WindowSizeContext.Provider value={{ windowSize, windowWidth, windowHeight }}>{children}</WindowSizeContext.Provider>;
}
