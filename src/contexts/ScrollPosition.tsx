"use client";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

export interface ScrollPosition {
    ref: any;
    children: any;
}

export interface ScrollPositionContext {
    scrollPosition: number;
    setScrollPosition: Dispatch<SetStateAction<number>>;
}

export const ScrollPositionContext = createContext<ScrollPositionContext>({} as ScrollPositionContext);

export default function ScrollPosition({ ref, children }: ScrollPosition) {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const updatePosition = () => {
            setScrollPosition(ref.pageYOffset);
        };

        if (ref && ref?.current) ref?.current?.addEventListener("scroll", updatePosition, { passive: true });

        return () => ref?.current?.removeEventListener("scroll", updatePosition);
    }, [ref]);

    return <ScrollPositionContext.Provider value={{ scrollPosition, setScrollPosition }}>{children}</ScrollPositionContext.Provider>;
}
