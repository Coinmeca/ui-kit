import Style from "./Box.styled";

export interface Box {
    style?: object;
    children?: any;
}

export default function Box(props: Box) {
    return <Style style={props?.style}>{props.children}</Style>;
}
