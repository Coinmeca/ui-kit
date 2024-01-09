"use client";
import Notify from "./Notify";
import Style from "./Notification.styled";
import { Elements, Layouts } from "components";
import { type Notify as N } from "../../../contexts/Notification";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";

type Content = N & { type?: "toast" | "notify" | "divider" };

export default function Notification(props: { list?: Content[]; count?: number; onBlur?: Function }) {
    const count = props?.count || 0;
    const list = props?.list || [];
    const length = list?.length || 0;

    const handleBlur = (e: any) => {
        if (typeof props?.onBlur === "function") props?.onBlur(e);
    };

    return (
        <Style tabIndex={1} onBlur={handleBlur}>
            {/* <Layouts.Row gap={0.5} style={{ padding: "3em", paddingBottom: "1em", marginBottom: "-2em" }}>
                <Elements.Text opacity={count > 0 ? 1 : 0.6} fit>
                    {count ? count : "No"}
                </Elements.Text>
                <Elements.Text opacity={0.6} fit>
                    new notification{count > 1 && "s"}
                </Elements.Text>
            </Layouts.Row> */}
            <Layouts.Contents.InnerContent style={{ flexDirection: "column-reverse" }}>
                {/* <AnimatePresence key={"notification"} mode="popLayout"> */}
                {list?.length > 0 &&
                    list?.map((v: any, k: number) =>
                        v?.type === "divider" ? (
                            <Layouts.Divider key={k} />
                        ) : (
                            <Notify
                                key={v?.id || k}
                                order={k}
                                as={motion.div}
                                initial={{ y: -300, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ x: 300, opacity: 0 }}
                                transition={{ ease: "easeInOut", duration: 0.3 }}
                                layout
                                {...{ ...v, type: "notify" }}
                            />
                        )
                    )}
                {/* </AnimatePresence> */}
            </Layouts.Contents.InnerContent>
        </Style>
    );
}
