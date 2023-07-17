"use client";
import { BottomSheet, BottomSheets } from "containers";
import { Numberpad as NumberPad } from "parts";
import type { BottomSheet as Sheet } from "../BottomSheet";
import type { Numberpad as Pad } from "parts/numberpad/Default";

export interface Numberpad extends Pad, Sheet {
    padding?: number;
}

export default function Numberpad(props: Numberpad) {
    const min = (typeof props?.height === "object" && props?.height?.min) || 40;
    const max = (typeof props?.height === "object" && props?.height?.max) || 64;
    const height = { min: (typeof props?.height === "object" ? props?.height?.min : props?.height) || min, max: (typeof props?.height === "object" ? props?.height?.min : props?.height) || max };

    return (
        <BottomSheet active={props?.active} height={height}>
            <NumberPad.Default {...props} />
        </BottomSheet>
    );
}
