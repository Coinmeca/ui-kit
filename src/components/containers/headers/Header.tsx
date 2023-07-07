import { Layouts } from "components";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Style, { Logo, Nav, Menu } from "./Header.styled";

export interface Header {
    logo?: Logo;
    menu?: Menu[];
    scale?: number;
    color?: string;
    height?: number;
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

export default function Header(props: Header) {
    const path = usePathname();
    const scale = props?.scale || 1;
    const height = props?.height || 8;
    const color = props?.color || "white";

    return (
        <Style $scale={scale} $color={color} $height={height}>
            <Layouts.Row>
                <Layouts.Row align="left">
                    {props?.logo && props?.logo?.src && (
                        <Logo>
                            <Image src={props?.logo?.src} width={props?.logo?.width} height={props?.logo?.height} title={props?.logo?.title} alt={props?.logo?.alt || ""} />
                        </Logo>
                    )}
                    {props?.menu && props?.menu?.length > 0 && (
                        <Menu>
                            {props?.menu?.map((v: Menu, k: number) => (
                                <Nav key={k} $scale={scale} $color={color} data-active={path.startsWith(v?.path || "")}>
                                    <Link href={v?.path || ""}>{v?.name}</Link>
                                </Nav>
                            ))}
                        </Menu>
                    )}
                    <Layouts.Row></Layouts.Row>
                </Layouts.Row>
            </Layouts.Row>
        </Style>
    );
}
