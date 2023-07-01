import Style from "./Content.styled";

export interface Content {
    className?: string;
    children?: any;
    style?: any;
}

export default function Content(props: Content) {
    return (
        <Style className={props?.className} style={props?.style}>
            {props?.children}
        </Style>
    );
}
