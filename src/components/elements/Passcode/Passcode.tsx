"use client";

import Style, { Dot } from "./Passcode.styled";

interface Passcode {
    index: number;
    length: number;
    scale?: number;
    width?: number | string;
    size?: number;
    color?: string;
    error?: boolean;
    gap?: number | string;
    stroke?: number | string;
    padding?: number;
    effect?: boolean;
    style?: object;
}

export default function Passcode(props: Passcode) {
    const scale = props?.scale || 1;
    const size = props?.scale || 1;
    const gap = props?.gap || 2;
    const index = props?.index;
    const length = props?.length;
    const color = props?.color || "black";
    const stroke = props?.stroke || "1px";
    const padding = props?.padding || 2;
    const effect = props?.effect || false;

    return (
        <Style
            $width={props?.width}
            $scale={scale}
            $gap={gap}
            $padding={padding}
            $color={color}
            $error={props?.error}
            style={props?.style}>
            {length &&
                [...Array(length)].map((_, i: number) => (
                    <Dot key={i} $active={index > i} $size={size} $stroke={stroke} $effect={effect}>
                        {effect && <div />}
                    </Dot>
                ))}
        </Style>
    );
}
