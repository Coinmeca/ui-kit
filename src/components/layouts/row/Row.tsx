import Style from "./Row.styled";

export interface Row {
    children?: any;
    style?: object;
    gap?: number;
    align?: "left" | "center" | "right" | "stretch";
    fit?: boolean;
    responsive?: "desktop" | "laptop" | "tablet" | "mobile";
    reverse?: boolean;
    only?: boolean;
}

export default function Row(props: Row) {
    const gap = props?.gap === 0 ? 0 : props?.gap || 4;
    const align = props?.align || "left";
    const fit = props?.fit || false;
    const reverse = props?.reverse || false;
    const only = props?.only || false;

    return (
        <Style style={props?.style} $gap={gap} $fit={fit} $responsive={props?.responsive} $reverse={reverse} $only={only} data-row={align}>
            {props.children}
        </Style>
    );
}
