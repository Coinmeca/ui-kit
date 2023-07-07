import { ReactNode } from "react";
import Style from "./Sidebar.styled";

export interface Sidebars {
    active?: boolean;
    width?: number;
    upper?: { active?: boolean; children?: Sidebar[] };
    lower?: { active?: boolean; children?: Sidebar[] };
}

export interface Sidebar {
    active?: boolean;
    children: ReactNode;
}

export default function Sidebar(props: Sidebars) {
    const active = props?.active || false;
    const width = props?.width || 40;

    return (
        <Style $active={active} $width={width}>
            {props?.lower?.children && props?.lower?.children?.length > 0 && (
                <section data-active={props?.lower?.active}>
                    {props?.lower?.children?.map((v: any, k: number) => (
                        <section key={k} data-active={v?.active}>
                            {v.children}
                        </section>
                    ))}
                </section>
            )}
            {props?.upper?.children && props?.upper?.children?.length > 0 && (
                <section data-active={props?.upper?.active}>
                    {props?.upper?.children?.map((v: any, k: number) => (
                        <section key={k} data-active={v?.active}>
                            {v.children}
                        </section>
                    ))}
                </section>
            )}
        </Style>
    );
}
