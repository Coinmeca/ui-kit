import { useContext } from "react";
import { Layouts } from "components";
import { Footers, Headers, Sidebar } from "containers";
import { Toast } from "containers/sidebars";
import type { BG } from "components/layouts/bg/BG";
import type { Header } from "containers/headers/Header";
import type { Sidebars } from "containers/sidebars/Sidebar";
import type { Toast as Toasts } from "containers/sidebars/toast/Toast";
import Style from "./Frame.styled";
import { Notification } from "contexts/NotificationCenter";

export interface Frame {
    children?: any;
    header?: Header;
    sidebar?: Sidebars;
    toast?: Toasts;
    side?: number;
    background?: BG;
    align?: "left" | "right";
}

export default function Frame(props: Frame) {
    const align = props?.align || "left";
    const width = props?.side || 60;

    return (
        <>
            <Layouts.BG {...props?.background} />
            <Style>
                {props?.header && <Headers.Header {...props?.header} side={{ ...props?.header?.side, width: width }} />}
                <section>
                    {align === "left" && props?.sidebar && <Sidebar {...props?.sidebar} width={width} />}
                    <main>
                        {props?.children}
                        <Footers.Footer />
                    </main>
                    {align === "right" && props?.sidebar && <Sidebar {...props?.sidebar} width={width} />}
                    {props?.toast && props?.toast?.list && props?.toast?.list?.length > 0 && <Toast {...props?.toast} width={width} align={align} />}
                </section>
            </Style>
        </>
    );
}
