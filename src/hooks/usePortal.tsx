"use client";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";

export default function usePortal(initialRoot?: any) {
    const [root, setRoot] = useState<Root | undefined>(initialRoot);
    const [children, setChildren] = useState();
    const [active, setActive] = useState(true);

    useEffect(() => {
        !root && setRoot(createRoot(document?.createElement("section")));
    }, []);

    useEffect(() => {
        root?.render(active ? createPortal(children, document?.body) : null);
    }, [children, active]);

    return {
        portal: useCallback(
            (children: any) => {
                setChildren(children);
                setActive(true);
            },
            []
        ),
        close: useCallback(() => setActive(false), []),
    } as const;
}
