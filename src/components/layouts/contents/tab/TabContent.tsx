import { memo } from "react";
import Style from "./TabContent.styled";

export interface TabContent {
    name?: string;
    active?: boolean;
    children?: any;
}

function TabContent(props: TabContent) {
    const active = props?.active || false;

    return <Style $active={active}>{props?.children}</Style>;
}

export default memo(TabContent);
