import { ReactNode } from "react";
import Style from "./Sidebar.styled";

export interface Sidebars {
    upper?: { active?: boolean; children?: Sidebar[]; }
    lower?: { active?: boolean; children?: Sidebar[]; }
}

export interface Sidebar {
    name?: string;
    active?: boolean;
    children: ReactNode;
}

export default function Sidebar(props: Sidebars) {

    return (
        <Style>
            {(props?.lower?.children && props?.lower?.children?.length > 0) && (
                <section data-active={props?.lower?.active}>
                    {props?.lower?.children?.map((v: any, k: number) => (
                        <section key={k} data-active={v?.active}>{v.children}</section>
                    ))}
                </section>
            )}
            {(props?.upper?.children && props?.upper?.children?.length > 0) && (
                <section data-active={props?.upper?.active}>
                    {props?.upper?.children?.map((v: any, k: number) => (
                        <section key={k} data-active={v?.active}>{v.children}</section>
                    ))}
                </section>
            )}
        </Style>
    )
}