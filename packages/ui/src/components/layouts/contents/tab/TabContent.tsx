import { memo } from "react";
import Style from "./TabContent.styled";

export interface TabContent {
    name?: string;
    active?: boolean;
    children?: any;
    style?: object;
}

function TabContent(props: TabContent) {
    const active = props?.active || false;

    return (
        <Style $active={active} style={props?.style}>
            {props?.children}
        </Style>
    );
}

export default memo(TabContent);
