"use client";
import Style from "./Tooltip.styled";
import { Layouts } from "components";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
}

export default function Tooltip(props: Tooltip) {
    const color = props?.color || "white";
    const margin = props?.margin || 8;
    const padding = props?.padding || 2;

    const ref: any = useRef();
    const [active, setActive] = useState(props?.active || false);
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);

    useEffect(() => {
        setActive(true);
        return () => {
            setActive(false);
        };
    }, []);

    useEffect(() => {
        const e = props?.e;
        const h: number = margin && typeof margin !== "number" ? (margin?.length >= 1 ? margin[0] : 8) : margin;
        const v: number = margin && typeof margin !== "number" ? (margin?.length >= 2 ? margin[1] : 8) : margin;

        console.log(e?.clientY - e?.nativeEvent?.offsetY - v, ref?.current?.clientHeight);
        if (e) {
            switch (props?.vertical) {
                case "top":
                    setY(e?.clientY - e?.nativeEvent?.offsetY - v - (ref?.current?.clientHeight || e?.target?.clientHeight) * 1.5);
                    // setY(e?.clientY - e?.nativeEvent?.offsetY - v);
                    break;
                case "center":
                    setY(e?.clientY - e?.nativeEvent?.offsetY + e?.target?.clientHeight / 2);
                    break;
                case "bottom":
                    setY(e?.clientY - e?.nativeEvent?.offsetY + v + e?.target?.clientHeight);
                    break;
                default:
                    setY(e?.clientY + v);
            }
            switch (props?.horizon) {
                case "left":
                    setX(e?.clientX - e?.nativeEvent?.offsetX - h - ref?.current?.clientWidth);
                    break;
                case "center":
                    setX(e?.clientX - e?.nativeEvent?.offsetX + e?.target?.clientWidth / 2 - (ref?.current?.clientWidth || e?.target?.clientWidth) / 2);
                    break;
                case "right":
                    setX(e?.clientX - e?.nativeEvent?.offsetX + e?.target?.clientWidth + h);
                    break;
                default:
                    setX(e?.clientX + h);
            }
        }
    }, [props?.e, props?.vertical, props?.horizon, props?.fill, margin]);

    return (
        <AnimatePresence>
            <Layouts.Panel active={true} style={{ zIndex: 100, pointerEvents: "none" }} fix>
                {active && (
                    <Style
                        key="tooltip"
                        ref={ref}
                        $color={color}
                        $padding={padding}
                        style={{
                            top: isNaN(y) ? undefined : y,
                            left: isNaN(x) ? undefined : x,
                            minWidth: props?.width || props?.fill ? `calc(${props?.e?.target?.clientWidth}px - ${padding * 2}em)` : undefined,
                            ...props?.style,
                        }}
                        as={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "easeInOut", duration: 0.3 }}
                    >
                        {props?.children}
                    </Style>
                )}
            </Layouts.Panel>
        </AnimatePresence>
    );
}
