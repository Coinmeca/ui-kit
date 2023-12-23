import Link from "next/link";
import { Elements, Layouts } from "components";
import { Style, Logo } from "./Footer.styled";
import Coinmeca from "assets/coinmeca.svg";

export interface Footer {
    logo?: Logo;
}

export interface Logo {
    src?: string;
    url?: string;
    width?: number;
    height?: number;
    title?: string;
    alt?: string;
}

export default function Footer(props: any) {
    const scale = 1;

    return (
        <Style>
            <Layouts.Row responsive="tablet">
                <Layouts.Col>
                    <Logo href="/">
                        <Coinmeca height={40} />
                        {/* <Image src={props?.logo?.src} width={props?.logo?.width} height={props?.logo?.height} title={props?.logo?.title} alt={props?.logo?.alt || ""} /> */}
                    </Logo>
                </Layouts.Col>
                <Layouts.Row style={{ padding: "2em" }} fit>
                    <Link href="/">
                        <Layouts.Row gap={0.5} fit>
                            <Elements.Icon icon={"bank"} />
                            <Elements.Text>Docs</Elements.Text>
                        </Layouts.Row>
                    </Link>
                    <Link href="/">
                        <Layouts.Row gap={0.5} fit>
                            <Elements.Icon icon={"bank"} />
                            <Elements.Text>Medium</Elements.Text>
                        </Layouts.Row>
                    </Link>
                    <Link href="/">
                        <Layouts.Row gap={0.5} fit>
                            <Elements.Icon icon={"bank"} />
                            <Elements.Text>Discord</Elements.Text>
                        </Layouts.Row>
                    </Link>
                    <Link href="/">
                        <Layouts.Row gap={0.5} fit>
                            <Elements.Icon icon={"bank"} />
                            <Elements.Text>Twitter</Elements.Text>
                        </Layouts.Row>
                    </Link>
                </Layouts.Row>
            </Layouts.Row>
        </Style>
    );
}
