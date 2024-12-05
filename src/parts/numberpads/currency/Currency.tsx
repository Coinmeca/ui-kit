"use client";
import { useCallback, useEffect, useRef } from "react";
import { Controls } from "components";
import type { Button } from "components/controls/button/Button";
import { format, parseNumber } from "lib/utils";
import { Numberpad } from "parts";
import type { Numberpad as Pad } from "parts/numberpads/Numberpad";

export interface CurrencyPad extends Pad {
    step?: number;
    button?: Button;
    max?: string | number;
}

export default function Currency(props: CurrencyPad) {
    const step = props?.step || 1;
    const max = parseNumber(props?.max);
    const ref = useRef(props?.value?.toString() || "");

    const handleClick = useCallback(
        (e: any) => {
            if (typeof props?.button?.onClick === "function") props?.button?.onClick(e, ref.current);
        },
        [ref],
    );

    const handleChange = (e: any, v: string | number) => {
        const value = ref.current;
        let input: number | string = "";
        if (v === "+") {
            const number: number = value === "" ? 0 : parseFloat(format(value, "number").toString());
            input = number + step;
        } else if (v === "-") {
            const number: number = value === "" ? 0 : parseFloat(format(value, "number").toString());
            input = number - step;
            if (input <= 0) input = "0";
        } else input = v;
        if (v === ".") {
            input = value === "" ? "0." : value + ".";
        }

        v = parseNumber(v);
        if (!isNaN(max) && max > 0 && !isNaN(v) && v > 0 && v >= max) input = max;
        if (typeof props?.onChange === "function") props?.onChange(e, input);
    };

    useEffect(() => {
        ref.current = props?.value?.toString() || "";
        handleChange(null, ref.current);
    }, [props?.value]);

    useEffect(() => {
        if (props?.input) {
            const ref = props?.input === true ? window : props?.input?.current;
            const input = (e: any) => {
                if (e.key === "." || e.key === "+" || e.key === "-" || e.code === "NumpadAdd" || e.code === "NumpadSubtract")
                    handleChange(e, e.code === "NumpadAdd" ? "+" : e.code === "NumpadSubtract" ? "-" : e.key);
            };
            ref.addEventListener("keydown", input);
            return () => ref.removeEventListener("keydown", input);
        }
    }, [props?.input]);

    return (
        <Numberpad
            {...props}
            value={props?.value}
            onChange={(e: any, v: string) => handleChange(e, v)}
            right={{
                children: (
                    <>
                        <Controls.Button onClick={(e: any) => handleChange(e, "+")} icon={"plus-small-bold"} scale={0.875} />
                        <Controls.Button onClick={(e: any) => handleChange(e, "-")} icon={"minus-small-bold"} scale={0.875} />
                        <Controls.Button onClick={(e: any) => handleChange(e, ".")} icon={"dot"} scale={0.875} />
                        <Controls.Button
                            {...props?.button}
                            onClick={(e: any) => handleClick(e)}
                            color={props?.button?.color}
                            style={{
                                ...props?.button?.style,
                                ...(props?.reverse && { order: -1 }),
                            }}>
                            {props?.button?.children || "OK"}
                        </Controls.Button>
                    </>
                ),
            }}
        />
    );
}
