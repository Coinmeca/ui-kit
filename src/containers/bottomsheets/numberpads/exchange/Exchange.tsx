"use client";
import { Controls, Elements, Layouts } from "components";
import { BottomSheet } from "containers";
import { Numberpads } from "parts";
import type { BottomSheet as Sheet } from "containers/bottomsheets/BottomSheet";
import type { Numberpad as Pad } from "parts/numberpads/Numberpad";

export interface Exchange extends Pad, Sheet {
    padding?: number;
}

export default function Exchange(props: Exchange) {
    const min = (typeof props?.height === "object" && props?.height?.min) || 40;
    const max = (typeof props?.height === "object" && props?.height?.max) || 64;
    const height = { min: (typeof props?.height === "object" ? props?.height?.min : props?.height) || min, max: (typeof props?.height === "object" ? props?.height?.min : props?.height) || max };
    const padding = props?.padding || 2;

    return (
        <BottomSheet active={props?.active} height={height}>
            <Layouts.Col gap={0}>
                <Layouts.Row gap={1} style={{ alignItems: "center", padding: `${padding / 2}em ${padding}em` }}>
                    <Elements.Text type={"desc"} weight={"bold"} align={"right"}>
                        = 1.9234234
                    </Elements.Text>
                    <Elements.Text type={"desc"} weight={"bold"} style={{ maxWidth: "4em" }}>
                        ETH
                    </Elements.Text>
                </Layouts.Row>
                <div>
                    <Controls.Input style={{ padding: `${padding / 8}em ${padding * 1.5}em` }} unit={"ETH"} />
                </div>
                <Numberpads.Exchange {...props} padding={padding} />
            </Layouts.Col>
        </BottomSheet>
    );
}
