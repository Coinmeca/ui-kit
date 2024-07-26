import { memo } from "react";
import Style from "./SlideContent.styled";
import { SwipeProps } from "hooks/useSwipe";

export interface SlideContent {
    name?: string;
    active?: boolean;
    children?: any;
    style?: object;
    swipe?: SwipeProps;
}

function SlideContent(props: SlideContent) {
    const active = props?.active || false;

    return (
        <Style {...props?.swipe} style={props?.style} data-active={active}>
            {props?.children}
        </Style>
    );
}

export default memo(SlideContent);
