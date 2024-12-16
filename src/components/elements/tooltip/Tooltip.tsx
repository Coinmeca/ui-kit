"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Layouts } from "components";
import Style from "./Tooltip.styled";

export interface Tooltip {
    active?: boolean;
    children?: any;
    color?: string;
    e?: any;
    vertical?: "top" | "center" | "bottom" | "cursor";
    horizon?: "left" | "center" | "right" | "cursor";
    width?: number;
    padding?: number;
    margin?: number | [number, number];
    style?: object;
    fill?: boolean;
    fit?: boolean;
}

export default function Tooltip(props: Tooltip) {
    const ref: any = useRef(null);
    props?.e?.stopPropagation();
    const event = props?.e?.nativeEvent?.relatedTarget?.offsetParent?.getBoundingClientRect();

    const color = props?.color || "white";
    const margin = props?.margin || 8;
    const padding = props?.padding || 2;

    const [active, setActive] = useState(props?.active || false);

    const vertical = useCallback((): number | undefined => {
        const offset: number = margin && typeof margin !== "number" ? (margin?.length >= 2 ? margin[1] : 8) : margin;
        let vertical: number | undefined;
        switch (props?.vertical) {
            case "top":
                vertical = event?.top - ref?.current?.offsetHeight - offset;
                break;
            case "center":
                vertical = event?.top + ref?.current?.offsetHeight / 2;
                break;
            case "bottom":
                vertical = event?.top + props?.e?.target?.offsetHeight + offset;
                break;
            default:
                vertical = event?.top + offset;
        }
        return isNaN(vertical as number) ? event?.top : vertical;
    }, [margin, event?.top, props?.e?.target?.offsetHeight, props?.vertical]);

    const horizon = useCallback((): number | undefined => {
        const offset: number = margin && typeof margin !== "number" ? (margin?.length >= 1 ? margin[0] : 8) : margin;
        let horizon: number | undefined;
        switch (props?.horizon) {
            case "left":
                horizon = event?.left - ref?.current?.offsetWidth - offset;
                break;
            case "center":
                horizon = event?.left + event?.width / 2 - ref?.current?.offsetWidth / 2;
                break;
            case "right":
                horizon = event?.left + event?.width + offset;
                break;
            default:
                horizon = event?.left + offset;
        }
        return isNaN(horizon as number) ? event?.left : horizon;
    }, [margin, event?.left, event?.width, props?.horizon]);

    useEffect(() => {
        setActive(true);
        return () => {
            setActive(false);
        };
    }, []);

    return (
        <Layouts.Panel active={true} style={{ zIndex: 100, pointerEvents: "none" }} fix>
            <AnimatePresence>
                {active && (
                    <Style
                        key={"tooltip"}
                        ref={ref}
                        $color={color}
                        $padding={padding}
                        style={{
                            top: vertical(),
                            left: horizon(),
                            minWidth:
                                props?.width ||
                                (props?.fill && event?.width ? `calc(${event?.width}px - ${padding * 2}em)` : undefined),
                            maxWidth:
                                props?.width ||
                                (props?.fit && event?.width ? `calc(${event?.width}px - ${padding * 2}em)` : undefined),
                            ...props?.style,
                        }}
                        as={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeInOut", duration: 0.3 }}>
                        {props?.children}
                    </Style>
                )}
            </AnimatePresence>
        </Layouts.Panel>
    );
}
