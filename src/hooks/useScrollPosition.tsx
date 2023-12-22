"use client";

import { useEffect, useState } from "react";

export default function useScrollPosition(initial?: any) {
    const ref = useState<any>(initial?.current?.target);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const target = ref || window;
        console.log(target);
        const updatePosition = () => {
            // setScrollPosition(target.pageYOffset);
        };

        // target.addEventListener("scroll", updatePosition);
        // updatePosition();

        // return () => target.removeEventListener("scroll", updatePosition);
    }, [ref]);

    return { scrollPosition };
}
