"use client";
import { Elements } from "components";
import { type Icon } from "components/elements/icon/Icon";

import Style from "./Button.styled";

export interface Button {
    style?: object;
    title?: string;
    type?: "glass" | "line" | "solid";
    color?: string;
    align?: "left" | "center" | "right";
    gap?: number;
    fit?: boolean;
    icon?: string | Icon;
    iconLeft?: string | Icon;
    iconRight?: string | Icon;
    onClick?: Function;
    onClickLonger?: Function;
    onBlur?: Function;
    scale?: number;
    hide?: boolean;
    disabled?: boolean;
    children?: any;
}

export default function Button(props: Button) {
    const title = props?.title || "";
    const type = props?.type;
    const color = props?.color || "black";
    const fit = props?.fit || false;
    const scale = props?.scale || 1;
    const hide = props?.hide || false;
    const disabled = props?.disabled || false;
    const align = props?.align;

    const Icons = (icon?: string | Icon) => {
        return typeof icon === "string" ? (
            <Elements.Icon icon={icon} scale={scale} />
        ) : typeof icon === "object" ? (
            <Elements.Icon {...icon} scale={scale} />
        ) : (
            <></>
        );
    };

    function handleClick(e?: any) {
        if (disabled) return;
        if (typeof props?.onClick === "function") props?.onClick(e);
    }

    function handleClickLonger(e?: any) {
        if (disabled) return;
        if (typeof props?.onClickLonger === "function") props?.onClickLonger(e);
    }

    const handleBlur = (e: any) => {
        if (props?.disabled) return;
        if (typeof props?.onBlur === "function") props?.onBlur(e);
    };

    return (
        <Style
            style={props?.style}
            title={title}
            $type={type}
            $align={align}
            $color={color}
            $scale={scale}
            $fit={fit}
            $hide={hide}
            onClick={(e: any) => handleClick(e)}
            onMouseDown={(e: any) => handleClickLonger(e)}
            onTouchStart={(e: any) => handleClickLonger(e)}
            onBlur={(e: any) => handleBlur(e)}
            $disabled={disabled}>
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
