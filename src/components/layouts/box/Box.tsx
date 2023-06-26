import { Style } from "./Box.styled";

export interface Props {
    className?: string;
    style?: any;
    children?: any;
}

export default function Box(props: Props) {
    return (
        <Style className={props?.className} style={props?.style}>
            {props.children}
        </Style>
    );
}
