import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layouts } from "components";
import Style, { Logo, Nav, Menu, Side } from "./Header.styled";
import Coinmeca from "/src/assets/coinmeca.svg";

export interface Header {
    logo?: Logo;
    menu?: {
        active?: boolean;
        children?: Menu[];
    };
    option?: {
        active?: boolean;
        children?: any;
    };
    side?: Side;
    scale?: number;
    height?: number;
    color?: string;
}

export interface Logo {
    src?: string;
    url?: string;
    width?: number;
    height?: number;
    title?: string;
    alt?: string;
}

export interface Menu {
    name?: string;
    path?: string;
}

export interface Side {
    width?: number;
    active?: boolean;
    children?: any;
}

export default function Header(props: Header) {
    const path = usePathname();
    const scale = props?.scale || 1;
    const height = props?.height || 8;
    const color = props?.color || "white";

    const side = props?.side?.width || 60;

    return (
        <Style $scale={scale} $color={color} $height={height} $side={side}>
            <Layouts.Row gap={0}>
                <Layouts.Row>
                    <Layouts.Row>
                        {props?.logo && props?.logo?.src && (
                            <Logo>
                                <Coinmeca height={40} />
                                {/* <Image src={props?.logo?.src} width={props?.logo?.width} height={props?.logo?.height} title={props?.logo?.title} alt={props?.logo?.alt || ""} /> */}
                            </Logo>
                        )}
                        {props?.menu?.children && props?.menu?.children?.length > 0 && (
                            <Menu data-active={props?.menu?.active}>
                                {props?.menu?.children?.map((v: Menu, k: number) => (
                                    <Nav key={k} $scale={scale} $color={color} data-active={path.startsWith(v?.path || "")}>
                                        <Link href={v?.path || ""}>{v?.name}</Link>
                                    </Nav>
                                ))}
                            </Menu>
                        )}
                    </Layouts.Row>
                    {props?.option?.children && (
                        <Layouts.Row gap={0} fit data-active={props?.option?.active}>
                            {props?.option?.children}
                        </Layouts.Row>
                    )}
                </Layouts.Row>
                {props?.side?.children && (
                    <Side $scale={scale} $width={side} data-active={props?.side?.active}>
                        <Layouts.Row>{props?.side?.children}</Layouts.Row>
                    </Side>
                )}
            </Layouts.Row>
        </Style>
    );
}