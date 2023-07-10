"use client";
import { useEffect, useState } from "react";
import useToast from "hooks/useToast";
import type { Notify } from "hooks/useToast";
import { Controls, Layouts } from "components";
import { Text } from "components/elements";
import Image from "next/image";
import Style from "./Notify.styled";

export default function Notify(props: Notify) {
    const { RemoveNotify } = useToast();

    const timer = props?.timer || 3000;
    const active = props?.id ? true : false;

    useEffect(() => {
        const timeOut: any = setTimeout(
            () => {
                RemoveNotify(props?.id);
            },
            props?.importance ? timer * 2 : timer
        );
        timeOut;
    }, [active]);

    const onRemove = (id: string | number) => {
        RemoveNotify(id);
    };

    return (
        <Style $active={active}>
            <Layouts.Box>
                <Layouts.Col gap={1}>
                    <Layouts.Row only>
                        <Text type="strong">{props?.title}</Text>
                        <Layouts.Row only gap={1}>
                            <Text type="strong" align="right">
                                {/* "YYYY-MM-DD HH:mm:ss" */}
                                {props?.date?.toLocaleString()}
                            </Text>
                            <Controls.Button icon="x" fit onClick={() => onRemove(props?.id)} />
                        </Layouts.Row>
                    </Layouts.Row>
                    {props?.img && <Image src={props?.img} width={0} height={0} alt={""} />}
                    {props?.message && (
                        <span>
                            <Text type="p">{props?.message}</Text>
                        </span>
                    )}
                </Layouts.Col>
            </Layouts.Box>
        </Style>
    );
}
