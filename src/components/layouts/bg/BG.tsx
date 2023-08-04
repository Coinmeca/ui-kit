import Image from "next/image";
import React, { DetailedHTMLProps, VideoHTMLAttributes } from "react";
import Style, { Filter } from "./BG.styled";

export interface BG {
    background?: string;
    filter?:
<<<<<<< HEAD
        | string
        | {
              color?: string;
              opacity?: number;
          };
=======
    | string
    | {
        color?: string;
        opacity?: number;
    };
>>>>>>> 6a8cc061816c49a2296f13f71d7b41211c18eeeb
    fix?: boolean;
    img?: {
        src: number | string;
        style?: object;
    };
    video?: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
    children?: any;
}

export default function BG(props: BG) {
    const fix = props?.fix || false;
    const src = typeof props?.img?.src === "number" ? require(`../../../assets/pictures/${props?.img?.src}.jpg`) : props?.img?.src;
    const filter =
        (typeof props?.filter === "string" && props?.filter) ||
        (typeof props?.filter === "object" && typeof props?.filter?.color === "string" && props?.filter?.color) ||
        undefined;
    const opacity = (typeof props?.filter === "object" && typeof props?.filter?.opacity === "string" && props?.filter?.opacity) || 0.45;

    return (
        <Style $fix={fix} style={{ background: props?.background }}>
            {props?.img?.src && <Image src={src} style={props?.img?.style} fill alt={""} />}
            {props?.video?.src && <video {...props?.video} />}
            {props?.filter && <Filter $filter={filter} $opacity={opacity} />}
            {props?.children && <div>{props?.children}</div>}
        </Style>
    );
}
