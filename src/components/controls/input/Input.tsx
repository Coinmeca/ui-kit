"use client";
import { Controls, Elements } from "components";
import { format } from "lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import Style, { Dot, Inner, Side, Wrapper } from "./Input.styled";

export interface Input {
    style?: any;

    form?: string;
    fold?: boolean;
    foldPosition?: "left" | "center" | "right";
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
    length?: number;

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
    onFocusOut?: Function;
    onBlur?: Function;
    onClear?: Function;
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
    const wrapper: any = useRef();
    const input: any = useRef();

    const placeholder = props?.placeholder?.toString() || "";
    const type = props?.type === "password" ? "password" : props?.type || "text";
    const fold = props?.fold || false;
    const step = (typeof props?.step === "number" && !isNaN(props?.step) && props?.step) || 1;
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
                    let copy = parseFloat(format(value, "number", props?.lock, props?.fix, props?.max));
                    value =
                        typeof props?.min === "number" && props?.min >= copy
                            ? props?.min
                            : typeof props?.max === "number" && props?.max <= copy
                            ? props?.max
                            : value;
                }
            }
            // else if (typeof props?.length === 'number' && props?.length > 0 && props?.length > value?.toString()?.length) value = value?.toString()?.substring(0, props?.length)
            return format(value, type, props?.lock, props?.fix, props?.max);
        },
        [type, props.min, props.max, props.lock, props.fix, props?.length, props?.readOnly],
    );

    const [focus, setFocus] = useState<boolean>(false);
    const [expand, setExpand] = useState<boolean>(!fold);
    const [value, setValue] = useState<number | string>(formatter(props?.value));
    const [error, setError] = useState<boolean>(props?.error || false);

    const handleClick = (e: any) => {
        if (props?.lock || props?.disabled) return;
        input.current.focus();
        if (typeof props?.onClick === "function") {
            props?.onClick(e);
        }
    };

    const handleClickOutside = (e: any) => {
        if (fold && wrapper.current && !wrapper.current.contains(e.target)) setExpand(false);
    };

    const handleChange = (e: any) => {
        if (props?.lock || props?.disabled) return;
        const v = formatter(typeof e === "object" ? e?.target?.value : e);
        if (v !== value) {
            setValue(v);
            if (typeof props?.onChange === "function") props?.onChange(e?.target || input?.current, v);
        }
    };

    const handleFocus = (e: any) => {
        if (props?.lock || props?.disabled) return;
        if (typeof props?.onFocus === "function") props?.onFocus(e);
    };

    const handleClear = () => {
        input.current.focus();
        handleChange("");
        if (typeof props?.onClear === "function") props?.onClear();
        setError(false);
    };

    const handleFocusOut = () => {
        if (typeof props?.onFocusOut === "function") props?.onFocusOut();
        setFocus(false);
    };

    const handleBlur = () => {
        if (typeof props?.onBlur === "function") props?.onBlur();
        setFocus(false);
    };

    const handleKeyDown = (e: any) => {
        if (props?.lock || props?.disabled) return;
        const key = e.keyCode;
        if (
            ((type === "currency" || type === "number") &&
                ((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key === 110 && key === 190))) ||
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
                    copy =
                        value.toString() === ""
                            ? step
                            : parseFloat(value.toString().replaceAll(",", "")) + Math.abs(step * 100);
                } else if (e.shiftKey) {
                    copy =
                        value.toString() === "" ? step : parseFloat(value.toString().replaceAll(",", "")) + Math.abs(step * 10);
                } else {
                    copy = value.toString() === "" ? step : parseFloat(value.toString().replaceAll(",", "")) + Math.abs(step);
                }
                copy = formatter(copy);
                setValue(copy);
                if (typeof props?.onChange === "function") props?.onChange(e, copy);
            }
            if (key === 40 || key === 109 || key === 189) {
                if (e.shiftKey && e.ctrlKey) {
                    copy =
                        value.toString() === "" ? 0 : parseFloat(value.toString().replaceAll(",", "")) - Math.abs(step * 100);
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

    useEffect(() => {
        if (typeof props?.error === "boolean") setError(props?.error);
    }, [props?.error]);

    useEffect(() => {
        if (fold && expand) input?.current?.focus?.();
    }, [fold, expand]);

    useEffect(() => {
        if (fold) document.addEventListener("mousedown", handleClickOutside);
        else setExpand(true);
        return () => {
            if (fold) document.removeEventListener("mousedown", handleClickOutside);
            else setExpand(true)
        };
    }, [fold]);

    const Input = (
        <Style
            tabIndex={5}
            ref={wrapper}
            style={props?.style?.wrapper}
            $clearable={props?.clearable}
            $scale={scale}
            $type={type}
            $fold={fold}
            $expand={expand}
            $focus={focus}
            $align={align}
            $error={error}
            $lock={props?.lock}
            $disabled={props?.disabled}
            onClick={() => !(props?.lock || props?.disabled) && setFocus(true)}
            onBlur={() => !fold && handleBlur()}
            data-active={focus}
            data-show={props?.show}
            data-hide={props?.hide}>
            <div>
                <div style={props?.style?.input || props?.style}>
                    {props?.left && (
                        <Side $width={props?.left?.width} style={props?.left?.style}>
                            {props?.left?.children}
                        </Side>
                    )}
                    <Inner $expand={expand}>
                        {props?.clearable && clearPosition === "left" && (
                            <Controls.Button
                                icon={"x"}
                                style={{ marginRight: ".5rem" }}
                                hide={value.toString().length === 0}
                                onClick={handleClear}
                                fit
                            />
                        )}
                        <input
                            ref={input}
                            style={{ textAlign: align }}
                            placeholder={placeholder}
                            type={type === "currency" ? "currency" : type}
                            inputMode={
                                props?.inputMode
                                    ? props?.inputMode
                                    : type === "number" || type === "currency"
                                    ? "numeric"
                                    : undefined
                            }
                            min={min}
                            max={props?.max}
                            size={props?.length}
                            maxLength={props?.length}
                            step={props?.step}
                            value={formatter(value)}
                            onClick={handleClick}
                            onInput={handleChange}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleFocusOut}
                            onKeyDown={handleKeyDown}
                            autoFocus={(fold && expand) || focus || props?.autoFocus}
                            disabled={props?.disabled}
                            readOnly={props?.lock || props?.disabled}
                        />
                        {props?.clearable && clearPosition === "right" && (
                            <Controls.Button
                                icon={"x"}
                                style={{ marginLeft: ".5rem" }}
                                hide={value.toString().length === 0}
                                onClick={handleClear}
                                fit
                            />
                        )}
                    </Inner>
                    {(props?.unit || props?.right) && (
                        <Side $width={props?.right?.width} style={props?.right?.style}>
                            {props?.right?.children}
                            {props?.unit && <span>{props?.unit}</span>}
                        </Side>
                    )}
                </div>
                {fold && <Dot $active={!!value?.toString()?.length} $expand={expand} />}
            </div>
            {typeof props?.message === "string" || typeof props?.message === "number" ? (
                <Elements.Text type={"desc"}>{props?.message}</Elements.Text>
            ) : props?.message?.$$typeof ? (
                props?.message
            ) : typeof props?.message === "object" && props?.message?.children ? (
                (typeof props?.message?.children === "string" || typeof props?.message?.children === "number") && (
                    <Elements.Text
                        {...props?.message}
                        align={props?.message?.align || "left"}
                        type={props?.message?.type || "desc"}
                        style={{ ...props?.message?.style, marginTop: `${props?.message?.gap || 0.5}em` }}>
                        {props?.message?.children}
                    </Elements.Text>
                )
            ) : (
                props?.message?.children?.$$typeof && {
                    ...props?.message?.children,
                    style: {
                        ...props?.message?.children?.style,
                        ...props?.message?.style,
                        marginTop: `${props?.message?.gap || 1}em`,
                    },
                }
            )}
        </Style>
    );

    if (fold) {
        return (
            <Wrapper
                ref={wrapper}
                $foldPosition={props?.foldPosition}
                $expand={expand}
                onClick={() => setExpand(true)}
                onBlur={handleBlur}
                data-show={props?.show}
                data-hide={props?.hide}>
                <div>{Input}</div>
            </Wrapper>
        );
    }

    return <>{Input}</>;
}
