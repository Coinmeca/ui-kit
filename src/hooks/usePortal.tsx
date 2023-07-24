"use client";
import { useCallback, useEffect, useId, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";

export default function usePortal(initialRoot?: any) {
    const id = useId().replaceAll(":", "");
    const [root, setRoot] = useState<Root | undefined>(initialRoot);
    const [children, setChildren] = useState<any>();

    useEffect(() => {
        !root && setRoot(createRoot(document?.createElement("section")));
        return () => {
            setRoot(undefined);
        }
    }, []);

    useEffect(() => {
        root?.render(children ? createPortal(children, document?.body) : null);
    }, [children, root]);

    return {
        portal: useCallback(((children: any) => {
            setChildren(children);
        }), []),
        close: () => setChildren(null),
    } as const;
}
