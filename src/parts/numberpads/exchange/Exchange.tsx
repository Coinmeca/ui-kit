import { Controls } from "components";
import { Format } from "lib/utils";
import { Numberpad } from "parts";
import type { Numberpad as Pad } from "parts/numberpads/Numberpad";
import { useEffect, useState } from "react";

export interface ExchangePad extends Pad {
    step?: number;
    button?: {
        name?: string;
        onClick?: Function;
    };
}

export default function Exchange(props: ExchangePad) {
    const step = props?.step || 1;
    const [value, setValue] = useState(props?.value || "");

    useEffect(() => {
        if (props?.value) setValue(props?.value?.toString() || "");
    }, [props?.value]);

    const onClick = (e: any) => {
        if (typeof props?.button?.onClick === "function") props?.button?.onClick(e, value);
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
                        <Controls.Button onClick={(e: any) => onChange(e, "plus-bold")} icon={"plus-bold"} />
                        <Controls.Button onClick={(e: any) => onChange(e, "minus-bold")} icon={"minus-bold"} />
                        <Controls.Button onClick={(e: any) => onChange(e, ".")} icon={"dot"} />
                        <Controls.Button onClick={(e: any) => onClick(e)} style={{ ...(props?.reverse && { order: -1 }) }}>
                            {props?.button?.name || "OK"}
                        </Controls.Button>
                    </>
                ),
            }}
        />
    );
}
