"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Layouts } from "components";
import Style from "./BottomSheet.styled";
import { motion, AnimatePresence } from "framer-motion";

export interface BottomSheet {
    children?: any;
    scale?: number;
    active: boolean;
    height?: number | string | { min?: number | string; max?: number | string };
    onBlur?: Function;
    onClose: Function;
}
export default function BottomSheet(props: BottomSheet) {
    const [mounted, setMounted] = useState<boolean>(false);
    const active = props?.active || false;
    const scale = props?.scale || 1;

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClose = (e: any) => {
        if (typeof props?.onClose === "function") props?.onClose(e);
    };

    const handleBlur = (e: any) => {
        if (typeof props?.onBlur === "function") props?.onBlur(e);
        // handleClose(e);
        // setMounted(false);
    };

    return createPortal(
        <Layouts.Panel active={active} id="panel" style={{ zIndex: 100, pointerEvents: "none" }} fix>
            <AnimatePresence>
                {active && <Style
                    key="bottomsheet"
                    tabIndex={100}
                    $scale={scale}
                    $active={active}
                    $height={props?.height}
                    onBlur={(e: any) => handleBlur(e)}
                    as={motion.div}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ ease: "easeInOut", duration: 0.01 }}
                >
                    {props?.children}
                </Style>}
            </AnimatePresence>
        </Layouts.Panel>,
        document.body)
}
