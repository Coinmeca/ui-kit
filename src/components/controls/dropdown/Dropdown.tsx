"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { BottomSheet } from "containers";
import { useWindowSize, usePortal } from "hooks";
import Style, { Item, Option, Options } from "./Dropdown.styled";

export interface Dropdown {
    theme?: "light" | "dark";
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
    fix?: boolean;

    responsive?: boolean;
    show?: "desktop" | "laptop" | "tablet" | "mobile";
    hide?: "desktop" | "laptop" | "tablet" | "mobile";
}

type Visible = "popup" | "sheet" | "hidden";

export default function Dropdown(props: Dropdown) {
    const { windowSize } = useWindowSize();
    const dropdown: any = useRef();
    const dropbox: any = useRef();

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

    const width = dropdown?.current?.offsetWidth;
    // const width = dropdown?.current?.offsetWidth > dropbox?.current?.offsetWidth ? dropdown?.current?.offsetWidth : dropbox?.current?.offsetWidth;

    const handleSelect = (e: React.FormEvent, v: any, k: string | number) => {
        if (disabled) return;
        setOpen(false);
        closeSelectOnSheet();
        if (!props?.fix) setOption(v);
        // typeof v[keyIndex] !== "undefined" ? option = v[keyIndex] : typeof v[keyName] !== "undefined" ? option = v[keyName] : option = v;
        if (typeof v?.event === "function") v.event(e);
        if (typeof props?.onClickItem === "function") props?.onClickItem(e, v, k);
    };

    const handleOpen = (e?: any) => {
        if (disabled) return;
        setOpen(!open);
        openSelect();
        if (!option) return;
        if (typeof props?.onClick === "function") props?.onClick(e, option);
    };

    const handleClose = (e?: any) => {
        setOpen(false);
        if (typeof props?.onClick === "function") props?.onClick(e, option);
    };

    const position = () => {
        if (dropdown?.current && dropbox?.current) {
            const size = dropdown?.current?.getBoundingClientRect();
            const position = dropbox?.current?.getBoundingClientRect();
            const over = windowSize.height < size?.bottom + position?.height;
            return { ...(over ? { bottom: windowSize.height - size?.top } : { top: size?.bottom }), left: size?.x };
        }
    };

    const Select = (visible: Visible) => (
        <Options
            onBlur={() => visible === "sheet" && closeSelect()}
            style={{
                ...(visible === "popup"
                    ? {
                          ...(props?.theme && {
                              "--white": props?.theme === "light" ? "255,255,255" : "0,0,0",
                              "--black": props?.theme === "light" ? "0,0,0" : "255,255,255",
                          }),
                          position: "fixed",
                          fontSize: `${scale}em`,
                          background: (props?.style as any)?.options?.background || `rgba(var(--white), var(--o0075))`,
                          color: `rgb(var(--white))`,
                          width: width && `${width / (8 * scale)}em`,
                          backdropFilter: "blur(4em)",
                          transition: "max-height .3s ease",
                          zIndex: 200,
                          ...position(),
                          ...(open ? { maxHeight: "100em", overflowY: "hidden" } : { maxHeight: 0, overflowY: "scroll" }),
                      }
                    : visible === "hidden"
                    ? {
                          visibility: "hidden",
                          pointerEvents: "none",
                          opacity: 0,
                          height: 0,
                      }
                    : {
                          fontSize: `${scale}em`,
                      }),
            }}
        >
            <div ref={dropbox}>
                {options &&
                    options.length > 0 &&
                    options.map(
                        (v: any, k: number) =>
                            v && (
                                <Item
                                    key={k}
                                    onClick={(e: any) => handleSelect(e, v, k)}
                                    data-disabled={typeof option !== "undefined" && (v[keyIndex] === option || v[keyName] === option || v === option)}
                                >
                                    <>
                                        {typeof v[imgName] !== "undefined" && v[imgName] !== "" ? (
                                            <>
                                                <Image src={v[imgName]} width={0} height={0} alt={""} />
                                                <span
                                                    title={
                                                        typeof v[keyIndex] !== "undefined" ? v[keyIndex] : typeof v[keyName] !== "undefined" ? v[keyName] : v
                                                    }
                                                >
                                                    {typeof v[keyIndex] !== "undefined" ? v[keyIndex] : typeof v[keyName] !== "undefined" ? v[keyName] : v}
                                                </span>
                                            </>
                                        ) : v.icon !== "" && typeof v.icon !== "undefined" ? (
                                            <>
                                                <Elements.Icon icon={option?.icon} />
                                                <span
                                                    title={
                                                        typeof v[keyIndex] !== "undefined" ? v[keyIndex] : typeof v[keyName] !== "undefined" ? v[keyName] : v
                                                    }
                                                >
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
            </div>
        </Options>
    );
    const [openSelect, closeSelect] = usePortal(() => Select("popup"));

    const [openSelectOnSheet, closeSelectOnSheet] = usePortal(
        <BottomSheet height={{ max: "60vh" }} onBlur={() => closeSelectOnSheet()} onClose={() => closeSelectOnSheet()}>
            <Layouts.Col style={{ padding: "2em" }} gap={2}>
                <Layouts.Contents.InnerContent>{Select("sheet")}</Layouts.Contents.InnerContent>
                <Controls.Button scale={scale} onClick={() => closeSelectOnSheet()}>
                    Close
                </Controls.Button>
            </Layouts.Col>
        </BottomSheet>
    );

    useEffect(() => {
        setOption(props?.option);
    }, [props?.option]);

    useEffect(() => {
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
        } else {
            setOptions(options);
        }
    }, [props?.options, option, keyName]);

    useEffect(() => {
        return () => closeSelect();
    }, []);

    return (
        <Style
            ref={dropdown}
            $open={open}
            $height={height}
            $fit={fit}
            $scale={scale}
            $disabled={disabled}
            tabIndex={5}
            style={{
                zIndex: open ? 10 : 1,
                // maxWidth: width && `${width / 8}em`,
                ...props?.style,
            }}
            onClick={() => (!props?.responsive ? handleOpen() : openSelectOnSheet())}
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
                                        : typeof option?.alt === "undefined"
                                        ? option
                                        : option?.title
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
            {!props?.responsive && <>{Select("hidden")}</>}
        </Style>
    );
}
