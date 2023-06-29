"use client";
import React, { useState, useEffect, useRef } from "react";
import Style from "./Range.styled";
import { Format } from "lib/utils";

export interface Slider {
    color?: string;
    value?: number;
    onChange?: Function;
    step?: number;
    snap?: boolean;
    device?: string;
    disabled?: boolean;
}

export default function Range(props: Slider) {
    const [value, setValue] = useState<number>(props?.value || 0);

    const color = props?.color || "white";
    const step = props?.step || 2;
    const snap = props?.snap || false;
    const disabled = props?.disabled || false;

    useEffect(() => {
        if (typeof props.value === "number" && props.value > -1) props.value > 100 ? setValue(100) : props.value < 0 ? setValue(0) : setValue(props.value);
    }, []);

    useEffect(() => {
        if (typeof props.value === "number" && !isNaN(props.value)) setValue(props.value);
    }, [props?.value]);

    const onChange = (e: any) => {
        const point = parseFloat(e.target.value);
        const range = 100;
        console.log(typeof e.target.value, e.target.value);
        setValue(Format(e.target.value, "number"));
        // if (0 <= point && point <= range && 0 <= value && value <= 100) {
        if (!snap) {
            const percent = Math.round((point / range) * 100);
            setValue(percent);
            props?.onChange && props?.onChange(percent);
        } else {
            const snap = range / (step - 1);
            const dot = (point / snap).toFixed(2);
            const dotPoint = dot.toString().split(".");

            const add = parseInt(dotPoint[1]) < 50 ? 0 : 1;
            const dots = parseInt(dotPoint[0]) + add;

            const percent = Math.round((100 / (step - 1)) * dots);
            setValue(percent);

            props?.onChange && props?.onChange(percent);
        }
        // }
    };

    return (
        <>
            {/* <Style onClick={(e) => handler(e)} onDrag={(e) => handler(e)} draggable={true}> */}
            <Style draggable={false} $color={color}>
                <input type="range" min={0} max={100} value={value} onChange={(e) => onChange(e)} />
                <div>
                    <div>
                        <div style={{ backgroundSize: `${value}% 100%` }}>
                            {[...Array(step)].map((_, i) => (
                                <div key={i} className={value >= (100 / (step - 1)) * i ? "on" : ""} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <span style={{ left: `${value}%` }}>
                            <span>{value.toFixed(0)}%</span>
                        </span>
                    </div>
                </div>
            </Style>
        </>
    );
}
