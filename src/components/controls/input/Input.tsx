"use client";
import React, { useState, useEffect, createRef } from "react";
import { Format } from "lib/utils";

import { Controls, Elements } from "components";
import Style, { Side } from "./Input.styled";

export interface Input {
    style?: object;

    form?: string;
    fold?: boolean;
    type?: string;
    inputMode?: "email" | "text" | "search" | "none" | "tel" | "url" | "numeric" | "decimal";
    value?: number | string;
    align?: "left" | "center" | "right";
    scale?: number;

    placeholder?: string;
    icon?: string;

    clearable?: boolean;
    clearPosition?: "left" | "right";

    min?: number;
    max?: number;
    step?: number;
    fix?: number;

    left?: {
        style?: object;
        width?: number;
        children?: any;
    };
    right?: {
        style?: object;
        width?: number;
        children?: any;
    };
    unit?: string;

    show?: "desktop" | "laptop" | "tablet" | "mobile";
    hide?: "desktop" | "laptop" | "tablet" | "mobile";

    onClick?: Function;
    onChange?: Function;
    onFocus?: Function;
    onBlur?: Function;
    onKeyDown?: Function;

    error?: boolean;
    message?: any;

    numberpad?: { open: Function; active: boolean; children?: any };
    lock?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
}

export default function Input(props: Input) {
    const input: any = createRef();
    const type = props?.type !== "password" ? props?.type : "password";
    const placeholder = props?.placeholder || "Type";
    const step = props?.step || 1;
    const scale = props?.scale || 1;
    const min = props?.min || 0;
    const align = props?.align || "left";

    const clearPosition = props?.clearPosition || "right";

    const [focus, setFocus] = useState<boolean>(false);
    const [fold, setFold] = useState<boolean>(false);
    const [extend, setExtend] = useState<boolean>(false);

    const [value, setValue] = useState<number | string>(props?.value || "");
    const [error, setError] = useState<boolean>(props?.error || false);

    useEffect(() => {
        if (props?.value) setValue(props?.value);
    }, [props?.value]);

    useEffect(() => {
        if (props?.lock || props?.disabled) return;
        if (value === "") setError(false);
        setValue(Format(value, type, false, props?.fix).toString());
    }, [value, type, props?.fix]);

    const onClick = (e: any) => {
        if (props?.lock || props?.disabled) return;
        input.current.focus();
        if (typeof props.onClick === "function") {
            props.onClick(e);
        }
        onExtend();
    };

    const onExtend = () => {
        if (fold) {
            setExtend(!extend);
        }
    };

    // const handleInput = useCallback(
    //     (event: ChangeEvent<HTMLInputElement>) => {
    //     onUserInput(event.target.value)
    //     },
    //     [onUserInput]
    // )

    const onChange = (e: any) => {
        if (props?.lock || props?.disabled) return;
        const value = typeof e !== "object" ? e : e.target.value;
        setError(false);
        setValue(Format(value, type, true, props?.fix, props?.max));
        if (typeof props?.onChange === "function") props?.onChange(e, value);
    };

    const onFocus = (e: any) => {
        if (props?.lock || props?.disabled) return;
        if (typeof props?.onFocus === "function") props?.onFocus(e);
    };

    const onBlur = () => {
        if (typeof props.onBlur === "function") props.onBlur();
        setExtend(false);
        onChange("");
    };

    const onKeyDown = (e: any) => {
        if (props?.lock || props?.disabled) return;
        const key = e.keyCode;
        if (((type === "currency" || type === "number") && ((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key === 110 && key === 190))) || key === 38 || key === 107 || key === 187 || key === 40 || key === 109 || key === 189) {
            let copy: number | undefined;
            if (key === 38 || key === 107 || key === 187) {
                if (e.shiftKey && e.ctrlKey) {
                    copy = value.toString() === "" ? step : parseFloat(value.toString().replaceAll(",", "")) + Math.abs(step * 100);
                } else if (e.shiftKey) {
                    copy = value.toString() === "" ? step : parseFloat(value.toString().replaceAll(",", "")) + Math.abs(step * 10);
                } else {
                    copy = value.toString() === "" ? step : parseFloat(value.toString().replaceAll(",", "")) + Math.abs(step);
                    console.log("copy", copy);
                }
                const result = typeof props?.max !== "undefined" ? (copy > props?.max ? props?.max : copy) : copy;
                if (type === "currency") {
                    setValue(Format(result));
                } else {
                    setValue(result);
                }
                if (typeof props?.onChange === "function") props?.onChange(e, result);
            }
            if (key === 40 || key === 109 || key === 189) {
                if (e.shiftKey && e.ctrlKey) {
                    copy = value.toString() === "" ? 0 : parseFloat(value.toString().replaceAll(",", "")) - Math.abs(step * 100);
                } else if (e.shiftKey) {
                    copy = value.toString() === "" ? 0 : parseFloat(value.toString().replaceAll(",", "")) - Math.abs(step * 10);
                } else {
                    copy = value.toString() === "" ? 0 : parseFloat(value.toString().replaceAll(",", "")) - Math.abs(step);
                }
                const result = copy <= 0 ? 0 : copy;
                if (type === "currency") {
                    setValue(Format(result, type));
                } else {
                    setValue(result);
                }
                if (typeof props?.onChange === "function") props?.onChange(e, result);
            }
        }
        if (typeof props?.onKeyDown === "function") {
            props?.onKeyDown(key);
        }
    };

    const Input = (
        <Style
            tabIndex={5}
            style={props?.style}
            $clearable={props?.clearable}
            $scale={scale}
            $focus={focus}
            $align={align}
            $error={error}
            $lock={props?.lock}
            $disabled={props?.disabled}
            onClick={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            data-active={focus}
            data-show={props?.show}
            data-hide={props?.hide}
        >
            <div>
                <div style={props?.style}>
                    {props?.left && (
                        <Side $width={props?.left?.width} style={props?.left?.style}>
                            {props?.left?.children}
                        </Side>
                    )}
                    <div>
                        {props?.clearable && clearPosition === "left" && <Controls.Button icon={"x"} fit hide={value.toString().length === 0} onClick={() => setValue(props?.type === ("number" || "currency") ? 0 : "")} />}
                        <input
                            ref={input}
                            style={{ textAlign: align }}
                            placeholder={placeholder}
                            type={type === "currency" ? "currency" : type}
                            inputMode={(props?.numberpad && "none") || props?.inputMode}
                            min={min}
                            max={props?.max}
                            step={props?.step}
                            value={value}
                            onClick={(e: any) => {
                                onClick(e);
                                if (typeof props?.numberpad?.open === "function") {
                                    props?.numberpad?.open();
                                }
                            }}
                            onInput={(e) => onChange(e)}
                            onChange={(e) => onChange(e)}
                            onFocus={(e) => onFocus(e)}
                            onKeyDown={(e) => onKeyDown(e)}
                            autoFocus={extend || focus}
                            disabled={props?.disabled}
                            readOnly={props?.lock || props?.disabled}
                        />
                        {props?.clearable && clearPosition === "right" && <Controls.Button icon={"x"} fit hide={value.toString().length === 0} onClick={() => setValue(props?.type === ("number" || "currency") ? 0 : "")} />}
                    </div>
                    {(props?.unit || props?.right) && (
                        <Side $width={props?.right?.width} style={props?.right?.style}>
                            {props?.right?.children}
                            {props?.unit && <span>{props?.unit}</span>}
                        </Side>
                    )}
                </div>
                {props?.error && props?.message && <p className="message">{props?.message}</p>}
            </div>
        </Style>
    );

    if (fold) {
        return (
            <div onClick={() => setExtend(true)} onBlur={onBlur} data-show={props?.show} data-hide={props?.hide}>
                <div>{Input}</div>
            </div>
        );
    }

    // Styled Components Caution */
    return (
        <>
            {Input}
            {props?.numberpad?.active && props?.numberpad?.children}
        </>
    );
}
