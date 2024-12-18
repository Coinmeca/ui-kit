"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { BottomSheet } from "containers";
import { usePortal, usePositionTracker, useWindowSize } from "hooks";
import Style, { Item, Option, Options } from "./Dropdown.styled";

export interface DropdownOption {
    title?: string;
    alt?: string;
    value?: any;
    icon?: string;
    img?: string;
    [key: string]: any;
}

export interface Dropdown {
    theme?: "light" | "dark";
    style?: object;

    type?: string;
    title?: string;
    scale?: number;
    chevron?: boolean;

    height?: number;
    fit?: boolean;
    disabled?: any;
    placeholder?: string;

    options?: (string | DropdownOption)[] | { [key: string]: any };
    option?: string | DropdownOption;

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
    const dropdown: any = useRef(null);
    const dropbox: any = useRef(null);

    const theme = props?.theme === "light" || props?.theme === "dark" ? props?.theme : "light";
    const type = props?.type;
    const height = props?.height || 16;
    const fit = props?.fit || false;
    const scale = props?.scale || 1;
    const chevron = typeof props?.chevron === "boolean" ? props?.chevron : true;

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

    const position = usePositionTracker(dropbox);

    const handleSelect = (e: React.FormEvent, v: any, k: string | number) => {
        if (disabled) return;
        setOpen(false);
        closeSelectOnSheet();
        if (!props?.fix) setOption(v);
        // typeof v?.[keyIndex] !== "undefined" ? option = v?.[keyIndex] : typeof v?.[keyName] !== "undefined" ? option = v?.[keyName] : option = v;
        if (typeof v?.event === "function") v.event(e);
        if (typeof props?.onClickItem === "function") props?.onClickItem(e, v, k);
    };

    const handleOpen = (e?: any) => {
        if (disabled) return;
        setOpen(!open);
        openSelect(e);
        if (!option) return;
        if (typeof props?.onClick === "function") props?.onClick(e, option);
    };

    const handleClose = (e?: any) => {
        setOpen(false);
        if (typeof props?.onClick === "function") props?.onClick(e, option);
    };

    const calculatedPosition = useCallback(
        (e?: any) => {
            const size = dropdown?.current?.getBoundingClientRect();
            const horizon = windowSize.width < size?.left + position?.width;
            const vertical = windowSize.height < size?.bottom + position?.height;
            return {
                ...(vertical ? { bottom: windowSize?.height - size?.top } : { top: size?.bottom }),
                ...(horizon ? { right: windowSize?.width - size?.right } : { left: size?.left }),
            };
        },
        [windowSize, dropbox, position],
    );

    const Select = (visible: Visible, e?: any) => (
        <Options
            $chevron={chevron}
            ref={visible === "hidden" ? dropbox : null}
            onBlur={() => visible !== "hidden" && closeSelect()}
            style={{
                ...(visible === "popup"
                    ? {
                          ...(theme && {
                              "--white": theme === "light" ? "255,255,255" : "0,0,0",
                              "--black": theme === "light" ? "0,0,0" : "255,255,255",
                          }),
                          position: "fixed",
                          fontSize: `${scale}em`,
                          background: `rgba(var(--white), var(--o0075))`,
                          color: `rgb(var(--white))`,
                          width: type !== "more" && width && `${width / (8 * scale)}em`,
                          backdropFilter: "blur(4em)",
                          zIndex: 200,
                          ...calculatedPosition(),
                          ...(open ? { maxHeight: "100em", overflowY: "hidden" } : { maxHeight: 0, overflowY: "scroll" }),
                          ...(props?.style as any)?.options,
                      }
                    : visible === "hidden"
                    ? {
                          position: "absolute",
                          visibility: "hidden",
                          pointerEvents: "none",
                          width: "100%",
                          minWidth: "min-content",
                          height: 0,
                          opacity: 0,
                          ...(type === "more" && { position: "absolute" }),
                      }
                    : {
                          fontSize: `${scale}em`,
                      }),
                transition: "max-height .3s ease",
                // transitionProperty: "top, max-height",
                // transitionDuration: ".3s",
                // transitionTimingFunction: "ease-out",
            }}>
            {/* <div> */}
            {options &&
                options.length > 0 &&
                options.map(
                    (v: any, k: number) =>
                        v && (
                            <Item
                                key={k}
                                onClick={(e: any) => handleSelect(e, v, k)}
                                data-disabled={
                                    typeof option !== "undefined" &&
                                    (v?.[keyIndex] === option || v?.[keyName] === option || v === option)
                                }>
                                <>
                                    {typeof v?.[imgName] !== "undefined" && v?.[imgName] !== "" ? (
                                        <>
                                            <Image src={v?.[imgName]} width={0} height={0} alt={""} />
                                            <span
                                                title={
                                                    typeof v?.[keyIndex] !== "undefined"
                                                        ? v?.[keyIndex]
                                                        : typeof v?.[keyName] !== "undefined"
                                                        ? v?.[keyName]
                                                        : typeof v === "object"
                                                        ? v?.toString()
                                                        : v
                                                }>
                                                {typeof v?.[keyIndex] !== "undefined"
                                                    ? v?.[keyIndex]
                                                    : typeof v?.[keyName] !== "undefined"
                                                    ? v?.[keyName]
                                                    : typeof v === "object"
                                                    ? v?.toString()
                                                    : v}
                                            </span>
                                        </>
                                    ) : v.icon !== "" && typeof v.icon !== "undefined" ? (
                                        <>
                                            <Elements.Icon icon={v?.icon} />
                                            <span
                                                title={
                                                    typeof v?.[keyIndex] !== "undefined"
                                                        ? v?.[keyIndex]
                                                        : typeof v?.[keyName] !== "undefined"
                                                        ? v?.[keyName]
                                                        : typeof v === "object"
                                                        ? v?.toString()
                                                        : v
                                                }>
                                                {typeof v?.[keyIndex] !== "undefined"
                                                    ? v?.[keyIndex]
                                                    : typeof v?.[keyName] !== "undefined"
                                                    ? v?.[keyName]
                                                    : typeof v === "object"
                                                    ? v?.toString()
                                                    : v}
                                            </span>
                                        </>
                                    ) : (
                                        <span
                                            title={
                                                typeof v === "object"
                                                    ? typeof v?.[keyIndex] !== "undefined"
                                                        ? v?.[keyIndex]
                                                        : typeof v?.[keyName] !== "undefined"
                                                        ? v?.[keyName]
                                                        : typeof v === "object"
                                                        ? v?.toString()
                                                        : v
                                                    : typeof v === "object"
                                                    ? v?.toString()
                                                    : v
                                            }>
                                            {typeof v === "object"
                                                ? typeof v?.[keyIndex] !== "undefined"
                                                    ? v?.[keyIndex]
                                                    : typeof v?.[keyName] !== "undefined"
                                                    ? v?.[keyName]
                                                    : typeof v === "object"
                                                    ? v?.toString()
                                                    : v
                                                : typeof v === "object"
                                                ? v?.toString()
                                                : v}
                                        </span>
                                    )}
                                </>
                            </Item>
                        ),
                )}
            {/* </div> */}
        </Options>
    );

