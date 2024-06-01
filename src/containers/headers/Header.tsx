"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { animate, stagger } from "framer-motion";
import { Layouts } from "components";
import { useWindowSize } from "hooks";
import { Root } from "lib/style";
import { Style, Logo, Nav, MenuButton, Menu, Side } from "./Header.styled";
import Coinmeca from "assets/coinmeca.svg";

export interface Header {
    logo?: Logo;
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
    style?: object;
}

export interface Logo {
    src?: string;
    url?: string;
    width?: number;
    height?: number;
    title?: string;
    alt?: string;
    href?: string;
}

export interface Menu {
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
    const path = usePathname();
    const scale = props?.scale || 1;
    const height = props?.height || 8;
    const color = props?.color || "white";

    const side = props?.side?.width || 60;

    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        if (windowSize.width <= Root.Device.Tablet) {
            animate("nav", mobileMenu ? { opacity: 1, transform: "translateY(0)" } : { opacity: 0, transform: "translateY(-15%)" }, {
                ease: "easeInOut",
                duration: 0.3,
                delay: mobileMenu ? stagger(0.05) : 0,
            });
        } else {
            animate(
                "nav",
                { opacity: 1, transform: "translateX(0)" },
                {
                    ease: "easeInOut",
                    duration: 0.3,
                    delay: mobileMenu ? stagger(0.05) : 0,
                }
            );
        }
    }, [mobileMenu, windowSize.width]);

    return (
        <Style $scale={scale} $color={color} $height={height} $side={side} style={props?.style}>
            <Layouts.Row gap={0}>
                <Layouts.Row>
                    <Layouts.Row>
                        <MenuButton
                            $active={mobileMenu}
                            onClick={(e: any) => {
                                if (typeof props?.menu?.onClick === "function") props?.menu?.onClick(e);
                                setMobileMenu(!mobileMenu);
                            }}
                        >
                            <div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </MenuButton>
                        {props?.logo && props?.logo?.src && (
                            <Logo href={props?.logo?.href || "/"}>
                                <Coinmeca height={40} />
                                {/* <Image src={props?.logo?.src} width={props?.logo?.width} height={props?.logo?.height} title={props?.logo?.title} alt={props?.logo?.alt || ""} /> */}
                            </Logo>
                        )}
                        {props?.menu?.children && props?.menu?.children?.length > 0 && (
                            <Menu data-active={mobileMenu} onClick={() => setMobileMenu(false)}>
                                {props?.menu?.children?.map((v: Menu, k: number) => (
                                    <Nav
                                        key={k}
                                        $scale={scale}
                                        $color={color}
                                        data-active={path.startsWith(v?.href || "")}
                                        onClick={(e: any) => {
                                            if (typeof v?.onClick === "function") v?.onClick(e);
                                            setMobileMenu(false);
                                        }}
                                    >
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
