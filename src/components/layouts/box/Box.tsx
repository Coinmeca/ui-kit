import Style from "./Box.styled";

export interface Box {
    style?: object;
    children?: any;
    padding?: number[];
    change?: string | false;
    fit?: boolean;
}

export default function Box(props: Box) {
    const initial = 4;
    const padding = {
        top: (props?.padding && props?.padding[0]) || initial,
        right: props?.padding && (props?.padding[1] || props?.padding[0]) || initial,
        bottom: (props?.padding && (props?.padding[2] || props?.padding[0])) || initial,
        left: (props?.padding && (props?.padding[3] || props?.padding[1] || props?.padding[0])) || initial,
    }

    return (
        <Style $change={props?.change || undefined} $padding={padding} $fit={props?.fit} style={props?.style}>
            {props.children}
        </Style>
    );
}
