"use client";
import Coinmeca from "assets/coinmeca.svg";
import { animate, stagger } from "framer-motion";
import Link from "next/link";
import { cloneElement, isValidElement, useCallback, useEffect, useMemo, useState } from "react";
import { Layouts } from "components";
import { useWindowSize } from "hooks";
import { Root } from "lib/style";
import { Logo, Menu, MenuButton, Nav, Side, Style } from "./Header.styled";
import Image from "next/image";
import { CSSProperties } from "styled-components";

export interface Header {
    logo?: Logo | boolean;
    menu?: {
        active?: boolean;
        style?: object;
        children?: Menu[];
        onClick?: Function;
    };
    option?: {
        active?: boolean;
        style?: object;
        children?: any;
    };
    side?: Side;
    scale?: number;
    height?: number;
    color?: string;
    style?: CSSProperties & { children: CSSProperties & { children: CSSProperties & { children: CSSProperties } } };
}

export interface Logo {
    src?: string | Function | React.ReactElement;
    url?: string;
    width?: number;
    height?: number;
    title?: string;
    alt?: string;
    href?: string;
    style?: object;
}

export interface Menu {
    active?: boolean;
    name?: string;
    href?: string;
    onClick?: Function;
}

export interface Side {
    width?: number;
    active?: boolean;
    style?: object;
    children?: any;
}

export default function Header(props: Header) {
    const { windowSize } = useWindowSize();
    const scale = props?.scale || 1;
    const height = props?.height || 8;
    const color = props?.color || "white";

    const side = props?.side?.width || 60;

    const LogoImage = useCallback(() => {
        const _props =
            typeof props?.logo === "object"
                ? {
                      width: typeof props?.logo?.width === "number" ? props?.logo?.width : 0,
                      height: typeof props?.logo?.height === "number" ? props?.logo?.height : 0,
                      style: {
                          ...(typeof props?.logo?.width === "string" && { width: `${props?.logo?.width}` }),
                          ...(typeof props?.logo?.height === "string" && { height: `${props?.logo?.height}` }),
                          ...props?.logo?.style,
                      },
                      title: props?.logo?.title,
                      alt: props?.logo?.alt || "",
                  }
                : undefined;
        return (
            props?.logo &&
            (typeof props?.logo === "boolean" || !props?.logo?.src ? (
                <Coinmeca
                    height={"5em"}
                    style={props?.style}
                    title={typeof props?.logo === "object" ? props?.logo?.title : undefined}
                    alt={typeof props?.logo === "object" ? props?.logo?.alt : ""}
                />
            ) : typeof props?.logo?.src === "string" ? (
                <Image src={props?.logo?.src} {..._props!} />
            ) : isValidElement(props?.logo?.src) ? (
                cloneElement(props?.logo?.src, ...(_props as any))
            ) : typeof props?.logo?.src === "function" ? (
                props?.logo?.src(_props)
            ) : (
                props?.logo?.src
            ))
        );
    }, [props?.logo]);

    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        if (windowSize.width <= Root.Device.Tablet) {
            animate(
                "nav",
                mobileMenu ? { opacity: 1, transform: "translateY(0)" } : { opacity: 0, transform: "translateY(-15%)" },
                {
                    ease: "easeInOut",
                    duration: 0.3,
                    delay: mobileMenu ? stagger(0.05) : 0,
                },
            );
        } else {
            animate(
                "nav",
                { opacity: 1, transform: "translateX(0)" },
                {
                    ease: "easeInOut",
                    duration: 0.3,
                    delay: mobileMenu ? stagger(0.05) : 0,
                },
            );
        }
    }, [mobileMenu, windowSize.width]);

    useEffect(() => {
        if (typeof props?.menu?.active === "boolean") setMobileMenu(props?.menu?.active);
    }, [props?.menu?.active]);

    return (
        <Style $scale={scale} $color={color} $height={height} $side={side} style={props?.style}>
            <Layouts.Row gap={0} style={props?.style?.children}>
                <Layouts.Row style={props?.style?.children?.children}>
                    <Layouts.Row style={props?.style?.children?.children?.children}>
                        <MenuButton
                            $active={mobileMenu}
                            onClick={(e: any) => {
                                if (typeof props?.menu?.onClick === "function") props?.menu?.onClick(e);
                                setMobileMenu(!mobileMenu);
                            }}>
                            <div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </MenuButton>
                        {props?.logo && (
                            <Logo
                                href={typeof props?.logo === "object" ? props?.logo?.href : "/"}
                                style={typeof props?.logo === "object" ? props?.logo?.style : {}}>
                                <LogoImage />
                            </Logo>
                        )}
                        {props?.menu?.children && props?.menu?.children?.length > 0 && (
                            <Menu data-active={mobileMenu} onClick={() => setMobileMenu(false)}>
                                {props?.menu?.children?.map((v: Menu, k: number) => (
                                    <Nav
                                        key={k}
                                        $scale={scale}
                                        $color={color}
                                        data-active={v?.active}
                                        onClick={(e: any) => {
                                            if (typeof v?.onClick === "function") v?.onClick(e);
                                            setMobileMenu(false);
                                        }}>
                                        <Link href={v?.href || ""}>{v?.name}</Link>
                                    </Nav>
                                ))}
                            </Menu>
                        )}
                    </Layouts.Row>
                    {props?.option?.children && (
                        <Layouts.Row gap={0} data-active={props?.option?.active} style={props?.option?.style} fit>
                            {props?.option?.children}
                        </Layouts.Row>
                    )}
                </Layouts.Row>
                {props?.side?.children && (
                    <Side $scale={scale} $width={side} data-active={props?.side?.active} style={props?.side?.style}>
                        <Layouts.Row>{props?.side?.children}</Layouts.Row>
                    </Side>
                )}
            </Layouts.Row>
        </Style>
    );
}
