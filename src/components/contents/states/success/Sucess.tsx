"use client";
import Image from "next/image";
import Style from "../State.styled";
import type { State } from "../State";
import { Elements } from "components";

export default function Success(props: State) {
    const img =
        // (props?.img?.src && props?.img?.src !== "" ? require(props?.img?.src)?.default?.src : props?.img?.src) ||
        require("/src/assets/icons/animation/icon_success.gif");
    const width = props?.img?.width || 14;
    const height = props?.img?.height || 14;

    return (
        <Style $width={width} $height={height} style={props?.style}>
            {img && <Image src={img} width={0} height={0} alt={props?.img?.alt || "Success"} />}
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
