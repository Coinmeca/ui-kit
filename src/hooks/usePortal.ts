"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";

type Child = Function | ReactNode | null;
type Args = [Child] | [object] | [Child, object] | undefined[];
type Portal = [open: (...args: Args) => void, close: Function, reset: Function];

export default function usePortal(initial?: any, initialProps?: any): Portal {
    const [root, setRoot] = useState<Root | undefined>(undefined);
    const [active, setActive] = useState(false);
    const [children, setChildren] = useState<Function | ReactNode | object>(null);
    const [props, setProps] = useState<any>((state: any) => {
        return { ...(state || {}), ...(initial?.props || {}), ...(initialProps || {}) };
    });

    useEffect(() => {
        const p = document.createElement("section");
        const r = createRoot(p);
        document.body.appendChild(p);
        setRoot(r);

        return () => {
            setActive(false);
            setChildren(null);
            setRoot(undefined);

            setTimeout(() => {
                if (p.parentNode) p.parentNode.removeChild(p);
                if (r) r.unmount();
            }, 0);
        };
    }, []);

    useEffect(() => {
        const element = children || initial;
        if (root) {
            root.render(active ? createPortal(typeof element === "function" ? element(props) : element, document.body) : null);
        }
    }, [active, initial, children, props, root]);

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
                        return { ...state, ...props, active: true };
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
        () => {
            setProps((state: any) => {
                return { ...state, active: false };
            });
            setActive(false);
        },
        () => {
            setProps(({ active }: { active: boolean }) => ({ active }));
        },
    ];
}
