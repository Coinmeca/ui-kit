"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";

export default function useTooltip(initial?: Function | ReactNode | null, initialProps?: object) {
    const [root, setRoot] = useState<Root | undefined>();
    const [tooltip, setTooltip] = useState<Function | ReactNode | null>(initial);
    const [tooltipProps, setTooltipProps] = useState<any>((state: any) => {
        return { ...state, ...initialProps };
    });

    useEffect(() => {
        !root && setRoot(createRoot(document?.createElement("section")));
        return () => {
            setRoot(undefined);
        };
    }, []);

    useEffect(() => {
        root?.render(
            tooltip
                ? createPortal(typeof tooltip === "function" && tooltipProps ? tooltip({ ...initialProps, ...tooltipProps }) : tooltip, document?.body)
                : null
        );
    }, [tooltip, tooltipProps, root]);

    return [
        ({ tooltip, props }: { tooltip?: Function | ReactNode | null; props?: object }) => {
            tooltip ? setTooltip(tooltip) : typeof initial === "function" && props ? setTooltip(initial({ ...tooltipProps, ...props })) : setTooltip(initial);
            props &&
                setTooltipProps((state: any) => {
                    return { ...state, props };
                });
        },
        () => setTooltip(null),
    ] as const;
}
