"use client";
import { Containers, Frames, Layouts } from "components";
import Data from "./data";

export default function SamplesLayout(props: any) {
    const { header, sidebars } = Data();

    return (
        <>
            <Frames.Frame header={header} sidebar={sidebars} align={"right"} background={{ img: { src: 2 } }} side={56}>
                {props?.children}
            </Frames.Frame>
            <Layouts.Panel active={false} color={"black"} style={{ zIndex: 100 }} fix>
                <Containers.Modals.Alert title={"Alert"} message={"This is a alert modal."} />
            </Layouts.Panel>
        </>
    );
}
