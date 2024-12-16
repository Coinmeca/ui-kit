"use client";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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
    const id = useId();
    const [active, setActive] = useState(true);

    const handleClick = (e: any) => {
        if (typeof props?.onClick === "function") props?.onClick(e);
    };

    const handleBlur = (e?: any) => {
        if (typeof props?.onBlur === "function") props?.onBlur(e);
    };

    useEffect(() => {
        if (typeof props?.active === "boolean") {
            setActive(props?.active);
            if (!props?.active) {
                return () => {
                    handleBlur();
                };
            }
        }
    }, [props?.active]);

    return (
        <AnimatePresence>
            {active && (
                <Style
                    key={"panel"}
                    id={props?.id || id}
                    $active={active}
                    $color={props?.color}
                    $fix={props?.fix}
                    style={props?.style}
                    onClick={(e: any) => handleClick(e)}
                    as={motion.div}
                    layoutId={props?.id || id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { ease: "easeOut", duration: 0.3, staggerChildren: 0.1 } }}
                    exit={{ opacity: 0, transition: { staggerChildren: 0.1 } }}
                    transition={{ ease: "easeInOut", duration: 0.15 }}
                    layout="position">
                    {props?.children}
                </Style>
            )}
        </AnimatePresence>
    );
}
