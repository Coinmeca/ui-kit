"use client";
import { Layouts } from "components";
import type { BG } from "components/layouts/bg/BG";
import { Footers, Headers, Sidebar } from "containers";
import type { Footer } from "containers/footers/Footer";
import type { Header } from "containers/headers/Header";
import { Toast } from "containers/sidebars";
import type { Sidebars } from "containers/sidebars/Sidebar";
import type { Toast as Toasts } from "containers/sidebars/toast/Toast";
import { useMemo } from "react";
import Style from "./Frame.styled";

export interface Frame {
    children?: any;
    header?: Header;
    sidebar?: Sidebars;
    footer?: Footer;
    toast?: Toasts;
    side?: number;
    background?: BG;
    direction?: "left" | "right";
    align?: "left" | "right";
}

export default function Frame(props: Frame) {
    const width = props?.side || 60;
    const align = props?.align || "left";
    const position = props?.direction === 'left' ? props?.align === 'left' ? 'right' : 'left' : props?.align || "left";

    const side = useMemo(() => (
        <>
            {props?.sidebar && <Sidebar {...props?.sidebar} width={width} align={position} />}
            {props?.toast && props?.toast?.list && props?.toast?.list?.length > 0 && (
                <Toast {...props?.toast} width={width} align={position} />
            )}
        </>
    ), [props?.sidebar, props?.toast])

    return (
        <>
            <Layouts.BG {...props?.background} />
            <Style $direction={props?.direction}>
                {props?.header && <Headers.Header {...props?.header} side={{ ...props?.header?.side, width: width }} />}
                <section>
                    {align === "left" && side}
                    <main>
                        {props?.children}
                        <Footers.Footer {...props?.footer} />
                        {/* {props?.footer && <Footers.Footer {...props?.footer} />} */}
                    </main>
                    {align === "right" && side}
                </section>
            </Style>
        </>
    );
}
