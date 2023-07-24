"use client";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";

export default function useTooltip(initialRoot?: Root) {
    const [root, setRoot] = useState<Root | undefined>(initialRoot);
    const [tooltip, setTooltip] = useState<any>();

    useEffect(() => {
        !root && setRoot(createRoot(document?.createElement("section")));
        return () => {
            setRoot(undefined);
        }
    }, []);

    useEffect(() => {
        root?.render(tooltip ? createPortal(tooltip, document?.body) : null);
    }, [tooltip, root]);

    return {
        onTooltip: (children: any) => {
            setTooltip(children);
        },
        closeTooltip: useCallback(() => setTooltip(null), []),
    } as const;
}
