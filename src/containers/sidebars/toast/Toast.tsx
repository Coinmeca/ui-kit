"use client";
import { useEffect } from "react";
import { Layouts } from "components";
import Style from "./Toast.styled";
import Notify from "../notification/Notify";
import { type Notify as Content } from "contexts/NotificationCenter";
import { AnimatePresence, motion } from "framer-motion";

export default function Toast({ list, width }: { list?: Content[]; width?: number }) {
    width = width || 60;

    useEffect(() => {
        console.log("side toast change");
    }, [list]);

    return (
        typeof list !== "undefined" &&
        list.length > 0 && (
            <Style>
                <Layouts.Contents.InnerContent>
                    {/* <AnimatePresence key={"notification"} mode="popLayout"> */}
                    {list &&
                        list?.length > 0 &&
                        list?.map((v: any, k: number) => (
                            <Notify
                                key={k}
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
