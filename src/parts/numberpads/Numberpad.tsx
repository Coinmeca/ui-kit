"use client";
import { Controls, Layouts } from "components";
import Style, { Pad } from "./Numberpad.styled";

export interface Numberpad {
    scale?: number;
    padding?: number;
    left?: Option;
    right?: Option;
    reverse?: boolean;
    width?: number | { min?: number; max?: number };
}

interface Option {
    flex?: number;
    children?: any;
}

export default function Numberpad(props: Numberpad) {
    const scale = props?.scale || 1;
    const padding = props?.padding || 2;

    return (
        <Style $scale={scale} $width={props?.width} $padding={padding} $reverse={props?.reverse}>
            {props?.left?.children && (
                <Layouts.Col gap={0} style={{ ...(typeof props?.left?.flex === "number" && { flex: props?.left?.flex || 1 }) }}>
                    {props?.left?.children}
                </Layouts.Col>
            )}
            <Pad>
                <Layouts.Row gap={0} fix>
                    <Controls.Button>1</Controls.Button>
                    <Controls.Button>2</Controls.Button>
                    <Controls.Button>3</Controls.Button>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Controls.Button>4</Controls.Button>
                    <Controls.Button>5</Controls.Button>
                    <Controls.Button>6</Controls.Button>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Controls.Button>7</Controls.Button>
                    <Controls.Button>8</Controls.Button>
                    <Controls.Button>9</Controls.Button>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Controls.Button>0</Controls.Button>
                    <Controls.Button>0</Controls.Button>
                    <Controls.Button>0</Controls.Button>
                </Layouts.Row>
            </Pad>
            {props?.right?.children && (
                <Layouts.Col gap={0} style={{ ...(typeof props?.left?.flex === "number" && { flex: props?.left?.flex || 1 }) }}>
                    {props?.right?.children}
                </Layouts.Col>
            )}
        </Style>
    );
}
