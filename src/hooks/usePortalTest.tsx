"use client";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";

export default function usePortalTest(initialRoot?: any) {
    const [root, setRoot] = useState<Root | undefined>(initialRoot);
    const [children, setChildren] = useState<any>();

    useEffect(() => {
        !root && setRoot(createRoot(document?.createElement("section")));
        return () => {
            setRoot(undefined);
        };
    }, []);

    useEffect(() => {
        root?.render(children ? createPortal(children, document?.body) : null);
    }, [root, children]);

    return { portal: (children: any) => setChildren(children), close: () => setChildren(null) };
}
