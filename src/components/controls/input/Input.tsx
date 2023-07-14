"use client";
import React, { useState, useEffect, createRef } from "react";
import { Format } from "lib/utils";

import { Controls, Elements } from "components";
import type { Button } from "components/controls/button/Button";
import type { Dropdown } from "components/controls/dropdown/Dropdown";
import Style from "./Input.styled";

export interface Input {
    style?: object;

    form?: string;
    fold?: boolean;
    type?: string;
    value?: number | string | undefined;
    align?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
    scale?: number;
    separator?: boolean;

    placeholder?: string;
    icon?: string;

    clearable?: boolean;
    clearPosition?: "left" | "right";
    width?: number;

    min?: number;
    max?: number;
    step?: number;
    fix?: number;

    unit?: string;
    button?: Button;
    dropdown?: Dropdown;

    show?: "desktop" | "laptop" | "tablet" | "mobile";
    hide?: "desktop" | "laptop" | "tablet" | "mobile";

    onClick?: Function;
    onChange?: Function;
    onFocus?: Function;
    onBlur?: Function;
    onKeyDown?: Function;

    error?: boolean;
    message?: any;
    disabled?: boolean;

    children?: any;
}

export default function Input(props: Input) {
    const input: any = createRef();
    const type = props?.type !== "password" ? props?.type : "password";
    const placeholder = props?.placeholder || "Type";
    const clearable = props?.clearable || false;
    const step = props?.step || 1;
    const scale = props?.scale || 1;
    const min = props?.min || 0;

    const [focus, setFocus] = useState<boolean>(false);
    const [fold, setFold] = useState<boolean>(false);
    const [extend, setExtend] = useState<boolean>(false);

    const [value, setValue] = useState<number | string>(props?.value?.toString() || "");
    const [align, setAlign] = useState<any>(props.align || "left");

    const [error, setError] = useState<boolean>(props?.error || false);

    const clearPosition = props?.clearPosition || "right";
    const disabled = props?.disabled || false;

    useEffect(() => {
        if (value === "") setError(false);
        setValue(Format(value, type, props?.separator, props?.fix).toString());
    }, [value, type, props?.separator, props?.fix]);

    const onClick = (e: any) => {
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

    const onBlur = () => {
        if (typeof props.onBlur === "function") props.onBlur();
        setExtend(false);
        onChange("");
    };

    // const handleInput = useCallback(
    //     (event: ChangeEvent<HTMLInputElement>) => {
    //     onUserInput(event.target.value)
    //     },
    //     [onUserInput]
    // )

    const onChange = (e: any) => {
        const value = typeof e !== "object" ? e : e.target.value;
        setError(false);
        setValue(Format(value, type, props?.separator, props?.fix, props?.max));
        // props?.separator ? value : setValue(parseFloat(value.replaceAll(',', '')));
        if (typeof props?.onChange === "function") props?.onChange(e, value);
    };

    const onFocus = (e: any) => {
        if (typeof props?.onFocus === "function") props?.onFocus(e);
    };

    const format = {
        email: /^[a-zA-Z0-9+]*$/,
        number: /^[0-9+]*$/,
        currency: /^[,.0-9]*$/,
    };

    const onKeyDown = (e: any) => {
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
            $clearable={clearable}
            $scale={scale}
            $focus={focus}
            $error={error}
            $disabled={disabled}
            onClick={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            data-active={focus}
            data-show={props?.show}
            data-hide={props?.hide}
        >
            <div>
                <div style={props?.style}>
                    {props?.icon && <Elements.Icon icon={props?.icon} />}
                    <div>
                        {clearable && clearPosition === "left" && <Controls.Button icon={"x"} fit hide={value.toString().length === 0} onClick={() => setValue(props?.type === ("number" || "currency") ? 0 : "")} />}
                        <input
                            ref={input}
                            style={{ textAlign: align }}
                            placeholder={placeholder}
                            type={type === "currency" ? "currency" : type}
                            min={min}
                            max={props?.max}
                            step={props?.step}
                            value={value}
                            onClick={(e: any) => onClick(e)}
                            onInput={(e) => onChange(e)}
                            onChange={(e) => onChange(e)}
                            onFocus={(e) => onFocus(e)}
                            onKeyDown={(e) => onKeyDown(e)}
                            autoFocus={extend}
                            disabled={disabled}
                        />
                        {clearable && clearPosition === "right" && <Controls.Button icon={"x"} fit hide={value.toString().length === 0} onClick={() => setValue(props?.type === ("number" || "currency") ? 0 : "")} />}
                    </div>
                    {(props?.unit || props?.button || props?.dropdown || props?.children) && (
                        <div style={props?.width ? { width: `${props?.width}em` } : {}}>
                            {props?.unit && <span>{props?.unit}</span>}
                            {props?.button && <Controls.Button {...props?.button} />}
                            {props?.dropdown && <Controls.Dropdown {...props?.dropdown} />}
                            {props?.children}
                        </div>
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
    return <>{Input}</>;
}
