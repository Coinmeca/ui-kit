"use client";
import React from "react";
import Style, { AddOn } from "./Card.styled";

export interface Card {
    children?: any;
    scale?: number;
    gap?: number;
    padding?: number;
    style?: any;
    addOn?:
        | React.ReactNode
        | {
              children: React.ReactNode;
              position?:
                  | number
                  | string
                  | {
                        top?: number | string;
                        left?: number | string;
                        right?: number | string;
                        bottom?: number | string;
                    };
              style?: any;
              fix?: boolean;
          };
    onHover?: Function;
    onClick?: Function;
}

export default function Card(props: Card) {
    const scale = props?.scale || 1;
    const padding = props?.padding || 2;
    const gap = props?.gap || 1;
    const position = props?.addOn && (props?.addOn as any)?.position;

    const handleMouseOver = (e?: any) => {
        if (typeof props?.onHover === "function") props?.onHover(e);
    };

    const handleClick = (e?: any) => {
        if (typeof props?.onClick === "function") props?.onClick(e);
    };

    const handleChildHover = (e: React.MouseEvent) => e.stopPropagation();

    return (
        <Style
            $scale={scale}
            $padding={padding}
            $gap={gap}
            $hover={typeof props?.onHover === "function" ? true : false}
            $event={typeof props?.onClick === "function" ? true : false}
            style={props?.style}>
            {props?.addOn && (
                <AddOn
                    $top={position?.top || position?.bottom ? undefined : 1}
                    $left={position?.left}
                    $right={position?.right || position?.left ? undefined : 1}
                    $bottom={position?.bottom}
                    $fix={(props?.addOn as any)?.fix || false}
                    style={(props?.addOn as any)?.style}
                    onMouseOver={handleChildHover}>
                    {(props?.addOn as any)?.children || props?.addOn}
                </AddOn>
            )}
            <div onMouseOver={handleMouseOver} onClick={handleClick}>
                {props?.children}
            </div>
        </Style>
    );
}
