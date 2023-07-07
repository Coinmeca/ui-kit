import { Containers, Layouts } from "components";
import type { BG } from "components/layouts/bg/BG";
import type { Sidebars } from "components/containers/sidebars/Sidebar";
import Style from "./Frame.styled";

export interface Frame {
    children?: any;
    sidebar?: Sidebars;
    width?: number;
    background?: BG;
    align?: "left" | "right";
}

export default function Frame(props: Frame) {
    const align = props?.align || "left";

    return (
        <>
            <Layouts.BG {...props?.background} />
            <Style>
                <header></header>
                <section>
                    {props?.align === "left" && props?.sidebar && <Containers.Sidebar {...props?.sidebar} />}
                    <main>{props?.children}</main>
                    {props?.align === "right" && props?.sidebar && <Containers.Sidebar {...props?.sidebar} />}
                </section>
            </Style>
        </>
    );
}
