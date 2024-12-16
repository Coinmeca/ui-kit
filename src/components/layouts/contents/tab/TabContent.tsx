"use client";

import { memo } from "react";
import Style from "./TabContent.styled";

export interface TabContent {
    name?: string;
    active?: boolean;
    children?: any;
    style?: object;
    fix?: boolean;
}

function TabContent(props: TabContent) {
    const active = props?.active || false;
    const fix = props?.fix || false;

    return (
        <Style $active={active} $fix={fix} style={props?.style}>
            {props?.children}
        </Style>
    );
}

export default memo(TabContent);
