import { Layouts } from "components";
import Style from "./Frame.styled";

export interface Frame {
    children?: any;
    sidebar?: boolean;
    sidebars?: Array<{ name?: string; active?: boolean; children: any }>;
    width?: number;
    align?: "left" | "right";
}

export default function Frame(props: Frame) {
    const sidebar = props?.sidebar || false;
    const width = props?.width || 480;
    const align = props?.align || "left";

    return (
        <>
            <Layouts.BG
                img={{
                    src: 2,
                }}
            />
            <Style $sidebar={sidebar} $width={width}>
                <header></header>
                <section>
                    {align === "left" && props?.sidebars && props?.sidebars?.length > 0 && (
                        <aside>
                            {props?.sidebars?.map((v: any, k: any) => (
                                <div key={k}>{v.name}</div>
                            ))}
                        </aside>
                    )}
                    <main>{props?.children}</main>
                    {align === "right" && props?.sidebars && props?.sidebars?.length > 0 && (
                        <aside>
                            {props?.sidebars?.map((v: any, k: any) => (
                                <div key={k}>{v.name}</div>
                            ))}
                        </aside>
                    )}
                </section>
            </Style>
        </>
    );
}
