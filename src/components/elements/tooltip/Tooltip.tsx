'use client';
import Style from "./Tooltip.styled";
import { Layouts } from "components";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface Tooltip {
    active?: boolean;
    children?: any;
    color?: string;
    e?: any;
    vertical?: 'top' | 'center' | 'bottom' | 'cursor';
    horizon?: 'left' | 'center' | 'right' | 'cursor';
    width?: number;
    padding?: number;
    margin?: number | [number, number];
    style?: object;
}

export default function Tooltip(props: Tooltip) {
    const color = props?.color || 'white';
    const margin = props?.margin || 8;

    const ref: any = useRef(null);
    const [active, setActive] = useState(props?.active || false);
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);

    useEffect(() => {
        setActive(true);
        return () => {
            setActive(false);
        }
    }, [])

    useEffect(() => {
        const e = props?.e;
        const h: number = (margin && typeof margin !== 'number') ? margin?.length >= 1 ? margin[0] : 8 : margin;
        const v: number = (margin && typeof margin !== 'number') ? margin?.length >= 2 ? margin[1] : 8 : margin;

        if (e) {
            switch (props?.vertical) {
                case 'top':
                    setY(e?.y - e?.offsetY - v - ref?.current?.clientHeight);
                    break;
                case 'center':
                    setY(e?.y - e?.offsetY + (e?.target?.clientHeight / 2));
                    break;
                case 'bottom':
                    setY(e?.y + e?.offsetY + v);
                    break;
                default:
                    setY(e?.y + v);
            }
            switch (props?.horizon) {
                case 'left':
                    setX(e?.x - e?.offsetX - h - ref?.current?.clientWidth);
                    break;
                case 'center':
                    setX(e?.x - e?.offsetX + (e?.target?.clientWidth / 2) - (ref?.current?.clientWidth / 2));
                    break;
                case 'right':
                    setX(e?.x - e?.offsetX + e?.target?.clientWidth + h);
                    break;
                default:
                    setX(e?.x + h);
            }
        }
    }, [props?.e])

    return <Layouts.Panel active={true} style={{ zIndex: 100, pointerEvents: "none" }} fix>
        <AnimatePresence>
            {active && <Style ref={ref} $color={color} $padding={props?.padding || 1} style={{ top: y, left: x, width: props?.width, ...props?.style }}>
                {props?.children}
            </Style>}
        </AnimatePresence>
    </Layouts.Panel>
}