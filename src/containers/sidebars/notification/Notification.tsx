"use client";
import Notify from "./Notify";
import Style from "./Notification.styled";
import { Layouts } from "components";
import { type Notify as Content } from "contexts/NotificationCenter";

export default function Notification({ list }: { list?: Content[] }) {
    return (
        <Style>
            <Layouts.Contents.InnerContent style={{ flexDirection: "column-reverse" }}>
                {/* <AnimatePresence key={"notification"} mode="popLayout"> */}
                {list &&
                    list?.length > 0 &&
                    list?.map((v: any, k: number) => (
                        <Notify
                            key={v?.id || k}
                            // as={motion.div}
                            // initial={{ y: -300, opacity: 0 }}
                            // animate={{ y: 0, opacity: 1 }}
                            // exit={{ x: 300, opacity: 0 }}
                            // transition={{ ease: "easeInOut", duration: 0.3 }}
                            // layout
                            {...{ ...v, type: "noti" }}
                        />
                    ))}
                {/* </AnimatePresence> */}
            </Layouts.Contents.InnerContent>
        </Style>
    );
}
