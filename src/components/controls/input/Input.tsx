"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Controls } from "components";
import { Format } from "lib/utils";
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

    placeholder?: number | string;

    clearable?: boolean;
    clearPosition?: "left" | "right";

    min?: number;
    max?: number;
    step?: number;
    fix?: number;

    left?: {
        $$typeof?: any;
        style?: object;
        width?: number;
        children?: any;
    };
    right?: {
        $$typeof?: any;
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

    autoFocus?: boolean;
    lock?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
}

interface format {
    display?: boolean | number;
    limit?: number;
    unit?: boolean | number;
    fix?: number | "auto";
    max?: number;
    sign?: boolean;
}

export default function Input(props: Input) {
    const input: any = useRef();

    const type = props?.type === "password" ? "password" : props?.type || "text";
    const placeholder = props?.placeholder?.toString() || "Type";
    const step = props?.step || 1;
    const scale = props?.scale || 1;
    const min = props?.min || 0;
    const align = props?.align || "left";

    const clearPosition = props?.clearPosition || "right";

    const formatter = useCallback(
        (value?: number | string) => {
            if (!value || value === "") return "";
            if (value?.toString() === "NaN") value = "";
            if (type === "number" || type === "currency") {
                if (!props.readOnly && !value.toString().endsWith(".")) {
                    let copy = parseFloat(Format(value, "number", props?.lock, props?.fix, props?.max));
                    value =
                        typeof props?.min === "number" && props?.min >= copy
                            ? props?.min
                            : typeof props?.max === "number" && props?.max <= copy
                            ? props?.max
                            : value;
                }
            }
            return Format(value, type, props?.lock, props?.fix, props?.max);
        },
        [type, props.min, props.max, props.lock, props.fix, props?.readOnly]
    );

    const [focus, setFocus] = useState<boolean>(false);
    const [fold, setFold] = useState<boolean>(false);
    const [extend, setExtend] = useState<boolean>(false);
    const [value, setValue] = useState<number | string>(formatter(props?.value));
    const [error, setError] = useState<boolean>(props?.error || false);

    const handleClick = (e: any) => {
        if (props?.lock || props?.disabled) return;
        input.current.focus();
        if (typeof props?.onClick === "function") {
            props?.onClick(e);
        }
        handleExtend();
    };

    const handleExtend = () => {
        if (fold) {
            setExtend(!extend);
        }
    };

    const handleChange = (e: any) => {
        if (props?.lock || props?.disabled) return;
        const v = formatter(typeof e === "object" ? e?.target?.value : e);
        setError(false);
        setValue(v);
        if (typeof props?.onChange === "function") props?.onChange(e?.target || input?.current, v);
    };

    const handleFocus = (e: any) => {
        if (props?.lock || props?.disabled) return;
        if (typeof props?.onFocus === "function") props?.onFocus(e);
    };

    const handleBlur = () => {
        if (typeof props?.onBlur === "function") props?.onBlur();
        setExtend(false);
        handleChange("");
    };

    const handleKeyDown = (e: any) => {
        if (props?.lock || props?.disabled) return;
        const key = e.keyCode;
        if (
            ((type === "currency" || type === "number") && ((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key === 110 && key === 190))) ||
            key === 38 ||
            key === 107 ||
            key === 187 ||
            key === 40 ||
            key === 109 ||
            key === 189
        ) {
            let copy: any = 0;
            if (key === 38 || key === 107 || key === 187) {
                if (e.shiftKey && e.ctrlKey) {
                    copy = value.toString() === "" ? step : parseFloat(value.toString().replaceAll(",", "")) + Math.abs(step * 100);
                } else if (e.shiftKey) {
                    copy = value.toString() === "" ? step : parseFloat(value.toString().replaceAll(",", "")) + Math.abs(step * 10);
                } else {
                    copy = value.toString() === "" ? step : parseFloat(value.toString().replaceAll(",", "")) + Math.abs(step);
                }
                copy = formatter(copy);
                setValue(copy);
                if (typeof props?.onChange === "function") props?.onChange(e, copy);
            }
            if (key === 40 || key === 109 || key === 189) {
                if (e.shiftKey && e.ctrlKey) {
                    copy = value.toString() === "" ? 0 : parseFloat(value.toString().replaceAll(",", "")) - Math.abs(step * 100);
                } else if (e.shiftKey) {
                    copy = value.toString() === "" ? 0 : parseFloat(value.toString().replaceAll(",", "")) - Math.abs(step * 10);
                } else {
                    copy = value.toString() === "" ? 0 : parseFloat(value.toString().replaceAll(",", "")) - Math.abs(step);
                }
                copy = formatter(copy);
                setValue(copy);
                if (typeof props?.onChange === "function") props?.onChange(e, copy);
            }
        }
        if (typeof props?.onKeyDown === "function") {
            props?.onKeyDown(key);
        }
    };

    useEffect(() => {
        const v = formatter(props?.value);
        setValue(v);
        if (typeof props?.onChange === "function") props?.onChange(input?.current, v);
    }, [props?.value, type, props?.fix, props?.min, props?.max, props?.readOnly, props?.lock, props?.disabled, formatter]);

    const Input = (
        <Style
            tabIndex={5}
            style={props?.style}
            $clearable={props?.clearable}
            $scale={scale}
            $type={type}
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
                            {props?.left?.$$typeof ? props?.left : props?.left?.children}
                        </Side>
                    )}
                    <div>
                        {props?.clearable && clearPosition === "left" && (
                            <Controls.Button
                                icon={"x"}
                                fit
                                hide={value.toString().length === 0}
                                onClick={() => setValue(props?.type === ("number" || "currency") ? 0 : "")}
                            />
                        )}
                        <input
                            ref={input}
                            style={{ textAlign: align }}
                            placeholder={placeholder}
                            type={type === "currency" ? "number" : type}
                            inputMode={props?.inputMode}
                            min={min}
                            max={props?.max}
                            step={props?.step}
                            value={formatter(value)}
                            onClick={handleClick}
                            onInput={handleChange}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onKeyDown={handleKeyDown}
                            autoFocus={extend || focus || props?.autoFocus}
                            disabled={props?.disabled}
                            readOnly={props?.lock || props?.disabled}
                        />
                        {props?.clearable && clearPosition === "right" && (
                            <Controls.Button
                                icon={"x"}
                                fit
                                hide={value.toString().length === 0}
                                onClick={() => setValue(props?.type === ("number" || "currency") ? 0 : "")}
                            />
                        )}
                    </div>
                    {(props?.unit || props?.right) && (
                        <Side $width={props?.right?.width} style={props?.right?.style}>
                            {props?.left?.$$typeof ? props?.right : props?.right?.children}
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
            <div onClick={() => setExtend(true)} onBlur={handleBlur} data-show={props?.show} data-hide={props?.hide}>
                <div>{Input}</div>
            </div>
        );
    }

    return <>{Input}</>;
}
