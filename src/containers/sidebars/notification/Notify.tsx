"use client";
import { useContext, useEffect, useState } from "react";
import { Controls, Layouts } from "components";
import { Text } from "components/elements";
import Image from "next/image";
import Style from "./Notify.styled";
import { Notification, type Notify } from "contexts/NotificationCenter";

export default function Notify(props: Notify) {
    const { removeNotify, removeToast } = useContext(Notification);
    const [active, setActive] = useState<boolean>(false);
    const [close, setClose] = useState<boolean>(false);

    const timer = props?.timer || 5000;

    useEffect(() => {
        setActive(true);
        if (props?.type === "toast" && props?.remain) setTimeout(() => removeToast(props?.id), props?.importance ? timer * 2 : timer);
        return () => {
            setActive(false);
        };
    }, []);

    const handleRemove = () => {
        props?.type === "toast" ? removeToast(props?.id) : removeNotify(props?.id);
        setClose(true);
    };

    return (
        <Style $active={active} $close={close}>
            <Layouts.Box>
                <Layouts.Col gap={1}>
                    <Layouts.Row fix>
                        <Text size={1.25} weight={"bold"}>
                            {props?.title}
                        </Text>
                        <Layouts.Row fix gap={1} style={{ minWidth: "max-content" }}>
                            <Text type={"desc"} align={"right"} weight={"bold"}>
                                {/* "YYYY-MM-DD HH:mm:ss" */}
                                {/* {props?.date?.toLocaleString()} */}
                                {props?.id}
                            </Text>
                            <Controls.Button scale={0.75} icon={"x"} fit onClick={() => handleRemove()} />
                        </Layouts.Row>
                    </Layouts.Row>
                    {props?.img && <Image src={props?.img} width={0} height={0} alt={""} />}
                    {props?.message && (
                        <span>
                            <Text type={"p"}>{props?.message}</Text>
                        </span>
                    )}
                </Layouts.Col>
            </Layouts.Box>
        </Style>
    );
}
