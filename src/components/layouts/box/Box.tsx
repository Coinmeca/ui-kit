import Style from "./Box.styled";

export interface Box {
    className?: string;
    style?: object;
    children?: any;
}

export default function Box(props: Box) {
    return (
        <Style className={props?.className} style={props?.style}>
            {props.children}
        </Style>
    );
}
