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

    useEffect(() => {
        setActive(true);
        return () => {
            setActive(false);
        };
    }, []);

    const vertical = ():number | undefined => {
        const offset: number = margin && typeof margin !== "number" ? (margin?.length >= 2 ? margin[1] : 8) : margin;
        let vertical: number | undefined;
        switch (props?.vertical) {
            case "top":
                vertical = props?.e?.clientY - props?.e?.nativeEvent?.offsetY - offset - ref?.current?.clientHeight;
                break;
            case "center":
                vertical = props?.e?.clientY - props?.e?.nativeEvent?.offsetY + props?.e?.target?.clientHeight / 2;
                break;
            case "bottom":
                vertical = props?.e?.clientY - props?.e?.nativeEvent?.offsetY + props?.e?.target?.clientHeight + offset;
                break;
            default:
                vertical = props?.e?.clientY + offset;        
        }
        return isNaN(vertical as number) ? undefined : vertical;
    }
    const horizon = ():number | undefined => {
        const offset: number = margin && typeof margin !== "number" ? (margin?.length >= 1 ? margin[0] : 8) : margin;
        let horizon: number | undefined;
        switch (props?.horizon) {
            case "left":
                horizon = props?.e?.clientX - props?.e?.nativeEvent?.offsetX - offset - ref?.current?.clientWidth;
                break;
            case "center":
                horizon = props?.e?.clientX - props?.e?.nativeEvent?.offsetX + (props?.e?.target?.clientWidth / 2) - (ref?.current?.clientWidth / 2);
                break;
            case "right":
                horizon = props?.e?.clientX - props?.e?.nativeEvent?.offsetX + props?.e?.target?.clientWidth + offset;
                break;
            default:
                horizon = props?.e?.clientX + offset;
        }
        return isNaN(horizon as number) ? undefined : horizon;
    }

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
            </AnimatePresence>
        </Layouts.Panel>
    );
}
