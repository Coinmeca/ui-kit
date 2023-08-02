"use client";
import { Frames } from "components";
import Dummy from "./dummy";

export default function ExamplesLayout(props: any) {
    const { header, sidebars } = Dummy();

    return (
        <Frames.Frame header={header} sidebar={sidebars} align={"right"} background={{ img: { src: 2 } }} side={56}>
            {props?.children}
        </Frames.Frame>
    );
}
