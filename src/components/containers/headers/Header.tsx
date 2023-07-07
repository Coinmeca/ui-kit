import { Controls, Elements, Layouts } from "components";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Style, { Logo, Nav, Menu, Side } from "./Header.styled";

export interface Header {
    logo?: Logo;
    menu?: Menu[];
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
                    </Layouts.Row>
                    <Layouts.Row gap={0} fit>
                        <Controls.Button icon={{ icon: "bell", count: 1 }} fit />
                        <Controls.Button icon={"sidebar"} fit />
                        <Controls.Button icon={"gear"} fit />
                    </Layouts.Row>
                </Layouts.Row>
                {props?.side && (
                    <Side $scale={scale} $width={side}>
                        <Layouts.Row>{props?.side?.children}</Layouts.Row>
                    </Side>
                )}
            </Layouts.Row>
        </Style>
    );
}
