import Style from "./Sidebar.styled";

export interface Sidebars {
    active?: boolean;
    width?: number;
    scale?: number;
    upper?: { active?: boolean; children?: Sidebar[] };
    lower?: { active?: boolean; children?: Sidebar[] };
}

export interface Sidebar {
    active?: boolean;
    children: any;
}

export default function Sidebar(props: Sidebars) {
    const active = props?.active || false;
    const scale = props?.scale || 1;
    const width = props?.width || 60;

    return (
        <Style $scale={scale} $active={active} $width={width}>
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
