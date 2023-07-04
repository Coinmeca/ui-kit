import Style from "./Row.styled";

export interface Row {
    children?: any;
    gap?: number;
    align?: "left" | "center" | "right" | "stretch";
    fit?: boolean;
    responsive?: string;
    reverse?: boolean;
}

export default function Row(props: Row) {
    const gap = props?.gap || 4;
    const align = props?.align || "left";
    const fit = props?.fit || false;
    const reverse = props?.reverse || false;

    return (
        <Style $gap={gap} $fit={fit} $responsive={props?.responsive} $reverse={reverse} data-row={align}>
            {props.children}
        </Style>
    );
}
