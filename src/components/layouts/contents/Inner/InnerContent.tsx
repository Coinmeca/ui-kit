import Style from "./InnerContent.styled";

export interface InnerContent {
    style?: object;
    children?: any;
    scroll?: boolean;
}

export default function InnerContent(props: InnerContent) {
    const scroll = props?.scroll || false;
    return (
        <Style $scroll={scroll} style={props?.style}>
            {props?.children}
        </Style>
    );
}
