"use client";
import { useState } from "react";
import Style from "./BottomSheet.styled";

export interface BottomSheet {
    children?: any;
    scale?: number;
    active?: boolean;
    height?: number | { min?: number; max?: number };
    onBlur?: Function;
}

export default function BottomSheet(props: BottomSheet) {
    const scale = props?.scale || 1;
    const [active, setActive] = useState<boolean>(props?.active || false);

    const onBlur = (e: any) => {
        if (typeof props?.onBlur === "function") props?.onBlur(e);
        setActive(false);
    };

    return (
        <Style tabIndex={100} $scale={scale} $active={active} $height={props?.height} onBlur={(e: any) => onBlur(e)}>
            {props?.children}
        </Style>
    );
}
