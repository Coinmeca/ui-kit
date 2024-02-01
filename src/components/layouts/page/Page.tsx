"use client";
import { useState, CSSProperties } from "react";
import { ScrollPosition } from "contexts";
import { Layouts } from "components";
import Style from "./Page.styled";

export interface Content {
    children?: any;
    scroll?: boolean;
    style?: CSSProperties;
    active?: boolean;
    fallback?: any;
}

export default function Page(props: Content) {
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const scroll = typeof props?.scroll === "boolean" ? props?.scroll : true;

    const handleScroll = (e?: any) => {
        if (scroll) setScrollPosition(e?.target?.scrollTop);
    };

    return (
        <>
            {props?.fallback && <Layouts.Panel style={{ position: "absolute" }}>{props?.fallback}</Layouts.Panel>}
            <Style $scroll={scroll} $active={props?.active} style={props?.style} onScroll={handleScroll}>
                {scroll ? <ScrollPosition target={scrollPosition}>{props?.children}</ScrollPosition> : props?.children}
            </Style>
        </>
    );
}
