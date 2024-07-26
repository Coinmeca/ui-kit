"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Layouts } from "components";
import { useSwipe } from "hooks";
import { Swipe } from "hooks/useSwipe";
import Style, { SwipeArea } from "./BottomSheet.styled";

export interface BottomSheet {
    children?: any;
    active?: boolean;
    scale?: number;
    height?: number | string | { min?: number | string; max?: number | string };
    onBlur?: Function;
    onClose?: Function;
    style?: any;
    zIndex?: number;
    swipe?: Swipe & { area?: number };
}

export default function BottomSheet(props: BottomSheet) {
    const [active, setActive] = useState<boolean>(props?.active || true);
    const scale = props?.scale || 1;
    const swipe = useSwipe(
        props?.swipe && {
            ...(typeof props?.swipe === "object" && props?.swipe),
            vertical: true,
            elastic: { top: 0, bottom: 1 },
            variants: (direction: number) => ({
                y: direction > 0 ? 0 : `100%`,
            }),
            onSwipe: (e: any, move: number) => move === -1 && handleClose(e),
        }
    );

    useEffect(() => {
        // setActive(true);
        return () => {
            handleClose();
            setActive(false);
        };
    }, []);

    const handleClose = (e?: any) => {
        if (typeof props?.onClose === "function") props?.onClose();
    };

    const handleBlur = (e?: any) => {
        if (typeof props?.onBlur === "function") props?.onBlur(e);
    };

    return (
        <Layouts.Panel active={active} style={{ zIndex: props?.zIndex || 100, pointerEvents: "none" }} onClick={(e: any) => handleBlur(e)} fix>
            <AnimatePresence>
                {active && (
                    <Style
                        {...(swipe && !props?.swipe?.area ? swipe : {})}
                        key={"bottomsheet"}
                        tabIndex={100}
                        $scale={scale}
                        $active={active}
                        $height={props?.height}
                        onBlur={(e: any) => handleBlur(e)}
                        as={motion.div}
                        initial={{ y: "100%" }}
                        animate={{ y: active ? 0 : "100%" }}
                        exit={{ y: "100%" }}
                        transition={{ ease: "easeInOut", duration: 0.15 }}
                        variants={undefined}
                        style={props?.style}
                    >
                        {props?.swipe?.area && (
                            <SwipeArea {...swipe} as={motion.div} $area={(typeof props?.swipe === "object" && props?.swipe?.area) || 2} variants={undefined} />
                        )}
                        {props?.children}
                    </Style>
                )}
            </AnimatePresence>
        </Layouts.Panel>
    );
}
