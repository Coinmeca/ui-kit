"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";

export default function usePortal(children: any, props?: any) {
    const [root, setRoot] = useState<Root | undefined>();
    const [active, setActive] = useState(false);

    useEffect(() => {
        !root && setRoot(createRoot(document?.createElement("section")));
        return () => {
            setRoot(undefined);
        };
    }, []);

    useEffect(() => {
        root?.render(active ? createPortal(typeof children === "function" && props ? children(props) : children, document?.body) : null);
    }, [root, children, active]);

    return [() => setActive(true), () => setActive(false)];
}
