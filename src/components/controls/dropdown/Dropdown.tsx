"use client";

import { useEffect, useState } from "react";
import { Controls } from "components";
import { Style } from "./Dropdown.styled";

export interface Dropdown {
    className?: string;
    style?: any;

    form?: string;
    title?: string;
    scale?: number;

    max?: number;
    fit?: boolean;
    disabled?: any;
    placeholder?: string;

    options?: any;
    option?: any;

    keyName?: any;
    keyIndex?: number;
    imgName?: string;

    open?: boolean;
    onClick?: Function;
    onClickItem?: Function;
    device?: string;
}

export default function Dropdown(props: Dropdown) {
    const form = props?.form;
    const max = props?.max || 15;
    const fit = props?.fit || false;
    const scale = props?.scale || 1;

    const placeholder = props?.placeholder || "Select";
    const [options, setOptions] = useState<any>(props?.options);
    const [option, setOption] = useState<any>(props?.option);
    const [open, setOpen] = useState<boolean>(props?.open || false);

    const keyName = props?.keyName || "value";
    const keyIndex = props?.keyName || 0;
    const imgName = props?.imgName || "img";

    const disabled = props?.disabled || false;
    const device = props?.device;

    useEffect(() => {
        const option = props?.option;
        const options = props?.options;

        if (Array.isArray(options) && !options[0]) {
            let _options: any[] = [];
            for (let i = 0; i < options.length; i++) {
                if (Array.isArray(options[i])) {
                    let _option = {};
                    for (let j = 0; j < options[i].length; j++) {
                        _option = {
                            ..._option,
                            [j]: options[i][j],
                        };
                    }
                    _options.push({ ..._option });
                } else {
                    _options.push({
                        [keyName]: options[i],
                    });
                    if (option === options[i]) {
                        setOption({
                            [keyName]: options[i],
                        });
                    }
                }
            }
            setOptions(_options);
        }
    }, [props?.options, props?.option]);

    const onSelect = (e: React.FormEvent, v: any, k: string | number) => {
        if (disabled) return;
        // typeof v[keyIndex] !== "undefined" ? option = v[keyIndex] : typeof v[keyName] !== "undefined" ? option = v[keyName] : option = v;
        setOption(v);
        if (typeof v?.event === "function") v.event(e);
        if (typeof props?.onClickItem === "function") props?.onClickItem(e, k, option);
        setOpen(false);
    };

    const onOpen = (e?: any) => {
        if (disabled) return;
        setOpen(!open);
        if (typeof props?.onClick === "function") props?.onClick(e, option);
    };

    const onClose = (e?: any) => {
        setOpen(false);
        if (typeof props?.onClick === "function") props?.onClick(e, option);
    };

    return (
        <Style tabIndex={5} className={props?.className} style={{ zIndex: open ? 10 : 1, ...props?.style }} onClick={onOpen} onBlur={onClose} title={props?.title} $open={open} $max={max} $fit={fit} $scale={scale} $disabled={disabled}>
            <ul>
                <li>
                    {form?.indexOf("more") === 0 ? (
                        <Controls.Button icon="more" />
                    ) : form?.indexOf("icon") === 0 ? (
                        <Controls.Button icon={option?.icon} />
                    ) : (
                        <>
                            {option && typeof option[imgName] !== "undefined" && <img src={`${option[imgName]}`} alt={option?.imgAlt} />}
                            <span>
                                {typeof option === "undefined"
                                    ? placeholder
                                    : typeof option === "object"
                                    ? typeof option[keyIndex] !== "undefined"
                                        ? option[keyIndex]
                                        : typeof option[keyName] !== "undefined"
                                        ? option[keyName]
                                        : option
                                    : option}
                            </span>
                            <Controls.Icon icon="chevron-down-bold" />
                        </>
                    )}
                </li>
            </ul>
            <ul>
                {options &&
                    options.length > 0 &&
                    options.map(
                        (v: any, k: number) =>
                            v && (
                                <li
                                    key={k}
                                    onClick={(e) => {
                                        onSelect(e, v, k);
                                    }}
                                    className={typeof option !== "undefined" && (v[keyIndex] === option || v[keyName] === option || v === option) ? "disabled" : ""}
                                >
                                    <>
                                        {typeof v[imgName] !== "undefined" && v[imgName] !== "" ? (
                                            <>
                                                <img src={`${v[imgName]}`} alt={v.imgAlt} />
                                                <span>{typeof v[keyIndex] !== "undefined" ? v[keyIndex] : typeof v[keyName] !== "undefined" ? v[keyName] : v}</span>
                                            </>
                                        ) : v.icon !== "" && typeof v.icon !== "undefined" ? (
                                            <>
                                                <Controls.Icon icon={option?.icon} />
                                                <span>{typeof v[keyIndex] !== "undefined" ? v[keyIndex] : typeof v[keyName] !== "undefined" ? v[keyName] : v}</span>
                                            </>
                                        ) : (
                                            <span>{typeof v === "object" ? (typeof v[keyIndex] !== "undefined" ? v[keyIndex] : typeof v[keyName] !== "undefined" ? v[keyName] : v) : v}</span>
                                        )}
                                    </>
                                </li>
                            )
                    )}
            </ul>
        </Style>
    );
}
