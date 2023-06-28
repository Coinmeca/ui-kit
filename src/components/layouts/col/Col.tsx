import Style from "./Col.styled";

export interface Col {
    children?: any;
    gap?: number;
    align?: "start" | "center" | "end" | "stretch";
}

export default function Col(props: Col) {
    const gap = props?.gap || 4;
    const align = props?.align || "start";

    return (
        <Style $gap={gap} $align={align}>
            {props.children}
        </Style>
    );
}
