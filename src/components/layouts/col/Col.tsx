import Style from "./Col.styled";

export interface Col {
    children?: any;
    gap?: number;
    align?: "left" | "center" | "right" | "stretch";
    style?: object;
    fit?: boolean;
    responsive?: "desktop" | "laptop" | "tablet" | "mobile";
    reverse?: boolean;
}

export default function Col(props: Col) {
    const gap = props?.gap === 0 ? 0 : props?.gap || 4;
    const align = props?.align || "left";
    const fit = props?.fit || false;
    const reverse = props?.reverse || false;

    return (
        <Style style={props?.style} $gap={gap} $fit={fit} $responsive={props?.responsive} $reverse={reverse} data-col={align}>
            {props.children}
        </Style>
    );
}
