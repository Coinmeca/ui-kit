import Style from "./InnerContent.styled";

export interface InnerContent {
    style?: object;
    children?: any;
}

export default function InnerContent(props: InnerContent) {
    return <Style style={props?.style}>{props?.children}</Style>;
}
