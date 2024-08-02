"use client";

import { memo } from "react";
import Style from "./SlideContent.styled";
import { SwipeProps } from "hooks/useSwipe";

export interface SlideContent {
    name?: string;
    active?: boolean;
    children?: any;
    vertical?: boolean;
    offset?: number;
    unit?: "%" | "vw" | "vh" | "em" | "rem";
    style?: object;
    swipe?: SwipeProps;
}

function SlideContent(props: SlideContent) {
    const active = props?.active || false;
    const vertical = props?.vertical || false;
    const offset = typeof props?.offset === "number" ? props?.offset : 15;
    const unit = typeof props?.unit === "string" ? props?.unit : "%";

    return (
        <Style {...props?.swipe} $vertical={vertical} $offset={offset} $unit={unit} style={props?.style} data-active={active}>
            {props?.children}
        </Style>
    );
}

export default memo(SlideContent);
