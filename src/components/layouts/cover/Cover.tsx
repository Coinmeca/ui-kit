import { type CSSProperties } from "react";
import { BG } from "components/layouts";
import { type BG as Background } from "components/layouts/bg/BG";
import Style from "./Cover.styled";

export interface Cover {
    children?: any;
    height?: number;
    style?: CSSProperties;
    fullsize?: boolean;
    background?: Background;
    ref?: any;
}

export default function Cover(props: Cover) {
    const height = props?.height || 32;

    return (
        <Style ref={props?.ref} style={props?.style} $height={height} $fullsize={props?.fullsize}>
            {props?.background && <BG {...props?.background} />}
            {props?.children}
        </Style>
    );
}
