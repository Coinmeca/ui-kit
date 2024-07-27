"use client";

import Style from "./Blind.styled";
import BG from "components/layouts/bg/BG";
import type { BG as Background } from "components/layouts/bg/BG";

export interface Blind {
    children: any;
    background: Background;
}

export default function Blind(props: any) {
    return (
        <Style>
            {props?.background && <BG {...props?.background} />}
            {props?.children}
        </Style>
    );
}
