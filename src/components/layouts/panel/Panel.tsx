"use client";
import Style from "./Panel.styled";

export interface Panel {
    id?: string;
    active?: boolean;
    children?: any;
    onClick?: Function;
    style?: object;
    color?: string;
    fix?: boolean;
}

export default function Panel(props: Panel) {
    const active = typeof props?.active !== "undefined" ? props?.active : true;

    const handleClick = (e: any) => {
        if (typeof props?.onClick === "function") props?.onClick(e);
    };

    return (
        <Style id={props?.id} $active={active} $color={props?.color} $fix={props?.fix} style={props?.style} onClick={(e: any) => handleClick(e)}>
            {props?.children}
        </Style>
    );
}
