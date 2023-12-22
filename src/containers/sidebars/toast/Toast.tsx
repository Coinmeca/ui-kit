"use client";
import { memo, useEffect, useState } from "react";
import { Layouts } from "components";
import Style from "./Toast.styled";
import Notify from "../notification/Notify";
import { type Notify as Content } from "contexts/NotificationCenter";
import { AnimatePresence, motion } from "framer-motion";

export interface Toast {
    list?: Content[];
    active?: boolean;
    width?: number;
    align?: "left" | "right";
}

export default function Toast({ list, active, width, align }: Toast) {
    width = width || 60;
    align = align === "left" || align === "right" ? align : "left";

    return (
        active &&
        typeof list !== "undefined" &&
        list.length > 0 && (
            <Style $width={width} $align={align} data-active={typeof list !== "undefined" ? true : false}>
                <Layouts.Contents.InnerContent style={{ flexDirection: "column-reverse" }}>
                    {/* <AnimatePresence key={"notification"} mode="popLayout"> */}
                    {list &&
                        list?.length > 0 &&
                        list?.map((v: any, k: number) => (
                            <Notify
                                key={v?.id || k}
                                // as={motion.div}
                                // initial={{ y: "15%", opacity: 0 }}
                                // animate={{ y: "0", opacity: 1 }}
                                // exit={{ x: "15%", opacity: 0 }}
                                // transition={{ ease: "easeInOut", duration: 0.3 }}
                                // layout
                                {...{ ...v, type: "toast" }}
                            />
                        ))}
                    {/* </AnimatePresence> */}
                </Layouts.Contents.InnerContent>
            </Style>
        )
    );
}
