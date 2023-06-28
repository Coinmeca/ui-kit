"use client";
import { Controls } from "components";
import { Style } from "./Tab.styled";

export interface Props {
    className?: string;
    style?: object;
    title?: string;

    active?: boolean;
    disabled?: any;

    iconLeft?: string;
    iconRight?: string;

    children?: any;
    onClick?: Function;
    device?: string;
}

export default function Tab(props: Props) {
    const onClick = (e: any) => {
        if (typeof props?.onClick === "function") props?.onClick(e);
    };

    return (
        <Style className={props?.className} style={props?.style} onClick={(e) => onClick(e)} title={props?.title} $active={props?.active || false} $disabled={props?.disabled} draggable={false}>
            {props?.iconLeft && (
                <>
                    <Controls.Icon icon={props?.iconLeft} />
                    <span>{props?.children}</span>
                </>
            )}
            {(!props?.iconLeft || props?.iconLeft === "") && (!props?.iconRight || props?.iconRight === "") && props?.children}
            {props?.iconRight && (
                <>
                    <span>{props?.children}</span>
                    <Controls.Icon icon={props?.iconRight} />
                </>
            )}
        </Style>
    );
}
