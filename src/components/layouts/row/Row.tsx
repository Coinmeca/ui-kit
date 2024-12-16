"use client";

import { SwipeProps } from "hooks/useSwipe";
import Style from "./Row.styled";
import { motion } from "motion/react";

export interface Row {
    children?: any;
    title?: string;
    style?: object;
    gap?: number;
    change?: string | false;
    align?: "left" | "center" | "middle" | "right" | "stretch";
    show?: "desktop" | "laptop" | "tablet" | "mobile";
    hide?: "desktop" | "laptop" | "tablet" | "mobile";
    responsive?: "desktop" | "laptop" | "tablet" | "mobile";
    reverse?: boolean;
    fill?: boolean;
    fit?: boolean;
    fix?: boolean;
    swipe?: SwipeProps;
    layout?: boolean | "position" | "size" | "preserve-aspect";
}

export default function Row(props: Row) {
    const gap = props?.gap === 0 ? 0 : props?.gap || 4;
    const fill = props?.fill || false;
    const fit = props?.fit || false;
    const fix = props?.fix || false;
    const reverse = props?.reverse || false;

    return (
        <Style
            {...props?.swipe}
            as={props?.layout ? motion.div : props?.swipe?.as}
            title={props?.title}
            style={props?.style}
            $gap={gap}
            $change={props?.change || undefined}
            $fill={fill}
            $fix={fix}
            $fit={fit}
            $responsive={props?.responsive}
            $reverse={reverse}
            data-row={props?.align}
            data-show={props?.show}
            data-hide={props?.hide}>
            {props?.children}
        </Style>
    );
}
