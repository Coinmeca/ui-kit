"use client";
import { useEffect, useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { BottomSheet } from "containers";
import type { BottomSheet as Sheet } from "containers/bottomsheets/BottomSheet";
import { parseNumber } from "lib/utils";
import { Numberpads } from "parts";
import type { CurrencyPad } from "parts/numberpads/currency/Currency";

export interface OrderPad extends CurrencyPad, Sheet {
    label?: string;
    placeholder?: number | string;
    sub?: { color?: string; value?: number | string; unit?: string };
    unit?: string;
    padding?: number;
    onChange?: Function;
    max?: string | number;
}

export default function OrderPad(props: OrderPad) {
    const width = 64;
    const height = {
        min: (typeof props?.height === "object" ? props?.height?.min : props?.height) || 36,
        max: (typeof props?.height === "object" ? props?.height?.min : props?.height) || "60vh",
    };
    const padding = props?.padding || 2;
    const [value, setValue] = useState(props?.value || "");
    const max = parseNumber(props?.max);

    const handleChange = (e: any, v: string) => {
        let value = parseNumber(v);
        if (!isNaN(max) && max > 0 && !isNaN(value) && value > 0 && value > max) value = max;
        if (typeof props?.onChange === "function") props?.onChange(e, value);
        setValue(value);
    };

    useEffect(() => {
        handleChange(null, props?.value?.toString() || "");
    }, [props?.value]);

    return (
        <BottomSheet {...props} height={height}>
            <Layouts.Col gap={0} align="center">
                <Layouts.Row
                    gap={2}
                    style={{
                        alignItems: "center",
                        padding: `${padding / 2}em ${padding / 1.5}em`,
                        maxWidth: `${width}`,
                    }}
                >
                    {props?.sub && (
                        <>
                            <Elements.Text type={"p"} color={props?.sub?.color} weight={"bold"} align={"right"}>
                                {props?.sub?.value}
                            </Elements.Text>
                            <Elements.Text type={"p"} color={props?.sub?.color} weight={"bold"} opacity={0.6} style={{ maxWidth: "4em" }}>
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
                    max={!isNaN(max) && max > 0 ? max : undefined}
                    onChange={(e: any, v: string) => handleChange(e, v)}
                    left={{
                        children: props?.label && (
                            <Elements.Text style={{ fontSize: "1.25em" }} weight={"bold"} opacity={0.6}>
                                {props?.label}
                            </Elements.Text>
                        ),
                    }}
                    inputMode={"none"}
                    style={{
                        fontSize: "1.125em",
                        padding: `0.125em ${padding / 2}em`,
                    }}
                    autoFocus
                />
                <Numberpads.Currency
                    {...props}
                    type={"currency"}
                    width={width}
                    value={value}
                    button={
                        props?.button
                        // onClick: props?.button?.onClick,
                    }
                    onChange={(e: any, v: string) => handleChange(e, v)}
                    padding={padding}
                    reverse={false}
                />
            </Layouts.Col>
        </BottomSheet>
    );
}
