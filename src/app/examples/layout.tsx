"use client";
import { Frames } from "components";
import type { Frame } from "components/frames/Frame";
import Dummy from "./dummy";

export interface Exchange {
    frames?: Frame;
    children?: any;
}

export default function Layout(props: Exchange) {
    const { header, sidebars } = Dummy();

    return (
        <Frames.Frame header={header} sidebar={sidebars} align={"right"} background={{ img: { src: 2 } }} side={56}>
            {props?.children}
        </Frames.Frame>
    );
}