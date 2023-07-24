"use client";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";

export default function useTooltip(initialRoot?: any) {
    const [root, setRoot] = useState<Root | undefined>(initialRoot);
    const [tooltip, setTooltip] = useState();
    const [active, setActive] = useState(true);

    useEffect(() => {
        !root && setRoot(createRoot(document?.createElement("section")));
    }, []);

    useEffect(() => {
        root?.render(active ? createPortal(tooltip, document?.body) : null);
    }, [tooltip, active]);

    return {
        onTooltip: useCallback(
            (children: any) => {
                setTooltip(children);
                setActive(true);
            },
            []
        ),
        closeTooltip: useCallback(() => setActive(false), []),
    } as const;
}
