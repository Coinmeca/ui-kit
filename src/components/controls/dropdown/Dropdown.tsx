"use client";

import { useEffect, useState } from "react";
import { Controls } from "components";
import { Style } from "./Dropdown.styled";

interface Props {
    className?: string;
    style?: any;

    form?: string;

    theme?: "light" | "dark";
    width?: string;
    height?: string;
    disabled?: any;
    placeholder?: string;

    options?: any;
    option?: any;

    keyName?: any;
    keyIndex?: number;
    imgName?: string;

    click?: Function;
    clickItem?: Function;
    device?: string;
}

export default function Dropdown(props: Props) {
    const form = props?.form;
    const theme = props?.theme || "light";

    const placeholder = props?.placeholder || "Select";
    const [options, setOptions] = useState<any>(props?.options);
    const [option, setOption] = useState<any>(props?.option);

    const keyName = props?.keyName || "value";
    const keyIndex = props?.keyName || 0;
    const imgName = props?.imgName || "img";

    const disabled = props?.disabled || false;
    // const click = useState<Function | undefined>(props?.click);
    const device = props?.device;
    const [open, setOpen] = useState<boolean>(false);

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

    const onClick = (e: React.FormEvent, v: any, k: string | number) => {
        // typeof v[keyIndex] !== "undefined" ? option = v[keyIndex] : typeof v[keyName] !== "undefined" ? option = v[keyName] : option = v;
        setOption(v);
        if (typeof v?.event === "function") {
            v.event(e);
        }
        if (typeof props?.click === "function") {
            props?.click(e, k, option);
        }
        setOpen(false);
    };

    const onClickItem = (e: React.FormEvent, v: any, k: string | number) => {
        // typeof v[keyIndex] !== "undefined" ? option = v[keyIndex] : typeof v[keyName] !== "undefined" ? option = v[keyName] : option = v;
        setOption(v);
        if (typeof v?.event === "function") {
            v.event(e);
        }
        if (typeof props?.clickItem === "function") {
            props?.clickItem(e, k, option);
        }
        setOpen(false);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onOpen = () => {
        setOpen(!open);
    };

    return (
        <Style tabIndex={5} className={props?.className} style={{ zIndex: open ? 5 : 2, ...props?.style }} onBlur={onClose} title={props?.title}>
            <ul onClick={() => onOpen()}>
                {form?.indexOf("more") === 0 ? (
                    <Controls.Icon icon="more" />
                ) : form?.indexOf("icon") === 0 ? (
                    <Controls.Icon icon={option?.icon} color={color} title={title} disabled={disabled} click={(e, v, k) => onClick(e, v, k)} device={device} />
                ) : (
                    <li>
                        {option && typeof option[imgName] !== "undefined" && <img src={`${option[imgName]}`} style={{ width: 16, height: 16, verticalAlign: "middle", marginRight: 8 }} alt="" />}
                        {typeof option === "undefined" ? placeholder : typeof option === "object" ? (typeof option[keyIndex] !== "undefined" ? option[keyIndex] : typeof option[keyName] !== "undefined" ? option[keyName] : option) : option}
                    </li>
                )}
            </ul>
            <ul>
                {options &&
                    options.length > 0 &&
                    options.map(
                        (v, k) =>
                            v && (
                                <li
                                    key={k}
                                    onClick={(e) => {
                                        onClick(e, v, k);
                                        onClickItem(e, v, k);
                                    }}
                                    className={typeof option !== "undefined" && (v[keyIndex] === option || v[keyName] === option || v === option) ? "disable" : ""}
                                >
                                    <>
                                        {typeof v[imgName] !== "undefined" && v[imgName] !== "" ? (
                                            <>
                                                <img
                                                    src={`${v[imgName]}`}
                                                    style={{
                                                        width: 16,
                                                        height: 16,
                                                        verticalAlign: "middle",
                                                        marginRight: 8,
                                                    }}
                                                    alt=""
                                                />
                                                <span>{typeof v[keyIndex] !== "undefined" ? v[keyIndex] : typeof v[keyName] !== "undefined" ? v[keyName] : v}</span>
                                            </>
                                        ) : v.icon !== "" && typeof v.icon !== "undefined" ? (
                                            <>
                                                <Controls.Icon icon={v.icon} title={v.title} />
                                                <span>{typeof v[keyIndex] !== "undefined" ? v[keyIndex] : typeof v[keyName] !== "undefined" ? v[keyName] : v}</span>
                                            </>
                                        ) : typeof v === "object" ? (
                                            typeof v[keyIndex] !== "undefined" ? (
                                                v[keyIndex]
                                            ) : typeof v[keyName] !== "undefined" ? (
                                                v[keyName]
                                            ) : (
                                                v
                                            )
                                        ) : (
                                            v
                                        )}
                                    </>
                                </li>
                            )
                    )}
            </ul>
        </Style>
    );
}
