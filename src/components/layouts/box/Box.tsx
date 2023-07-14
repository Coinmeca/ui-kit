import Style from "./Box.styled";

export interface Box {
    style?: object;
    children?: any;
    change?: string;
    fit?: boolean;
}

export default function Box(props: Box) {
    return (
        <Style $change={props?.change} $fit={props?.fit} style={props?.style}>
            {props.children}
        </Style>
    );
}
