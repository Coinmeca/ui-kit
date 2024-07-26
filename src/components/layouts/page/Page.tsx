"use client";
import { Layouts } from "components";
import { MutableRefObject } from "react";
import Style from "./Page.styled";

export interface Content {
    children?: any;
    style?: object;
    scroll?: boolean;
    snap?: boolean;
    active?: boolean;
    fallback?: any;
    reference?: MutableRefObject<any>;
}

export default function Page(props: Content) {
    const scroll = typeof props?.scroll === "boolean" ? props?.scroll : true;
    const snap = typeof props?.snap === "boolean" ? props?.snap : false;

    return (
        <>
            {props?.fallback && <Layouts.Panel style={{ position: "absolute" }}>{props?.fallback}</Layouts.Panel>}
            <Style ref={props?.reference} $scroll={scroll} $snap={snap} $active={props?.active} style={props?.style}>
                {props?.children}
            </Style>
        </>
    );
}
