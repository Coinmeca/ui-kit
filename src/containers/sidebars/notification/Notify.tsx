"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controls, Layouts } from "components";
import { Text } from "components/elements";
import { type Notify } from "contexts/Notification";
import { useMobile, useNotification, useSwipe } from "hooks";
import { format } from "lib/utils";
import { Content, Style } from "./Notify.styled";

export default function Notify(props: Notify & { order?: number; direction: "left" | "right" }) {
    const { isMobile } = useMobile();
    const [direction, setDirection] = useState<"left" | "right">(props?.direction || "right");
    const swipe = useSwipe(
        isMobile && {
            onSwipe: (e: any, move: number) => {
                if (move !== 0) {
                    setDirection(() => (move > 0 ? "left" : "right"));
                    handleRemove();
                }
            },
        },
    );
    const { removeNotify, removeToast } = useNotification();

    const [active, setActive] = useState<boolean>(false);
    const [close, setClose] = useState<boolean>(false);

    const timer = props?.timer || 10000;

    useEffect(() => {
        setActive(true);
        if (props?.type === "toast")
            setTimeout(
                () => {
                    setClose(true);
                    removeToast(props?.id);
                },
                props?.importance ? timer * 2 : timer,
            );
    }, []);

    const handleRemove = () => {
        setClose(true);
        props?.type === "toast" ? removeToast(props?.id) : removeNotify(props?.id);
    };

    return (
        <Style {...swipe} $active={active} $direction={direction} $close={close} $order={props?.order}>
            <Layouts.Box>
                <Layouts.Col gap={1}>
                    <Layouts.Row gap={1} fix>
                        <Text title={props?.title} size={1.25} weight={"bold"} fix>
                            {props?.title}
                        </Text>
                        <Layouts.Row gap={1} style={{ minWidth: "max-content" }} fit fix>
                            <Text type={"desc"} align={"right"} weight={"bold"}>
                                {format(props?.date as number, "date")}
                            </Text>
                            <Controls.Button scale={0.75} icon={"x"} fit onClick={() => handleRemove()} />
                        </Layouts.Row>
                    </Layouts.Row>
                    {props?.img && <Image src={props?.img} width={0} height={0} alt={""} />}
                    {typeof props?.message === "string" ? (
                        <Content style={props?.style}>
                            <Text type={"p"}>{props?.message}</Text>
                        </Content>
                    ) : (
                        <Content style={props?.style}>{props?.message}</Content>
                    )}
                </Layouts.Col>
            </Layouts.Box>
        </Style>
    );
}
