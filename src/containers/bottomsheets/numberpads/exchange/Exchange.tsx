"use client";
import { Controls, Elements, Layouts } from "components";
import { BottomSheet } from "containers";
import { Numberpads } from "parts";
import type { BottomSheet as Sheet } from "containers/bottomsheets/BottomSheet";
import type { ExchangePad } from "parts/numberpads/exchange/Exchange";
import { useEffect, useState } from "react";

export interface Exchange extends ExchangePad, Sheet {
    label?: string;
    placeholder?: string;
    padding?: number;
    onChange?: Function;
}

export default function Exchange(props: Exchange) {
    const width = 64;

    const min = (typeof props?.height === "object" && props?.height?.min) || 36;
    const max = (typeof props?.height === "object" && props?.height?.max) || 64;
    const height = { min: (typeof props?.height === "object" ? props?.height?.min : props?.height) || min, max: (typeof props?.height === "object" ? props?.height?.min : props?.height) || max };

    const padding = props?.padding || 2;

    const [value, setValue] = useState(props?.value || "");

    useEffect(() => {
        if (props?.value) setValue(props?.value?.toString() || "");
    }, [props?.value]);

    const handleChange = (e: any, v: string) => {
        if (typeof props?.onChange === "function") props?.onChange(e, v);
        setValue(v);
    };

    return (
        <BottomSheet {...props} height={height}>
            <Layouts.Col gap={0} align="center">
                <Layouts.Row gap={1} style={{ alignItems: "center", padding: `${padding / 2}em` }}>
                    <Elements.Text type={"desc"} weight={"bold"} align={"right"}>
                        = 1.9234234
                    </Elements.Text>
                    <Elements.Text type={"desc"} weight={"bold"} style={{ maxWidth: "4em" }}>
                        ETH
                    </Elements.Text>
                </Layouts.Row>
                <Controls.Input
                    value={value}
                    onChange={(e: any, v: string) => handleChange(e, v)}
                    placeholder={props?.placeholder}
                    type={"currency"}
                    align={"right"}
                    left={{ children: <span>Price</span> }}
                    style={{ padding: `${padding / 8}em ${padding}em` }}
                    unit={"ETH"}
                    inputMode={"none"}
                />
                <Numberpads.Exchange
                    {...props}
                    width={width}
                    value={value}
                    button={{
                        ...props?.button,
                        ...{
                            onClick: (e: any, v: string) => {
                                if (typeof props?.button?.onClick === "function") props?.button?.onClick(e, v);
                                props?.onClose();
                            },
                        },
                    }}
                    onChange={(e: any, v: string) => handleChange(e, v)}
                    padding={padding}
                    reverse={false}
                />
            </Layouts.Col>
        </BottomSheet>
    );
}
