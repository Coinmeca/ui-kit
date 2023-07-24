"use client";
import { useEffect, useState } from "react";
import { Layouts } from "components";
import { motion, AnimatePresence } from "framer-motion";
import Style from "./BottomSheet.styled";

export interface BottomSheet {
    children?: any;
    active?: boolean;
    scale?: number;
    height?: number | string | { min?: number | string; max?: number | string };
    onBlur?: Function;
    onClose?: Function;
}

export default function BottomSheet(props: BottomSheet) {
    const [active, setActive] = useState<boolean>(props?.active || false);
    const scale = props?.scale || 1;

    useEffect(() => {
        setActive(true);
        return () => {
            if (typeof props?.onClose === "function") props?.onClose();
            setActive(false);
        };
    }, []);

    const handleBlur = (e?: any) => {
        if (typeof props?.onBlur === "function") props?.onBlur(e);
    };

    return (
        <Layouts.Panel active={true} style={{ zIndex: 100, pointerEvents: "none" }} fix>
            <AnimatePresence>
                {active && (
                    <Style
                        key="bottomsheet"
                        tabIndex={100}
                        $scale={scale}
                        $active={active}
                        $height={props?.height}
                        onBlur={(e: any) => handleBlur(e)}
                        as={motion.div}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ ease: "easeInOut", duration: 0.15 }}
                    >
                        {props?.children}
                    </Style>
                )}
            </AnimatePresence>
        </Layouts.Panel>
    );
}
