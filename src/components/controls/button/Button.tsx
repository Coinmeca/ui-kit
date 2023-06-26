"use client";
import { Icon } from "components/controls";
import { Style } from "./Button.styled";

export interface Props {
    children?: any;
    title?: string;
    type?: "glass" | "line" | "solid";
    color?: string;
    fit?: boolean;
    icon?: string;
    iconLeft?: string;
    iconRight?: string;
    click?: Function;
    scale?: number;
    disable?: boolean;
}

export default function Button(props: Props) {
    const title = props?.title || "";
    const type = props?.type;
    const color = props?.color || "white";
    const fit = props?.fit || false;
    const scale = props?.scale || 1;
    const disable = props?.disable || false;

    const icon = (icon: string) => {
        return <Icon icon={icon} scale={scale} />;
    };

    function click(e?: any) {
        if (disable) return;
        if (typeof props?.click === "function") props?.click(e);
    }

    return (
        <Style title={title} $type={type} $color={color} $scale={scale} $fit={fit} onClick={(e) => click(e)} $disable={disable}>
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
