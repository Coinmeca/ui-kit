import Style from "./Panel.styled";

export interface Panel {
    children?: any;
    style?: object;
    color?: string;
}

export default function Panel(props: Panel) {
    const color = props?.color || "black";

    return (
        <Style $color={color} style={props?.style}>
            {props?.children}
        </Style>
    );
}
