import { Controls } from "components";
import { Format } from "lib/utils";
import { Numberpad } from "parts";
import type { Numberpad as Pad } from "parts/numberpads/Numberpad";
import { useEffect, useState } from "react";

export interface ExchangePad extends Pad {
    step?: number;
    onExecute?: Function;
}

export default function Exchange(props: ExchangePad) {
    const step = props?.step || 1;
    const [value, setValue] = useState(props?.value || "");

    useEffect(() => {
        if (props?.value) setValue(props?.value?.toString() || "");
    }, [props?.value]);

    const onExecute = (e: any) => {
        if (typeof props?.onExecute === "function") props?.onExecute(e, value);
    };

    const onChange = (e: any, v: string) => {
        let input: number | string = "";
        if (v === "plus") {
            console.log(v);
            console.log(value);
            const number: number = parseFloat(Format(value, "number").toString());
            input = number + step;
        } else if (v === "minus") {
            const number: number = parseFloat(Format(value, "number").toString());
            input = number - step;
            if (input <= 0) input = "0";
        } else input = v;
        if (v === ".") input = value + ".";
        if (typeof props?.onChange === "function") props?.onChange(e, input);
        setValue(input);
    };

    return (
        <Numberpad
            {...props}
            value={value}
            onChange={(e: any, v: string) => onChange(e, v)}
            right={{
                children: (
                    <>
                        <Controls.Button onClick={(e: any) => onChange(e, "plus")} icon={"plus"} />
                        <Controls.Button onClick={(e: any) => onChange(e, "minus")} />
                        <Controls.Button onClick={(e: any) => onChange(e, ".")}>•</Controls.Button>
                        <Controls.Button onClick={(e: any) => onExecute(e)} style={{ ...(props?.reverse && { order: -1 }) }}>
                            GO
                        </Controls.Button>
                    </>
                ),
            }}
        />
    );
}
