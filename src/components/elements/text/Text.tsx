import * as Texts from "./Text.styled";

export interface Text {
    children?: any;
    style?: object;
    type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "strong" | "p" | "desc";
    align?: "left" | "center" | "right";
    case?: "upper" | "lower" | "capital";
    size?: number;
    color?: string | false;
    change?: boolean;
    weight?: number | string;
    height?: number;
    opacity?: number;
    responsive?: Responsive;
    fit?: boolean;
    fix?: boolean;
}

export interface Responsive {
    style?: object;
    size?: number;
    weight?: number | string;
    align?: "left" | "center" | "right";
    height?: number;
    opacity?: number;
    device: "desktop" | "laptop" | "tablet" | "mobile";
}

export default function Text(props: Text) {
    const size = props?.size || 1.5;
    const weight = props?.weight || "bold";
    const height = props?.height || 1.5;
    const color = props?.color || "white";
    const opacity =
        props?.opacity && props?.opacity > 1 ? 1 : props?.opacity || 1;

    switch (props?.type) {
        case "h1":
            return (
                <Texts.H1
                    style={props?.style}
                    $color={color}
                    $change={props?.change}
                    $opacity={opacity}
                    $weight={weight}
                    $height={height}
                    $align={props?.align}
                    $case={props?.case}
                    $fit={props?.fit}
                    $fix={props?.fix}
                >
                    {props?.children}
                </Texts.H1>
            );
        case "h2":
            return (
                <Texts.H2
                    style={props?.style}
                    $color={color}
                    $change={props?.change}
                    $opacity={opacity}
                    $weight={weight}
                    $height={height}
                    $align={props?.align}
                    $case={props?.case}
                    $fit={props?.fit}
                    $fix={props?.fix}
                >
                    {props?.children}
                </Texts.H2>
            );
        case "h3":
            return (
                <Texts.H3
                    style={props?.style}
                    $color={color}
                    $change={props?.change}
                    $opacity={opacity}
                    $weight={weight}
                    $height={height}
                    $align={props?.align}
                    $case={props?.case}
                    $fit={props?.fit}
                    $fix={props?.fix}
                >
                    {props?.children}
                </Texts.H3>
            );
        case "h4":
            return (
                <Texts.H4
                    style={props?.style}
                    $color={color}
                    $change={props?.change}
                    $opacity={opacity}
                    $weight={weight}
                    $height={height}
                    $align={props?.align}
                    $case={props?.case}
                    $fit={props?.fit}
                    $fix={props?.fix}
                >
                    {props?.children}
                </Texts.H4>
            );
        case "h5":
            return (
                <Texts.H5
                    style={props?.style}
                    $color={color}
                    $change={props?.change}
                    $opacity={opacity}
                    $weight={weight}
                    $height={height}
                    $align={props?.align}
                    $case={props?.case}
                    $fit={props?.fit}
                    $fix={props?.fix}
                >
                    {props?.children}
                </Texts.H5>
            );
        case "h6":
            return (
                <Texts.H6
                    style={props?.style}
                    $color={color}
                    $change={props?.change}
                    $opacity={opacity}
                    $weight={weight}
                    $height={height}
                    $align={props?.align}
                    $case={props?.case}
                    $fit={props?.fit}
                    $fix={props?.fix}
                >
                    {props?.children}
                </Texts.H6>
            );
        case "strong":
            return (
                <Texts.Strong
                    style={props?.style}
                    $color={color}
                    $change={props?.change}
                    $opacity={opacity}
                    $weight={weight}
                    $height={height}
                    $align={props?.align}
                    $case={props?.case}
                    $fit={props?.fit}
                    $fix={props?.fix}
                >
                    {props?.children}
                </Texts.Strong>
            );
        case "p":
            return (
                <Texts.P
                    style={props?.style}
                    $color={color}
                    $change={props?.change}
                    $opacity={opacity}
                    $weight={props?.weight || "normal"}
                    $height={height}
                    $align={props?.align}
                    $case={props?.case}
                    $fit={props?.fit}
                    $fix={props?.fix}
                >
                    {props?.children}
                </Texts.P>
            );
        case "desc":
            return (
                <Texts.Desc
                    style={props?.style}
                    $color={color}
                    $change={props?.change}
                    $opacity={opacity}
                    $weight={props?.weight || "normal"}
                    $height={height}
                    $align={props?.align}
                    $case={props?.case}
                    $fit={props?.fit}
                    $fix={props?.fix}
                >
                    {props?.children}
                </Texts.Desc>
            );
        default:
            return (
                <Texts.Text
                    style={props?.style}
                    $size={size}
                    $color={color}
                    $change={props?.change}
                    $opacity={opacity}
                    $weight={weight}
                    $height={height}
                    $align={props?.align}
                    $case={props?.case}
                    $responsive={props?.responsive}
                    $fit={props?.fit}
                    $fix={props?.fix}
                >
                    {props?.children}
                </Texts.Text>
            );
    }
}
