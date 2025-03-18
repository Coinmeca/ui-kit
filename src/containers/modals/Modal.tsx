"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Controls, Elements, Layouts } from "components";
import Style, { ButtonArea, Close } from "./Modal.styled";

export interface Modal {
    active?: boolean;
    title?: any;
    message?: any;
    children?: any;
    content?: any;
    buttonArea?: any;
    width?: number | { min?: number; max?: number };
    style?: object;
    close?: boolean;
    onClose: Function;
    outsideClose?: boolean;
    scroll?: boolean;
    fullsize?: boolean;
}

export default function Modal(props: Modal) {
    const id = `${new Date().getTime()}`;
    const [active, setActive] = useState<boolean>(props?.active || true);
    const [height, setHeight] = useState();
    const ref: any = useRef(null);

    const min = 56;
    const max = 64;
    const width = {
        min: (typeof props?.width === "object" ? props?.width?.min : props?.width) || min,
        max: (typeof props?.width === "object" ? props?.width?.max : props?.width) || max,
    };
    const scroll = typeof props?.scroll === "boolean" ? props?.scroll : true;

    const handleClose = (e?: any) => {
        setActive(false);
        setTimeout(() => {
            if (typeof props?.onClose === "function") props?.onClose(e);
        }, 300);
    };
    useEffect(() => {
        // setActive(true);
        return () => setActive(false);
    }, []);

    // useLayoutEffect(() => {
    //     if (ref.current) {
    //         const resizeObserver = new ResizeObserver(() => ref.current && setHeight(ref.current?.clientHeight));
    //         resizeObserver.observe(ref.current);
    //         return () => {
    //             resizeObserver.disconnect();
    //         };
    //     }
    // }, [ref.current]);

    return (
        <Layouts.Panel
            active={active}
            color={"black"}
            style={{ zIndex: 200 }}
            onClick={(e: any) =>
                active && ref.current && !ref.current.contains(e?.target) && props?.outsideClose && handleClose(e)
            }
            fix>
            <AnimatePresence>
                {active && (
                    <Style
                        key={"modal"}
                        $active={active}
                        $width={width}
                        $fullsize={props?.fullsize}
                        style={props?.style}
                        as={motion.div}
                        // layoutId={id}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{
                            scale: active ? 1 : 0.9,
                            opacity: active ? 1 : 0,
                            transition: { ease: "easeInOut", duration: 0.05 },
                        }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ transition: { ease: "easeInOut", duration: 0.15 } }}
                        // layout
                    >
                        <div style={{ height }}>
                            <div ref={ref}>
                                {props?.title && (
                                    <Elements.Text size={2} align={"center"}>
                                        {props?.title}
                                    </Elements.Text>
                                )}
                                {(props?.message || props?.content || props?.children) && (
                                    <Layouts.Contents.InnerContent scroll={scroll}>
                                        {props?.message &&
                                            (typeof props?.message === "string" ? (
                                                <Elements.Text type={"strong"} height={2} opacity={0.6} align={"center"}>
                                                    {props?.message}
                                                </Elements.Text>
                                            ) : (
                                                props?.message
                                            ))}
                                        {props?.content}
                                        {props?.children}
                                    </Layouts.Contents.InnerContent>
                                )}
                                {props?.buttonArea &&
                                    (typeof props?.buttonArea?.active === "boolean" ? props?.buttonArea?.active : true) && (
                                        <ButtonArea $gap={props?.buttonArea?.gap} style={props?.buttonArea?.style}>
                                            {props?.buttonArea?.children || props?.buttonArea}
                                        </ButtonArea>
                                    )}
                                {props?.close && (
                                    <Close>
                                        <Controls.Button icon={"x"} onClick={(e: any) => handleClose(e)} />
                                    </Close>
                                )}
                            </div>
                        </div>
                    </Style>
                )}
            </AnimatePresence>
        </Layouts.Panel>
    );
}
