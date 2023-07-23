"use client";
import { Controls, Elements, Layouts } from "components";
import { BottomSheet } from "containers";
import { Numberpads } from "parts";
import type { BottomSheet as Sheet } from "containers/bottomsheets/BottomSheet";
import type { CurrencyPad } from "parts/numberpads/currency/Currency";
import { useEffect, useState } from "react";

export interface ExchangePad extends CurrencyPad, Sheet {
    label?: string;
    placeholder?: number | string;
    sub?: { value?: number | string, unit?: string }
    unit?: string;
    padding?: number;
    onChange?: Function;
}

export default function ExchangePad(props: ExchangePad) {
    const width = 64;

    const min = (typeof props?.height === "object" && props?.height?.min) || 36;
    const max = (typeof props?.height === "object" && props?.height?.max) || "60vh";
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
                <Layouts.Row gap={2} style={{ alignItems: "center", padding: `${padding / 2}em ${padding / 1.5}em`, maxWidth: `${width}` }}>
                    {props?.sub && (
                        <>
                            <Elements.Text type={"p"} weight={"bold"} align={"right"}>
                                {props?.sub?.value}
                            </Elements.Text>
                            <Elements.Text type={"p"} weight={"bold"} opacity={0.6} style={{ maxWidth: "4em" }}>
                                {props?.sub?.unit}
                            </Elements.Text>
                        </>
                    )}
                </Layouts.Row>
                <Controls.Input
                    type={"currency"}
                    align={"right"}
                    placeholder={props?.placeholder}
                    value={value}
                    unit={props?.unit}
                    onChange={(e: any, v: string) => handleChange(e, v)}
                    left={{
                        children: (props?.label && (
                            <Elements.Text style={{ fontSize: "1.25em" }} weight={"bold"} opacity={0.6}>
                                {props?.label}
                            </Elements.Text>
                        )),
                    }}
                    inputMode={"none"}
                    style={{ fontSize: "1.125em", padding: `0.125em ${padding / 2}em` }}
                    autoFocus
                />
                <Numberpads.Currency
                    {...props}
                    type={"currency"}
                    width={width}
                    value={value}
                    button={{
                        ...props?.button,
                        ...{
                            onClick: (e: any, v: string) => {
                                if (typeof props?.button?.onClick === "function") props?.button?.onClick(e, v);
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
