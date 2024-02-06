"use client";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

export interface ScrollPositionContext {
    scrollPosition: number;
    setScrollPosition: Dispatch<SetStateAction<number>>;
}

export const ScrollPositionContext = createContext<ScrollPositionContext>({} as ScrollPositionContext);

export default function ScrollPosition({ target, children }: { target?: any; children?: any }) {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        if (target) {
            if (typeof target === "number") setScrollPosition(target);
            else {
                const update = () => setScrollPosition(target.current?.scrollTop);
                if (target?.current) {
                    target?.current.addEventListener("scroll", update, { passive: true });
                    return () => target?.current?.removeEventListener("scroll", update);
                }
            }
        }
    }, [target]);

    return <ScrollPositionContext.Provider value={{ scrollPosition, setScrollPosition }}>{children}</ScrollPositionContext.Provider>;
}
