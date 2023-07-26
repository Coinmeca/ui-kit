"use client";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";

export default function useTooltip(initial?: Function | ReactNode | null, props?: object) {
    const [root, setRoot] = useState<Root | undefined>();
    const [tooltip, setTooltip] = useState<any>();
    const [tooltipProps, setTooltipProps] = useState<any>(props);

    useEffect(() => {
        !root && setRoot(createRoot(document?.createElement("section")));
        return () => {
            setRoot(undefined);
        };
    }, []);

    useEffect(() => {
        root?.render(tooltip ? createPortal(typeof tooltip === "function" && tooltipProps ? tooltip(tooltipProps) : tooltip, document?.body) : null);
    }, [tooltip, tooltipProps, root]);

    return [
        ({ tooltip, props }: { tooltip?: Function | ReactNode | null; props?: object }) => {
            tooltip ? setTooltip(tooltip) : typeof initial === "function" && props ? setTooltip(initial(props)) : setTooltip(initial);
            props && setTooltipProps(props);
        },
        () => setTooltip(null),
    ] as const;
}
