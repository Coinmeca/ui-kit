import Style from "./Col.styled";

export interface Col {
    children?: any;
    gap?: number;
    align?: "left" | "center" | "right" | "stretch";
    fit?: boolean;
    response?: string;
    reverse?: boolean;
}

export default function Col(props: Col) {
    const gap = props?.gap || 4;
    const align = props?.align || "left";
    const fit = props?.fit || false;
    const reverse = props?.reverse || false;

    return (
        <Style $gap={gap} $fit={fit} $response={props?.response} $reverse={reverse} data-align={align}>
            {props.children}
        </Style>
    );
}
