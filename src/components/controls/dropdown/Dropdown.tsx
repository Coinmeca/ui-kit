"use client";
import { useEffect, useState } from "react";
import { Controls, Elements, Layouts } from "components";
import Style, { Item, Option, Options } from "./Dropdown.styled";
import Image from "next/image";
import { usePortal } from "hooks";
import { BottomSheet } from "containers";

export interface Dropdown {
    style?: object;

    form?: string;
    title?: string;
    scale?: number;

    height?: number;
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

    responsive?: boolean;
    show?: "desktop" | "laptop" | "tablet" | "mobile";
    hide?: "desktop" | "laptop" | "tablet" | "mobile";
}

export default function Dropdown(props: Dropdown) {
    const form = props?.form;
    const height = props?.height || 16;
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
    const device = props?.show;

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
    }, [props?.options, props?.option, keyName]);

    const handleSelect = (e: React.FormEvent, v: any, k: string | number) => {
        if (disabled) return;
        // typeof v[keyIndex] !== "undefined" ? option = v[keyIndex] : typeof v[keyName] !== "undefined" ? option = v[keyName] : option = v;
        setOption(v);
        if (typeof v?.event === "function") v.event(e);
        if (typeof props?.onClickItem === "function") props?.onClickItem(e, option, k);
        setOpen(false);
        closeSelect();
    };

    const handleOpen = (e?: any) => {
        if (disabled) return;
        setOpen(!open);
        if (typeof props?.onClick === "function") props?.onClick(e, option);
    };

    const handleClose = (e?: any) => {
        setOpen(false);
        if (typeof props?.onClick === "function") props?.onClick(e, option);
    };

    const Select = (
        <Options>
            {options &&
                options.length > 0 &&
                options.map(
                    (v: any, k: number) =>
                        v && (
                            <Item
                                key={k}
                                onClick={(e: any) => {
                                    handleSelect(e, v, k);
                                }}
                                data-disabled={typeof option !== "undefined" && (v[keyIndex] === option || v[keyName] === option || v === option)}
                            >
                                <>
                                    {typeof v[imgName] !== "undefined" && v[imgName] !== "" ? (
                                        <>
                                            <Image src={v[imgName]} width={0} height={0} alt={""} />
                                            <span title={typeof v[keyIndex] !== "undefined" ? v[keyIndex] : typeof v[keyName] !== "undefined" ? v[keyName] : v}>
                                                {typeof v[keyIndex] !== "undefined" ? v[keyIndex] : typeof v[keyName] !== "undefined" ? v[keyName] : v}
                                            </span>
                                        </>
                                    ) : v.icon !== "" && typeof v.icon !== "undefined" ? (
                                        <>
                                            <Elements.Icon icon={option?.icon} />
                                            <span title={typeof v[keyIndex] !== "undefined" ? v[keyIndex] : typeof v[keyName] !== "undefined" ? v[keyName] : v}>
                                                {typeof v[keyIndex] !== "undefined" ? v[keyIndex] : typeof v[keyName] !== "undefined" ? v[keyName] : v}
                                            </span>
                                        </>
                                    ) : (
                                        <span
                                            title={
                                                typeof v === "object"
                                                    ? typeof v[keyIndex] !== "undefined"
                                                        ? v[keyIndex]
                                                        : typeof v[keyName] !== "undefined"
                                                        ? v[keyName]
                                                        : v
                                                    : v
                                            }
                                        >
                                            {typeof v === "object"
                                                ? typeof v[keyIndex] !== "undefined"
                                                    ? v[keyIndex]
                                                    : typeof v[keyName] !== "undefined"
                                                    ? v[keyName]
                                                    : v
                                                : v}
                                        </span>
                                    )}
                                </>
                            </Item>
                        )
                )}
        </Options>
    );

    const [openSelect, closeSelect] = usePortal(
        <BottomSheet height={{ max: "60vh" }}>
            <Layouts.Col style={{ padding: "2em" }} gap={2}>
                <Layouts.Contents.InnerContent>{Select}</Layouts.Contents.InnerContent>
                <Controls.Button onClick={() => closeSelect()}>Close</Controls.Button>
            </Layouts.Col>
        </BottomSheet>
    );

    return (
        <Style
            $open={open}
            $height={height}
            $fit={fit}
            $scale={scale}
            $disabled={disabled}
            tabIndex={5}
            style={{ zIndex: open ? 10 : 1, ...props?.style }}
            onClick={() => (!props?.responsive ? handleOpen() : openSelect(Select))}
            onBlur={handleClose}
            title={props?.title}
            data-active={open}
            data-show={props?.show}
            data-hide={props?.hide}
        >
            <Option>
                <Item>
                    {form?.indexOf("more") === 0 ? (
                        <Controls.Button icon="more" />
                    ) : form?.indexOf("icon") === 0 ? (
                        <Controls.Button icon={option?.icon} />
                    ) : (
                        <>
                            {option && typeof option[imgName] !== "undefined" && <Image src={option[imgName]} width={0} height={0} alt={""} />}
                            <span
                                title={
                                    typeof option === "undefined"
                                        ? undefined
                                        : typeof option === "object"
                                        ? typeof option[keyIndex] !== "undefined"
                                            ? option[keyIndex]
                                            : typeof option[keyName] !== "undefined"
                                            ? option[keyName]
                                            : option
                                        : option
                                }
                            >
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
                            <Elements.Icon icon="chevron-down-small" />
                        </>
                    )}
                </Item>
            </Option>
            {!props?.responsive && Select}
        </Style>
    );
}
