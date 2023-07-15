import Style from "./Panel.styled";

export interface Panel {
    children?: any;
    style?: object;
    color?: string;
    active?: boolean;
    fix?: boolean;
}

export default function Panel(props: Panel) {
    const active = typeof props?.active !== "undefined" ? props?.active : true;

    return (
        <Style $active={active} $color={props?.color} $fix={props?.fix} style={props?.style}>
            {props?.children}
        </Style>
    );
}
