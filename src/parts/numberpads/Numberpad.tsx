"use client";
import { Controls, Layouts } from "components";
import { useEffect, useState } from "react";
import Style, { Pad } from "./Numberpad.styled";

export interface Numberpad {
    value?: number | string;
    scale?: number;
    padding?: number;
    left?: Option;
    right?: Option;
    reverse?: boolean;
    width?: number;
    onChange?: Function;
}

interface Option {
    flex?: number;
    children?: any;
}

export default function Numberpad(props: Numberpad) {
    const [value, setValue] = useState(props?.value?.toString() || "");

    const scale = props?.scale || 1;
    const padding = props?.padding || 2;

    useEffect(() => {
        if (props?.value) setValue(props?.value?.toString() || "");
    }, [props?.value]);

    const onChange = (e: any, v: string) => {
        let input: string = "";
        if (v === "sub") input = value?.length - 1 > 0 ? value?.substring(0, value?.length - 1) : "0";
        else if (v === "reset") input = "0";
        else input = value + v;
        if (typeof props?.onChange === "function") props?.onChange(e, input);
        setValue(input);
    };

    return (
        <Style $scale={scale} $width={props?.width} $padding={padding} $reverse={props?.reverse}>
            <div>
                {props?.left?.children && (
                    <Layouts.Col gap={0} style={{ ...(typeof props?.left?.flex === "number" && { flex: props?.left?.flex || 1 }) }}>
                        {props?.left?.children}
                    </Layouts.Col>
                )}
                <Pad>
                    <Layouts.Row gap={0} fix>
                        <Controls.Button onClick={(e: any) => onChange(e, "1")}>1</Controls.Button>
                        <Controls.Button onClick={(e: any) => onChange(e, "2")}>2</Controls.Button>
                        <Controls.Button onClick={(e: any) => onChange(e, "3")}>3</Controls.Button>
                    </Layouts.Row>
                    <Layouts.Row gap={0} fix>
                        <Controls.Button onClick={(e: any) => onChange(e, "4")}>4</Controls.Button>
                        <Controls.Button onClick={(e: any) => onChange(e, "5")}>5</Controls.Button>
                        <Controls.Button onClick={(e: any) => onChange(e, "6")}>6</Controls.Button>
                    </Layouts.Row>
                    <Layouts.Row gap={0} fix>
                        <Controls.Button onClick={(e: any) => onChange(e, "7")}>7</Controls.Button>
                        <Controls.Button onClick={(e: any) => onChange(e, "8")}>8</Controls.Button>
                        <Controls.Button onClick={(e: any) => onChange(e, "9")}>9</Controls.Button>
                    </Layouts.Row>
                    <Layouts.Row gap={0} style={{ ...(props?.reverse && { order: -1 }) }} fix>
                        <Controls.Button onClick={(e: any) => onChange(e, "reset")} icon={"reset"} />
                        <Controls.Button onClick={(e: any) => onChange(e, "0")}>0</Controls.Button>
                        <Controls.Button onClick={(e: any) => onChange(e, "sub")} icon={"chevron-left-bold"} />
                    </Layouts.Row>
                </Pad>
                {props?.right?.children && (
                    <Layouts.Col gap={0} style={{ ...(typeof props?.left?.flex === "number" && { flex: props?.left?.flex || 1 }) }}>
                        {props?.right?.children}
                    </Layouts.Col>
                )}
            </div>
        </Style>
    );
}