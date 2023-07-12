import { Fragment, memo } from "react";

export interface GridContent {
    format?: any;
    area: string;
    style?: object;
    children?: any;
    props?: any;
    responsive?: {
        device: "desktop" | "laptop" | "tablet" | "mobile";
        area?: string;
    }[];
}

function GridContent(props: GridContent) {
    const Child = (props?.children?.children?.type !== Fragment && props.children?.children?.$$typeof && props?.children?.children?.type) || (props?.children?.type !== Fragment && props?.children?.$$typeof && props?.children?.type);
    const Content = Child ? (
        <Child {...{ ...(props?.children?.props || props?.children?.children?.props) }}>{props?.children?.children?.children || props?.children?.children}</Child>
    ) : (
        <div {...{ ...(props?.children?.props || props?.children?.children?.props) }}>{props?.children?.children || props?.children}</div>
    );

    const Format =
        (typeof props?.format === "function" &&
            props?.format({
                ...props?.props,
                children: Content?.props?.children || Content,
            })) ||
        (props?.format?.$$typeof && (props?.format?.type !== Fragment ? <props.format.type children={Content?.props?.children || Content} {...props?.props} /> : Content));

    if (Format) return <>{Format}</>;
    return <>{Content}</>;
}

export default memo(GridContent);
