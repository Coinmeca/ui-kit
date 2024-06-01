import { Layouts } from "components";
import { MutableRefObject } from "react";
import Style from "./Page.styled";

export interface Content {
    children?: any;
    style?: object;
    scroll?: boolean;
    active?: boolean;
    fallback?: any;
    reference?: MutableRefObject<any>;
}

export default function Page(props: Content) {
    return (
        <>
            {props?.fallback && <Layouts.Panel style={{ position: "absolute" }}>{props?.fallback}</Layouts.Panel>}
            <Style ref={props?.reference} $scroll={props?.scroll} $active={props?.active} style={props?.style}>
                {props?.children}
            </Style>
        </>
    );
}
