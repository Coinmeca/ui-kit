import Style from "./Row.styled";

export interface Row {
    children?: any;
    style?: object;
    gap?: number;
    change?: string | false;
    align?: "left" | "center" | "right" | "stretch";
    show?: "desktop" | "laptop" | "tablet" | "mobile";
    hide?: "desktop" | "laptop" | "tablet" | "mobile";
    responsive?: "desktop" | "laptop" | "tablet" | "mobile";
    reverse?: boolean;
    fit?: boolean;
    fix?: boolean;
}

export default function Row(props: Row) {
    const gap = props?.gap === 0 ? 0 : props?.gap || 4;
    const align = props?.align || "left";
    const fit = props?.fit || false;
    const reverse = props?.reverse || false;
    const fix = props?.fix || false;

    return (
        <Style style={props?.style} $gap={gap} $change={props?.change || undefined} $fit={fit} $responsive={props?.responsive} $reverse={reverse} $fix={fix} data-row={align} data-show={props?.show} data-hide={props?.hide}>
            {props.children}
        </Style>
    );
}
