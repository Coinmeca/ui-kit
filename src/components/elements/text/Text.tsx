"use client";
import { motion } from "motion/react";
import * as Texts from "./Text.styled";
import { TextMotion } from "./TextMotion";

export type TextType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "strong" | "p" | "desc" | "link" | "button";
export type TextAlign = "left" | "center" | "right";
export type TextCase = "upper" | "lower" | "capital";

export interface Text {
    children?: any;
    title?: string;
    style?: object;
    type?: TextType;
    align?: TextAlign;
    case?: TextCase;
    size?: number;
    color?: string | false;
    change?: boolean;
    href?: string;
    target?: string;
    onClick?: Function;
    weight?: number | string;
    height?: number;
    opacity?: number | false;
    responsive?: Responsive;
    fit?: boolean;
    fix?: boolean;
    motion?: TextMotion;
}

export interface Responsive {
    style?: object;
    size?: number;
    color?: string | false;
    change?: boolean;
    weight?: number | string;
    height?: number;
    align?: TextAlign;
    opacity?: number | false;
    device: "desktop" | "laptop" | "tablet" | "mobile";
}

export default function Text(props: Text) {
    const type =
        props?.type === "button" || props?.type === "link"
            ? props?.type
            : props?.href
            ? "link"
            : props?.onClick
            ? "button"
            : props?.type;
    const size = props?.size || 1.5;
    const weight = props?.weight || "bold";
    const height = props?.height || 1.5;
    const color = props?.color || "white";
    const opacity = typeof props?.opacity === "number" && props?.opacity > 1 ? 1 : props?.opacity || 1;

    const textProps = {
        ...(props?.motion && {
            ...props?.motion,
            as: motion?.[type === "link" ? "a" : type === "desc" ? "span" : type || "span"],
        }),
        title: props?.title,
        style: props?.style,
        $color: color,
        $opacity: opacity,
        $weight: weight,
        $height: height,
        $change: props?.change,
        $align: props?.align,
        $case: props?.case,
        $fit: props?.fit,
        $fix: props?.fix,
    };

    switch (type) {
        case "h1":
            return <Texts.H1 {...textProps}>{props?.children}</Texts.H1>;
        case "h2":
            return <Texts.H2 {...textProps}>{props?.children}</Texts.H2>;
        case "h3":
            return <Texts.H3 {...textProps}>{props?.children}</Texts.H3>;
        case "h4":
            return <Texts.H4 {...textProps}>{props?.children}</Texts.H4>;
        case "h5":
            return <Texts.H5 {...textProps}>{props?.children}</Texts.H5>;
        case "h6":
            return <Texts.H6 {...textProps}>{props?.children}</Texts.H6>;
        case "strong":
            return <Texts.Strong {...textProps}>{props?.children}</Texts.Strong>;
        case "p":
            return (
                <Texts.P {...textProps} $weight={props?.weight || "normal"}>
                    {props?.children}
                </Texts.P>
            );
        case "desc":
            return (
                <Texts.Desc
                    {...textProps}
                    $weight={props?.weight || "normal"}
                    $opacity={(typeof props?.opacity === "number" && props?.opacity > 1 ? 1 : props?.opacity) || undefined}>
                    {props?.children}
                </Texts.Desc>
            );
        case "link":
            return (
                <Texts.Link
                    {...textProps}
                    href={props?.href}
                    target={!props?.target && !props?.target?.startsWith("/") ? "_blank" : props?.target}
                    onClick={(e: any) => typeof props?.onClick === "function" && props?.onClick(e)}
                    $size={size}
                    $responsive={props?.responsive}>
                    {props?.children}
                </Texts.Link>
            );
        case "button":
            return (
                <Texts.Button
                    {...textProps}
                    href={props?.href}
                    target={!props?.target && !props?.target?.startsWith("/") ? "_blank" : props?.target}
                    onClick={(e: any) => typeof props?.onClick === "function" && props?.onClick(e)}
                    $size={size}
                    $responsive={props?.responsive}>
                    {props?.children}
                </Texts.Button>
            );
        default:
            return (
                <Texts.Text {...textProps} $size={size} $responsive={props?.responsive}>
                    {props?.children}
                </Texts.Text>
            );
    }
}
