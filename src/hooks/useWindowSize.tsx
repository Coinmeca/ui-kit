"use client";
import { useState, useEffect } from "react";

export interface WindowSize {
    width: number;
    height: number;
}

function getWindowSize() {
    const { innerWidth: width, innerHeight: height } = globalThis;
    return {
        width,
        height,
    };
}

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState<any>(getWindowSize());

    useEffect(() => {
        function handleResize() {
            setWindowSize(getWindowSize());
        }

        globalThis.addEventListener("resize", handleResize);
        return () => globalThis.removeEventListener("resize", handleResize);
    });

    return windowSize;
}
