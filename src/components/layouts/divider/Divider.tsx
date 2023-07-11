import Style from "./Divider.styled";

export interface Divider {
    vertical?: boolean;
    margin?: number;
    style?: object;
    children?: any;
    align?: "left" | "right";
    gap?: number;
    strong?: boolean;
    color?: string;
}

export default function Divider(props: Divider) {
    const vertical = props?.vertical || false;
    const margin = props?.margin || 0;
    const gap = props?.gap || 2;
    const strong = props?.strong || false;
    const color = props?.color || "white";

    return (
        <Style $color={color} $vertical={vertical} $margin={margin} $gap={gap} $strong={strong} style={props?.style}>
            {props?.children ? (
                <>
                    {props?.align !== "right" && <div />}
                    <span>{props?.children}</span>
                    {props?.align !== "left" && <div />}
                </>
            ) : (
                <div />
            )}
        </Style>
    );
}
