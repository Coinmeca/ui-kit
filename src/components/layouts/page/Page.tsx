"use client";
import { useRef } from "react";
import { ScrollPosition } from "contexts";
import Style from "./Page.styled";

export interface Content {
    children?: any;
    style?: object;
    active?: boolean;
}

export default function Page(props: Content) {
    const ref = useRef(null);

    return (
        <Style ref={ref} $active={props?.active} style={props?.style}>
            <ScrollPosition ref={ref}>{props?.children}</ScrollPosition>
        </Style>
    );
}
