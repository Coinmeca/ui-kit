"use client";
import { useCallback, useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";

export default function usePortal(children: any) {
    const [root, setRoot] = useState<Root | undefined>();
    const [active, setActive] = useState(false);

    useEffect(() => {
        !root && setRoot(createRoot(document?.createElement("section")));
        return () => {
            setRoot(undefined);
        };
    }, []);

    useEffect(() => {
        root?.render(active ? createPortal(children, document?.body) : null);
    }, [root, children, active]);

    return [() => setActive(true), () => setActive(false)];
}
