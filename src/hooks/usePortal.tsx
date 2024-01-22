"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";

type Child = Function | ReactNode | null;
type Args = [Child] | [object] | [Child, object] | undefined[];
type Portal = [(...args: Args) => void, Function];

export default function usePortal(initial?: any, initialProps?: any): Portal {
    const [root, setRoot] = useState<Root | undefined>();
    const [active, setActive] = useState(false);
    const [children, setChildren] = useState<Function | ReactNode | object>();
    const [props, setProps] = useState<any>((state: any) => {
        return { ...(state && state), ...(initial && initial?.props && initial?.props), ...(initialProps && initialProps) };
    });

    useEffect(() => {
        !root && setRoot(createRoot(document?.createElement("section")));
        return () => {
            // root?.render(null);
            setActive(false);
            setChildren(null);
            setRoot(undefined);
            root?.unmount();
        };
    }, []);

    useEffect(() => {
        const element = children || initial;
        root?.render(active ? createPortal(typeof element === "function" ? element(props) : element, document?.body) : null);
    }, [active, initial, children, props]);

    return [
        (...args) => {
            if (args) {
                const props =
                    args?.length === 2 && typeof args[1] === "object" && !(args[1] as any)?.$$typeof
                        ? args[1]
                        : args?.length === 1 && typeof args[0] === "object" && !(args[0] as any)?.$$typeof
                        ? args[0]
                        : undefined;
                props &&
                    setProps((state: any) => {
                        return { ...state, ...props };
                    });

                const children =
                    (args?.length === 2 && typeof args[1] === "function") ||
                    (typeof args[1] === "object" && (args[1] as any)?.$$typeof
                        ? args[1]
                        : typeof args[0] === "function" || (typeof args[0] === "object" && (args[0] as any)?.$$typeof)
                        ? args[0]
                        : undefined);
                children && setChildren(children);

                setActive(true);
            }
        },
        () => setActive(false),
    ];
}
