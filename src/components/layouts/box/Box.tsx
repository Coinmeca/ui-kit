import Style from "./Box.styled";

export interface Box {
    style?: object;
    children?: any;
    fit?: boolean;
}

export default function Box(props: Box) {
    return (
        <Style $fit={props?.fit} style={props?.style}>
            {props.children}
        </Style>
    );
}
