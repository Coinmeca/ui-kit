"use client";
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
    scale?: number;
    toggle?: boolean;
    fit?: boolean;
    device?: string;
}

export default function Tab(props: Tab) {
    const scale = props?.scale || 1;
    const fit = props?.fit || false;

    const Icons = (icon?: string | Icon) => {
        return typeof icon === "object" ? <Elements.Icon {...icon} scale={scale} /> : typeof icon === "string" ? <Elements.Icon icon={icon} scale={scale} /> : <></>;
    };

    const onClick = (e: any) => {
        if (props?.disabled) return;
        if (typeof props?.onClick === "function") props?.onClick(e);
    };

    return (
        <Style
            style={props?.style}
            onClick={(e: any) => onClick(e)}
            title={props?.title}
            $scale={scale}
            $toggle={props?.toggle || false}
            $active={props?.active || false}
            $padding={props?.children && true}
            $fit={fit}
            $disabled={props?.disabled}
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
