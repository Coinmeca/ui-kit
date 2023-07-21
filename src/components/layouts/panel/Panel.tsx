"use client";
import { motion } from "framer-motion";
import Style from "./Panel.styled";

export interface Panel {
    id?: string;
    children?: any;
    style?: object;
    color?: string;
    active?: boolean;
    fix?: boolean;
}

export default function Panel(props: Panel) {
    const active = typeof props?.active !== "undefined" ? props?.active : true;

    return (
        <Style as={motion.section} layout id={props?.id} $active={active} $color={props?.color} $fix={props?.fix} style={props?.style}>
            {props?.children}
        </Style>
    );
}
