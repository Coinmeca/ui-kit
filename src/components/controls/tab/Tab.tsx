"use client";
import { type CSSProperties } from "react";
import { Elements } from "components";
import type { Icon } from "components/elements/icon/Icon";
import Style from "./Tab.styled";

export interface Tab {
    style?: object;
    title?: string;

    active?: boolean;
    disabled?: any;

    iconLeft?: Icon | string;
    iconRight?: Icon | string;

    children?: any;
    onClick?: Function;
    onBlur?: Function;
    scale?: number;
    toggle?: boolean;
    fit?: boolean;

    show?: "desktop" | "laptop" | "tablet" | "mobile";
    hide?: "desktop" | "laptop" | "tablet" | "mobile";
}

export default function Tab(props: Tab) {
    const scale = props?.scale || 1;
    const fit = props?.fit || false;

    const Icons = (icon?: string | Icon) => {
        return typeof icon === "object" ? (
            <Elements.Icon {...icon} scale={scale} />
        ) : typeof icon === "string" ? (
            <Elements.Icon icon={icon} scale={scale} />
        ) : (
            <></>
        );
    };

    const handleClick = (e: any) => {
        if (props?.disabled) return;
        if (typeof props?.onClick === "function") props?.onClick(e);
    };

    const handleBlur = (e: any) => {
        if (props?.disabled) return;
        if (typeof props?.onBlur === "function") props?.onBlur(e);
    };

    return (
        <Style
            tabIndex={1}
            style={props?.style}
            onClick={(e: any) => handleClick(e)}
            onBlur={(e: any) => handleBlur(e)}
            title={props?.title}
            $scale={scale}
            $toggle={props?.toggle || false}
            $active={props?.active || false}
            $padding={props?.children && true}
            $fit={fit}
            $disabled={props?.disabled}
            data-show={props?.show}
            data-hide={props?.hide}
        >
            <div>
                {props?.iconLeft && (
                    <>
                        {Icons(props?.iconLeft)}
                        {props?.children && <span>{props?.children}</span>}
                    </>
                )}
                {(!props?.iconLeft || props?.iconLeft === "") && (!props?.iconRight || props?.iconRight === "") && <span>{props?.children}</span>}
                {props?.iconRight && (
                    <>
                        {props?.children && <span>{props?.children}</span>}
                        {Icons(props?.iconRight)}
                    </>
                )}
            </div>
        </Style>
    );
}
