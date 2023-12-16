import { useContext } from "react";
import { Layouts } from "components";
import { Headers, Sidebar } from "containers";
import { Toast } from "containers/sidebars";
import type { BG } from "components/layouts/bg/BG";
import type { Header } from "containers/headers/Header";
import type { Sidebars } from "containers/sidebars/Sidebar";
import Style from "./Frame.styled";
import { Notification } from "contexts/NotificationCenter";

export interface Frame {
    children?: any;
    header?: Header;
    sidebar?: Sidebars;
    side?: number;
    background?: BG;
    align?: "left" | "right";
}

export default function Frame(props: Frame) {
    const align = props?.align || "left";
    const width = props?.side || 60;

    const { toasts } = useContext(Notification);

    return (
        <>
            <Layouts.BG {...props?.background} />
            <Style>
                {props?.header && <Headers.Header {...props?.header} side={{ ...props?.header?.side, width: width }} />}
                <section>
                    {align === "left" && props?.sidebar && <Sidebar {...props?.sidebar} width={width} />}
                    <main>{props?.children}</main>
                    {align === "right" && props?.sidebar && <Sidebar {...props?.sidebar} width={width} />}
                    {toasts && toasts?.length > 0 && <Toast width={width} list={toasts} />}
                </section>
            </Style>
        </>
    );
}
