"use client";
import { Frames } from "components";
import Dummy from "./dummy";

export default function ExamplesLayout(props: any) {
    const { header, sidebars, toast } = Dummy();

    return (
        <Frames.Frame
            header={header}
            sidebar={sidebars}
            toast={toast}
            align={"right"}
            background={{ img: { src: 2 } }}
            side={56}>
            {props?.children}
        </Frames.Frame>
    );
}
