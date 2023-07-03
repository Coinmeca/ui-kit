"use client";
import { Controls, Elements } from "components";
import Style from "./Tab.styled";

export interface Tab {
    className?: string;
    style?: object;
    title?: string;

    active?: boolean;
    disabled?: any;

    iconLeft?: string;
    iconRight?: string;

    children?: any;
    onClick?: Function;
    scale?: number;
    fit?: boolean;
    device?: string;
}

export default function Tab(props: Tab) {
    const scale = props?.scale || 1;
    const fit = props?.fit || false;

    const onClick = (e: any) => {
        if (typeof props?.onClick === "function") props?.onClick(e);
    };

    return (
        <Style className={props?.className} style={props?.style} onClick={(e) => onClick(e)} title={props?.title} $scale={scale} $active={props?.active || false} $fit={fit} $disabled={props?.disabled}>
            <div>
                {props?.iconLeft && (
                    <>
                        <Elements.Icon icon={props?.iconLeft} />
                        <span>{props?.children}</span>
                    </>
                )}
                {(!props?.iconLeft || props?.iconLeft === "") && (!props?.iconRight || props?.iconRight === "") && <span>{props?.children}</span>}
                {props?.iconRight && (
                    <>
                        <span>{props?.children}</span>
                        <Elements.Icon icon={props?.iconRight} />
                    </>
                )}
            </div>
        </Style>
    );
}
