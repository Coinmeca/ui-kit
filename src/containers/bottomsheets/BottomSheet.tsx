"use client";
import { Layouts } from "components";
import { AnimatePresence, motion } from "motion/react";
import { useSwipe } from "hooks";
import { Swipe } from "hooks/useSwipe";
import { useEffect, useRef, useState } from "react";
import Style, { SwipeArea } from "./BottomSheet.styled";
import { CSSProperties } from "styled-components";

export interface BottomSheet {
    children?: any;
    active?: boolean;
    scale?: number;
    height?: number | string | { min?: number | string; max?: number | string };
    onBlur?: Function;
    onClose?: Function;
    style?: CSSProperties;
    zIndex?: number;
    swipe?: Swipe & { area?: number };
}

export default function BottomSheet(props: BottomSheet) {
    const bottomsheet: any = useRef(null);

    const [active, setActive] = useState<boolean>(props?.active || true);
    const scale = props?.scale || 1;
    const swipe = useSwipe(
        props?.swipe && {
            ...(typeof props?.swipe === "object" && props?.swipe),
            threshold: 10000,
            vertical: true,
            elastic: { top: 0, bottom: 1 },
            variants: (direction: number) => ({
                y: direction > 0 ? 0 : `100%`,
            }),
            onSwipe: (e: any, move: number) => move === -1 && handleClose(e),
        },
    );

    const handleClose = (e?: any) => {
        setActive(false);
        setTimeout(() => {
            if (typeof props?.onClose === "function") props?.onClose();
        }, 300);
    };

    const handleBlur = (e: any) => {
        if (bottomsheet.current && !bottomsheet.current.contains(e.target)) {
            setActive(false);
            setTimeout(() => {
                if (typeof props?.onBlur === "function") props?.onBlur(e);
            }, 300);
        }
    };

    useEffect(() => {
        // setActive(true);
        document.addEventListener("mousedown", handleBlur);
        return () => {
            document.removeEventListener("mousedown", handleBlur);
            handleClose();
            setActive(false);
        };
    }, []);

    return (
        <Layouts.Panel
            active={active}
            style={{ zIndex: props?.zIndex || 200, pointerEvents: "none" }}
            onClick={(e: any) => handleBlur(e)}
            fix>
            <AnimatePresence mode="wait">
                {active && (
                    <Style
                        {...(swipe && !props?.swipe?.area ? swipe : {})}
                        key={"bottomsheet"}
                        ref={bottomsheet}
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
                        layout>
                        {props?.swipe?.area && (
                            <SwipeArea
                                {...swipe}
                                as={motion.div}
                                $area={(typeof props?.swipe === "object" && props?.swipe?.area) || 2}
                                variants={undefined}
                            />
                        )}
                        {props?.children}
                    </Style>
                )}
            </AnimatePresence>
        </Layouts.Panel>
    );
}