    const [openSelect, closeSelect] = usePortal((e?: any) => Select("popup", e));
    const [openSelectOnSheet, closeSelectOnSheet] = usePortal(
        <BottomSheet height={{ max: "60vh" }} onBlur={() => closeSelectOnSheet()} onClose={() => closeSelectOnSheet()} swipe>
            <Layouts.Col style={{ padding: "2em" }} gap={2}>
                <Layouts.Contents.InnerContent>{Select("sheet")}</Layouts.Contents.InnerContent>
                <Controls.Button scale={scale} onClick={() => closeSelectOnSheet()}>
                    Close
                </Controls.Button>
            </Layouts.Col>
        </BottomSheet>,
    );

    useEffect(() => {
        return () => closeSelect();
    }, []);

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

    return (
        <Style
            ref={dropdown}
            $open={open}
            $height={height}
            $fit={fit}
            $scale={scale}
            $disabled={disabled}
            $type={type}
            tabIndex={5}
            style={{
                zIndex: open ? 10 : 1,
                // maxWidth: width && `${width / 8}em`,
                ...props?.style,
            }}
            onClick={(e: any) => (!props?.responsive ? handleOpen(e) : openSelectOnSheet())}
            onBlur={handleClose}
            title={props?.title}
            data-active={open}
            data-show={props?.show}
            data-hide={props?.hide}>
            <Option $chevron={chevron} $type={type}>
                <Item>
                    {type === "more" ? (
                        <Controls.Button icon="more" />
                    ) : type === "icon" ? (
                        <Controls.Button icon={option?.icon} />
                    ) : (
                        <>
                            {option &&
                                (typeof option?.[imgName] === "string" ? (
                                    <Image src={option?.[imgName]} width={0} height={0} alt={""} />
                                ) : (
                                    typeof option?.icon === "string" && <Elements.Icon icon={option?.icon} />
                                ))}
                            <span
                                title={
                                    typeof option === "undefined"
                                        ? undefined
                                        : typeof option === "object"
                                        ? typeof option?.[keyIndex] !== "undefined"
                                            ? option?.[keyIndex]
                                            : typeof option?.[keyName] !== "undefined"
                                            ? option?.[keyName]
                                            : typeof option === "object"
                                            ? option?.toString()
                                            : option
                                        : typeof option?.alt === "undefined"
                                        ? typeof option === "object"
                                            ? option?.toString()
                                            : option
                                        : option?.title
                                }>
                                {typeof option === "undefined"
                                    ? placeholder
                                    : typeof option === "object"
                                    ? typeof option?.[keyIndex] !== "undefined"
                                        ? option?.[keyIndex]
                                        : typeof option?.[keyName] !== "undefined"
                                        ? option?.[keyName]
                                        : typeof option === "object"
                                        ? option?.toString()
                                        : option
                                    : typeof option === "object"
                                    ? option?.toString()
                                    : option}
                            </span>
                            {chevron && <Elements.Icon icon="chevron-down-small" />}
                        </>
                    )}
                </Item>
            </Option>
            {!props?.responsive && <>{Select("hidden")}</>}
        </Style>
    );
}
