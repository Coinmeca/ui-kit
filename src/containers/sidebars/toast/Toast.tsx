"use client";
import { Layouts } from "components";
import { type Notify as Content } from "contexts/Notification";
import { Swipe } from "hooks/useSwipe";
import Notify from "../notification/Notify";
import Style from "./Toast.styled";
import { CSSProperties } from "styled-components";

export interface Toast {
    list?: Content[];
    active?: boolean;
    width?: number;
    align?: "left" | "right";
    style?: CSSProperties;
    swipe?: Swipe;
}

export default function Toast({ list, active, width, align, style, swipe }: Toast) {
    width = width || 60;
    align = align === "left" || align === "right" ? align : "left";

    return (
        active &&
        list &&
        list?.length > 0 && (
            <Style $width={width} $align={align} style={style} data-active={typeof list !== "undefined" ? true : false}>
                <Layouts.Contents.InnerContent style={{ flexDirection: "column-reverse" }}>
                    {/* <AnimatePresence key={"notification"} mode="popLayout"> */}
                    {list?.map((v: any, k: number) => (
                        <Notify
                            key={v?.id || k}
                            direction={align}
                            // as={motion.div}
                            // initial={{ y: "15%", opacity: 0 }}
                            // animate={{ y: "0", opacity: 1 }}
                            // exit={{ x: "15%", opacity: 0 }}
                            // transition={{ ease: "easeInOut", duration: 0.3 }}
                            // layout
                            {...{ ...v, swipe, type: "toast" }}
                        />
                    ))}
                    {/* </AnimatePresence> */}
                </Layouts.Contents.InnerContent>
            </Style>
        )
    );
}
