"use client";
import Image from "next/image";
import Style from "./State.styled";
import { Elements } from "components";

export interface State {
    img?: {
        width?: number;
        height?: number;
        src?: string;
        style?: object;
        alt?: string;
    };
    message?: any;
    style?: object;
}

export default function State(props: State) {
    const img = props?.img?.src && props?.img?.src !== "" ? require(props?.img?.src)?.default?.src : props?.img?.src;
    const width = props?.img?.width || 14;
    const height = props?.img?.height || 14;

    return (
        <Style $width={width} $height={height} style={props?.style}>
            {img && <Image src={img} width={0} height={0} alt={props?.img?.alt || ""} />}
            {props?.message && (typeof props?.message === "number" || typeof props?.message === "string") ? (
                <span>
                    <Elements.Text type={"p"} opacity={0.6}>
                        {props?.message}
                    </Elements.Text>
                </span>
            ) : (
                <span>{props?.message}</span>
            )}
        </Style>
    );
}
