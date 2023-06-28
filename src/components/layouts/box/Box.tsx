import Style from "./Box.styled";

export interface Box {
    className?: string;
    style?: any;
    children?: any;
}

export default function Box(props: Box) {
    return (
        <Style className={props?.className} style={props?.style}>
            {props.children}
        </Style>
    );
}
