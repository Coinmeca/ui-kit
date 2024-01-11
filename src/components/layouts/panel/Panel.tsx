"use client";
import { AnimatePresence, motion } from "framer-motion";
import Style from "./Panel.styled";

export interface Panel {
    id?: string;
    active?: boolean;
    children?: any;
    onClick?: Function;
    style?: object;
    color?: string;
    fix?: boolean;
}

export default function Panel(props: Panel) {
    const active = typeof props?.active === "boolean" ? props?.active : true;

    const handleClick = (e: any) => {
        if (typeof props?.onClick === "function") props?.onClick(e);
    };

    return (
        <AnimatePresence>
            {active && (
                <Style
                    key={"panel"}
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
                >
                    {props?.children}
                </Style>
            )}
        </AnimatePresence>
    );
}
