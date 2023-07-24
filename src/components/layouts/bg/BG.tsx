import Image from "next/image";
import React, { DetailedHTMLProps, VideoHTMLAttributes } from "react";
import Style from "./BG.styled";

export interface BG {
    background?: string;
    filter?: string;
    fix?: boolean;
    img?: {
        src: number | string;
        style?: object;
    };
    video?: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
}

export default function BG(props: BG) {
    const fix = props?.fix || false;
    const src = typeof props?.img?.src === "number" ? require(`/src/assets/pictures/${props?.img?.src}.jpg`) : props?.img?.src;

    return (
        <Style $fix={fix} $filter={props?.filter}>
            {props?.img?.src && <Image src={src} style={props?.img?.style} fill alt={""} />}
            {props?.video?.src && <video {...props?.video} />}
            {props?.filter && <div style={{ background: props?.filter }} />}
        </Style>
    );
}
