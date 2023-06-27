"use client";
import { Icon } from "components/controls";
import { Style } from "./Button.styled";

export interface Button {
    className?: string;
    style?: any;
    title?: string;
    type?: "glass" | "line" | "solid";
    color?: string;
    fit?: boolean;
    icon?: string;
    iconLeft?: string;
    iconRight?: string;
    onClick?: Function;
    scale?: number;
    disabled?: boolean;
    children?: any;
}

export default function Button(props: Button) {
    const title = props?.title || "";
    const type = props?.type;
    const color = props?.color || "white";
    const fit = props?.fit || false;
    const scale = props?.scale || 1;
    const disabled = props?.disabled || false;

    const icon = (icon: string) => {
        return <Icon icon={icon} scale={scale} />;
    };

    function onClick(e?: any) {
        if (disabled) return;
        if (typeof props?.onClick === "function") props?.onClick(e);
    }

    return (
        <Style className={props?.className} style={props?.style} title={title} $type={type} $color={color} $scale={scale} $fit={fit} onClick={(e) => onClick(e)} $disabled={disabled}>
            {props?.icon && typeof props?.children === "undefined" ? (
                icon(props?.icon)
            ) : (
                <>
                    {props?.iconLeft && icon(props?.iconLeft)}
                    <span>{props?.children}</span>
                    {props?.iconRight && icon(props?.iconRight)}
                </>
            )}
        </Style>
    );
}
