import Style from "./Row.styled";

export interface Row {
    children?: any;
    gap?: number;
    align?: "start" | "center" | "end" | "stretch";
}

export default function Row(props: Row) {
    const gap = props?.gap || 4;
    const align = props?.align || "start";

    return (
        <Style $gap={gap} $align={align}>
            {props.children}
        </Style>
    );
}
