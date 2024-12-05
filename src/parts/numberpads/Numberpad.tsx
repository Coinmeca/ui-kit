"use client";
import { Controls, Layouts } from "components";
import Style, { Pad } from "./Numberpad.styled";
import { MutableRefObject, useCallback, useEffect, useMemo, useRef } from "react";

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
    shuffle?: boolean;
    input?: boolean | MutableRefObject<any>;
}

interface Option {
    flex?: number;
    children?: any;
}

function shuffle(array: any[]) {
    return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

function chunk<T>(array: T[], size?: number): T[] | T[][] {
    if (!size) return [array];
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

export default function Numberpad(props: Numberpad) {
    const type = props?.type || "number";
    const scale = props?.scale || 1.5;
    const padding = typeof props?.padding === "number" ? props?.padding : 2;
    const ref = useRef(props?.value?.toString() || "");

    const handleChange = (e: any, v: string) => {
        const value = ref.current;
        let input: string = "";
        if (v === "sub") input = value?.length - 1 > 0 ? value?.substring(0, value?.length - 1) : type === "code" ? "" : "0";
        else if (v === "reset") {
            input = type === "code" ? "" : "0";
            props?.onReset?.();
        } else
            input =
                type === "currency" && value === "0" && v === "0"
                    ? "0"
                    : type === "currency" && value === "0" && v !== "0"
                    ? v
                    : value + v;
        props?.onChange?.(e, input);
    };

    const numbers = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
        { value: "0", label: "0" },
    ];

    const buttons = useMemo(() => {
        return chunk(props?.shuffle ? shuffle(numbers) : numbers, 3);
    }, [props?.shuffle]);

    useEffect(() => {
        ref.current = props?.value?.toString() || "";
    }, [props?.value]);

    useEffect(() => {
        if (props?.input) {
            const ref = props?.input === true ? window : props?.input?.current;
            const input = (e: any) => {
                if ((e.key >= "0" && e.key <= "9") || e.key === "Backspace" || e.key === "Delete")
                    handleChange(e, e.key === "Backspace" ? "sub" : e.key === "Delete" ? "reset" : e.key);
            };
            ref.addEventListener("keydown", input);
            return () => ref.removeEventListener("keydown", input);
        }
    }, [props?.input]);

    return (
        <Style $scale={scale} $width={props?.width} $padding={padding} $reverse={props?.reverse} style={props?.style}>
            <div>
                {props?.left?.children && (
                    <Layouts.Col gap={0} style={{ flex: props?.left?.flex || 1 }}>
                        {props?.left?.children}
                    </Layouts.Col>
                )}
                <Pad>
                    {buttons &&
                        buttons?.length &&
                        buttons?.slice(0, 3)?.map((group, i) => (
                            <Layouts.Row key={i} gap={0} fix>
                                {group &&
                                    group?.length &&
                                    group?.map((button: any, i: number) => (
                                        <Controls.Button key={i} onClick={(e: any) => handleChange(e, button.value)}>
                                            {button.label}
                                        </Controls.Button>
                                    ))}
                            </Layouts.Row>
                        ))}
                    <Layouts.Row gap={0} style={{ ...(props?.reverse && { order: -1 }) }} fix>
                        <Controls.Button onClick={(e: any) => handleChange(e, "reset")} icon={"revert-bold"} scale={0.875} />
                        <Controls.Button onClick={(e: any) => handleChange(e, buttons[buttons.length - 1]?.[0]?.value)}>
                            {buttons[buttons.length - 1]?.[0]?.label}
                        </Controls.Button>
                        <Controls.Button
                            onClick={(e: any) => handleChange(e, "sub")}
                            icon={"chevron-left-small-bold"}
                            scale={0.875}
                        />
                    </Layouts.Row>
                </Pad>
                {props?.right?.children && (
                    <Layouts.Col gap={0} style={{ flex: props?.right?.flex || 1 }}>
                        {props?.right?.children}
                    </Layouts.Col>
                )}
            </div>
        </Style>
    );
}
