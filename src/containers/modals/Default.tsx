"use client";
import { Controls, Elements, Layouts } from "components";
import useModal from "hooks/useModal";
import { useState } from "react";
import Style, { Close, ButtonArea } from "./Default.styled";

export interface Modal {
    active?: boolean;
    title?: string;
    message?: any;
    children?: any;
    content?: any;
    buttonArea: any;
    width?: number | { min?: number; max?: number };
    close?: boolean;
    onClose?: Function;
}

export default function Default(props: Modal) {
    const { setActive } = useModal();
    const [showModal, setShowModal] = useState<boolean>(props?.active || true);

    const min = 56;
    const max = 64;
    const width = { min: (typeof props?.width === "object" ? props?.width?.min : props?.width) || min, max: (typeof props?.width === "object" ? props?.width?.min : props?.width) || max };

    const onClose = (e: any) => {
        if (typeof props?.onClose === "function") props?.onClose(e);
        setShowModal(false);
        setActive(false);
    };

    return (
        <Style $active={showModal} $width={width}>
            <div>
                <Elements.Text scale={3} align={"center"}>
                    {props?.title}
                </Elements.Text>
                <Layouts.Contents.InnerContent scroll>
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
                {props?.buttonArea && <ButtonArea>{props?.buttonArea}</ButtonArea>}
                {props?.close && (
                    <Close>
                        <Controls.Button icon={"x"} onClick={(e: any) => onClose(e)} />
                    </Close>
                )}
            </div>
        </Style>
    );
}
