import Style from "./SlideContent.styled";

export interface SlideContent {
    name?: string;
    active?: boolean;
    children?: any;
}

export default function SlideContent(props: SlideContent) {
    const active = props?.active || false;

    return <Style data-active={active}>{props?.children}</Style>;
}
