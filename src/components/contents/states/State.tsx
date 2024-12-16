"use client";
import Image from "next/image";
import Style from "./State.styled";
import { Elements, Layouts } from "components";

export interface State {
    img?: {
        width?: number;
        height?: number;
        src?: any;
        style?: object;
        alt?: string;
    };
    message?: any;
    children?: any;
    style?: object;
}

export default function State(props: State) {
    const img =
        (typeof props?.img?.src === "string" && props?.img?.src !== "" ? props?.img?.src : props?.img?.src?.default?.src) || "";
    // const img = props?.img?.src && props?.img?.src === 'object' ? require(props?.img?.src) : props?.img?.src !== "" ? props?.img?.src : '';
    const width = props?.img?.width || 14;
    const height = props?.img?.height || 14;

    return (
        <Style $width={width} $height={height} style={props?.style}>
            <Layouts.Contents.InnerContent>
                {props?.img?.src && <Image src={img} width={0} height={0} alt={props?.img?.alt || ""} />}
                {props?.message && (typeof props?.message === "number" || typeof props?.message === "string") ? (
                    <span>
                        <Elements.Text type={"p"} opacity={0.6}>
                            {props?.message}
                        </Elements.Text>
                    </span>
                ) : (
                    <span>{props?.message}</span>
                )}
            </Layouts.Contents.InnerContent>
            {props?.children}
        </Style>
    );
}
