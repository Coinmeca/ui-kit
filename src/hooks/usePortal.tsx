"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";

export default function usePortal(initial?: Function | ReactNode | null, props?: object) {
    const [root, setRoot] = useState<Root | undefined>();
    const [children, setChildren] = useState<Function | ReactNode | null>();
    const [childrenProps, setChildrenProps] = useState<any>((state: any) => {
        return { ...state, ...props };
    });

    useEffect(() => {
        !root && setRoot(createRoot(document?.createElement("section")));
        return () => {
            setRoot(undefined);
        };
    }, []);

    useEffect(() => {
        root?.render(
            children
                ? createPortal(typeof children === "function" && childrenProps ? children({ ...props, ...childrenProps }) : children, document?.body)
                : null
        );
    }, [children, childrenProps, root]);

    return [
        (children?: Function | ReactNode | null, props?: object) => {
            children
                ? setChildren(children)
                : typeof initial === "function" && props
                ? setChildren(initial({ ...childrenProps, ...props }))
                : setChildren(initial);
            props &&
                setChildrenProps((state: any) => {
                    return { ...state, props };
                });
        },
        () => setChildren(null),
    ] as const;
}
