"use client";
import { Frames, Layouts } from "components";
import { BottomSheet, BottomSheets, Modals } from "containers";
import Data from "./data";

export default function SamplesLayout(props: any) {
    const { header, sidebars } = Data();

    return (
        <>
            <Frames.Frame header={header} sidebar={sidebars} align={"right"} background={{ img: { src: 2 } }} side={56}>
                {props?.children}
            </Frames.Frame>
            <Layouts.Panel active={true} id="panel" style={{ zIndex: 100 }} fix>
                {/* <BottomSheet scale={1.25} /> */}
                {/* <BottomSheets.Numberpad scale={1.25} /> */}
                <BottomSheets.Numberpads.Exchange scale={1.25} />
            </Layouts.Panel>
            <Layouts.Panel active={false} color={"black"} style={{ zIndex: 200 }} fix>
                <Modals.Alert title={"Alert"} message={"This is a alert modal."} />
            </Layouts.Panel>
        </>
    );
}
