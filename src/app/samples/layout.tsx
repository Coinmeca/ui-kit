"use client";
import { Frames } from "components";
import type { Frame } from "components/frames/Frame";
import Data from "./data";

export interface Sample {
    frames?: Frame;
    children?: any;
}

export default function Layout(props: Sample) {
    const { header, sidebars } = Data();

    return (
        <Frames.Frame header={header} sidebar={sidebars} align={"right"} background={{ img: { src: 2 } }} side={56}>
            {props?.children}
        </Frames.Frame>
    );
}
