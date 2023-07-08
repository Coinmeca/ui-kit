import Style from "./Content.styled";

export interface Content {
    children?: any;
    style?: object;
}

export default function Content(props: Content) {
    return <Style style={props?.style}>{props?.children}</Style>;
}
