import { Containers, Layouts } from "components";
import type { BG } from "components/layouts/bg/BG";
import type { Sidebars } from "components/containers/sidebars/Sidebar";
import Style from "./Frame.styled";

export interface Frame {
    children?: any;
    sidebar?: boolean;
    sidebars?: Sidebars;
    width?: number;
    background?: BG;
    align?: "left" | "right";
}

export default function Frame(props: Frame) {
    const sidebar = props?.sidebar || false;
    const width = props?.width || 480;
    const align = props?.align || "left";

    return (
        <>
            <Layouts.BG {...props?.background} />
            <Style $sidebar={sidebar} $width={width}>
                <header></header>
                <section>
                    {align === "left" && (
                        <Containers.Sidebar upper={props?.sidebars?.upper} lower={props?.sidebars?.lower} />
                    )}
                    <main>{props?.children}</main>
                    {align === "right" && (
                        <Containers.Sidebar upper={props?.sidebars?.upper} lower={props?.sidebars?.lower} />
                    )}
                </section>
            </Style>
        </>
    );
}
