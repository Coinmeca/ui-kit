import React, { memo, DetailedHTMLProps, VideoHTMLAttributes, useState, useEffect } from "react";
import Style from "./BG.styled";

export interface BG {
    background?: string;
    filter?: string;
    fix?: boolean;
    img?: {
        src: string;
        style?: any;
    };
    video?: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
}

export default function BG(props: BG) {
    const fix = props?.fix || false;
    return (
        <Style $fix={fix} $filter={props?.filter}>
            {props?.img?.src && <img src={props?.img?.src} style={props?.img?.style} />}
            {props?.video?.src && <video {...props?.video} />}
            {props?.filter && <div />}
        </Style>
    );
}
