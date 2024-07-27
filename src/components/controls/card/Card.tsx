"use client";
import Style from "./Card.styled";

export interface Card {
    children?: any;
    scale?: number;
    gap?: number;
    padding?: number;
    style?: any;
    onHover?: Function;
    onClick?: Function;
}

export default function Card(props: Card) {
    const scale = props?.scale || 1;
    const padding = props?.padding || 2;
    const gap = props?.gap || 1;

    const handleMouseOver = (e?: any) => {
        if (typeof props?.onHover === "function") props?.onHover(e);
    };

    const handleClick = (e?: any) => {
        if (typeof props?.onClick === "function") props?.onClick(e);
    };

    return (
        <Style
            $scale={scale}
            $padding={padding}
            $gap={gap}
            $hover={typeof props?.onHover === "function" ? true : false}
            $event={typeof props?.onClick === "function" ? true : false}
            style={props?.style}
            onMouseOver={handleMouseOver}
            onClick={handleClick}>
            <div>{props?.children}</div>
        </Style>
    );
}
