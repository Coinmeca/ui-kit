"use client";
import { Controls, Layouts } from "components";
import Style, { Pad } from "./Numberpad.styled";

export interface Numberpad {
    value?: number | string;
    scale?: number;
    type?: "code" | "number" | "currency";
    padding?: number;
    left?: Option;
    right?: Option;
    reverse?: boolean;
    width?: number;
    onChange?: Function;
    onReset?: Function;
    style?: object;
}

interface Option {
    flex?: number;
    children?: any;
}

export default function Numberpad(props: Numberpad) {
    const type = props?.type || "number";
    const scale = props?.scale || 1.5;
    const padding = props?.padding || 2;

    const handleChange = (e: any, v: string) => {
        const value = props?.value?.toString() || "";
        let input: string = "";
        if (v === "sub") input = value?.length - 1 > 0 ? value?.substring(0, value?.length - 1) : input = type === 'code' ? '' : '0';
        else if (v === "reset") {
            input = type === 'code' ? '' : '0';
            if (typeof props?.onReset === 'function') props?.onReset();
        }
        else input = type === "currency" && value === "0" && v === "0" ? "0" : type === "currency" && value === "0" && v !== "0" ? v : value + v;
        if (typeof props?.onChange === "function") props?.onChange(e, input);
    };

    return (
        <Style $scale={scale} $width={props?.width} $padding={padding} $reverse={props?.reverse} style={props?.style}>
            <div>
                {props?.left?.children && (
                    <Layouts.Col
                        gap={0}
                        style={{
                            ...(typeof props?.left?.flex === "number" && {
                                flex: props?.left?.flex || 1,
                            }),
                        }}
                    >
                        {props?.left?.children}
                    </Layouts.Col>
                )}
                <Pad>
                    <Layouts.Row gap={0} fix>
                        <Controls.Button onClick={(e: any) => handleChange(e, "1")}>1</Controls.Button>
                        <Controls.Button onClick={(e: any) => handleChange(e, "2")}>2</Controls.Button>
                        <Controls.Button onClick={(e: any) => handleChange(e, "3")}>3</Controls.Button>
                    </Layouts.Row>
                    <Layouts.Row gap={0} fix>
                        <Controls.Button onClick={(e: any) => handleChange(e, "4")}>4</Controls.Button>
                        <Controls.Button onClick={(e: any) => handleChange(e, "5")}>5</Controls.Button>
                        <Controls.Button onClick={(e: any) => handleChange(e, "6")}>6</Controls.Button>
                    </Layouts.Row>
                    <Layouts.Row gap={0} fix>
                        <Controls.Button onClick={(e: any) => handleChange(e, "7")}>7</Controls.Button>
                        <Controls.Button onClick={(e: any) => handleChange(e, "8")}>8</Controls.Button>
                        <Controls.Button onClick={(e: any) => handleChange(e, "9")}>9</Controls.Button>
                    </Layouts.Row>
                    <Layouts.Row gap={0} style={{ ...(props?.reverse && { order: -1 }) }} fix>
                        <Controls.Button onClick={(e: any) => handleChange(e, "reset")} icon={"revert-bold"} scale={0.875} />
                        <Controls.Button onClick={(e: any) => handleChange(e, "0")}>0</Controls.Button>
                        <Controls.Button onClick={(e: any) => handleChange(e, "sub")} icon={"chevron-left-small-bold"} scale={0.875} />
                    </Layouts.Row>
                </Pad>
                {props?.right?.children && (
                    <Layouts.Col
                        gap={0}
                        style={{
                            ...(typeof props?.left?.flex === "number" && {
                                flex: props?.left?.flex || 1,
                            }),
                        }}
                    >
                        {props?.right?.children}
                    </Layouts.Col>
                )}
            </div>
        </Style>
    );
}
