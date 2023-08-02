import Style from "./Box.styled";

export interface Box {
    style?: object;
    children?: any;
    change?: string | false;
    fit?: boolean;
}

export default function Box(props: Box) {
    return (
        <Style $change={props?.change || undefined} $fit={props?.fit} style={props?.style}>
            {props.children}
        </Style>
    );
}
