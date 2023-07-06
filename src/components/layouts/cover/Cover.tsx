import type { BG as Background } from "components/layouts/bg/BG";
import { BG } from "components/layouts";
import Style from "./Cover.styled";

export interface Cover {
    children?: any;
    background?: Background;
    height?: number;
    fullsize?: boolean;
}

export default function Cover(props: Cover) {
    const height = props?.height || 320;

    return (
        <Style $height={height} $fullsize={props?.fullsize}>
            {props?.background && <BG {...props?.background} />}
            {props?.children}
        </Style>
    );
}
