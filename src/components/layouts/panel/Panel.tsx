"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Style from "./Panel.styled";

export interface Panel {
    id?: string;
    active?: boolean;
    children?: any;
    onClick?: Function;
    onBlur?: Function;
    style?: object;
    color?: string;
    fix?: boolean;
}

export default function Panel(props: Panel) {
    const [active, setActive] = useState(true);

    const handleClick = (e: any) => {
        if (typeof props?.onClick === "function") props?.onClick(e);
    };

    const handleBlur = (e?: any) => {
        if (typeof props?.onBlur === "function") props?.onBlur(e);
    };

    useEffect(() => {
        if (props?.active) setActive(true);
        else {
            setActive(false);
            return () => {
                handleBlur();
            };
        }
    }, [props?.active]);

    return (
        <AnimatePresence>
            {active && (
                <Style
                    key={"panel"}
                    layoutId={"panel"}
                    id={props?.id}
                    $active={active}
                    $color={props?.color}
                    $fix={props?.fix}
                    style={props?.style}
                    onClick={(e: any) => handleClick(e)}
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 1 }}
                    transition={{ ease: "easeInOut", duration: 0 }}
                    layout="size">
                    {props?.children}
                </Style>
            )}
        </AnimatePresence>
    );
}
