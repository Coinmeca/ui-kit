import Style, { Lower, Upper } from "./Sidebar.styled";

export interface Sidebars {
    active?: boolean;
    width?: number;
    scale?: number;
    upper?: { active?: boolean; children?: Sidebar[]; onBlur?: Function };
    lower?: { active?: boolean; children?: Sidebar[]; onBlur?: Function };
    onBlur?: Function;
}

export interface Sidebar {
    active?: boolean;
    children: any;
}

export default function Sidebar(props: Sidebars) {
    const active = props?.active || false;
    const scale = props?.scale || 1;
    const width = props?.width || 60;

    const handleBlur = (e: any) => {
        if (props?.lower?.active && props?.lower?.onBlur) props?.lower?.onBlur(e);
        if (props?.upper?.active && props?.upper?.onBlur) props?.upper?.onBlur(e);
        if (props?.onBlur) props?.onBlur(e);
    };

    return (
        <Style tabIndex={10} $scale={scale} $active={active} $width={width} onBlur={(e: any) => handleBlur(e)}>
            {props?.lower?.children && props?.lower?.children?.length > 0 && (
                <Lower data-active={props?.lower?.active}>
                    {props?.lower?.children?.map((v: any, k: number) => (
                        <section key={k} data-active={v?.active}>
                            {v.children}
                        </section>
                    ))}
                </Lower>
            )}
            {props?.upper?.children && props?.upper?.children?.length > 0 && (
                <Upper data-active={props?.upper?.active}>
                    {props?.upper?.children?.map((v: any, k: number) => (
                        <section key={k} data-active={v?.active}>
                            {v.children}
                        </section>
                    ))}
                </Upper>
            )}
        </Style>
    );
}
