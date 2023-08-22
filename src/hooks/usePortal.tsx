"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";

export default function usePortal(initial?: any, initialProps?: any) {
    const [root, setRoot] = useState<Root | undefined>();
    const [active, setActive] = useState(false);
    const [children, setChildren] = useState<Function | ReactNode | null>();
    const [childrenProps, setChildrenProps] = useState<any>((state: any) => {
        return { ...state, ...initialProps };
    });

    useEffect(() => {
        !root && setRoot(createRoot(document?.createElement("section")));
        return () => {
            root?.render(null);
            // root?.unmount();
            setActive(false);
            setChildren(null);
            setRoot(undefined);
        };
    }, []);

    useEffect(() => {
        root?.render(
            active
                ? createPortal(
                      initial
                          ? typeof initial === "function"
                              ? initial(childrenProps)
                              : initial
                          : children &&
                                (typeof children === "function"
                                    ? children(childrenProps)
                                    : children),
                      document?.body,
                  )
                : null,
        );
    }, [root, initial, children, childrenProps, active]);

    return [
        (children?: Function | ReactNode | null, props?: object) => {
            children &&
                (typeof children === "function"
                    ? setChildren(
                          children({
                              ...(initialProps && initialProps),
                              ...(props && props),
                          }),
                      )
                    : setChildren(children));
            props &&
                setChildrenProps((state: any) => {
                    return { ...state, ...props };
                });
            setActive(true);
        },
        () => setActive(false),
    ];
}
