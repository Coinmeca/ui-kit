"use client";
import { Elements } from "components";
import type { Icon } from "components/elements/icon/Icon";
import Style from "./Button.styled";

export interface Button {
    style?: object;
    title?: string;
    type?: "glass" | "line" | "solid";
    color?: string;
    fit?: boolean;
    icon?: string | Icon;
    iconLeft?: string | Icon;
    iconRight?: string | Icon;
    onClick?: Function;
    onMouseDown?: Function;
    onBlur?: Function;
    scale?: number;
    hide?: boolean;
    disabled?: boolean;
    children?: any;
}

export default function Button(props: Button) {
    const title = props?.title || "";
    const type = props?.type;
    const color = props?.color || "white";
    const fit = props?.fit || false;
    const scale = props?.scale || 1;
    const hide = props?.hide || false;
    const disabled = props?.disabled || false;

    const Icons = (icon?: string | Icon) => {
        return typeof icon === "string" ? <Elements.Icon icon={icon} scale={scale} /> : typeof icon === "object" ? <Elements.Icon {...icon} scale={scale} /> : <></>;
    };

    function onClick(e?: any) {
        if (disabled) return;
        if (typeof props?.onClick === "function") props?.onClick(e);
    }

    function onMouseDown(e?: any) {
        if (disabled) return;
        if (typeof props?.onMouseDown === "function") props?.onMouseDown(e);
    }

    const onBlur = (e: any) => {
        if (props?.disabled) return;
        if (typeof props?.onBlur === "function") props?.onBlur(e);
    };

    return (
        <Style
            style={props?.style}
            title={title}
            $type={type}
            $color={color}
            $scale={scale}
            $fit={fit}
            $hide={hide}
            onClick={(e: any) => onClick(e)}
            onMouseDown={(e: any) => onMouseDown(e)}
            onBlur={(e: any) => onBlur(e)}
            $disabled={disabled}
        >
            <div>
                {props?.icon && typeof props?.children === "undefined" ? (
                    Icons(props?.icon)
                ) : (
                    <>
                        {Icons(props?.iconLeft)}
                        <span>{props?.children}</span>
                        {Icons(props?.iconRight)}
                    </>
                )}
            </div>
        </Style>
    );
}
