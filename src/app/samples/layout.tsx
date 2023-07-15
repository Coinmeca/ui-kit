"use client";
import { Frames } from "components";
import type { Frame } from "components/frames/Frame";
import Data from "./data";

export default function SamplesLayout(props: any) {
    const { header, sidebars } = Data();

    return (
        <Frames.Frame header={header} sidebar={sidebars} align={"right"} background={{ img: { src: 2 } }} side={56}>
            {props?.children}
        </Frames.Frame>
    );
}
