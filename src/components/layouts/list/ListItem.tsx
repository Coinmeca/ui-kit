"use client";
import Style, { Col, Row } from "./ListItem.styled";

export interface ListItem {
    children?: any;
    gap?: number;
    style?: object;
    align?: "left" | "center" | "right";
    change?: string;
    onClick?: Function;
}

export default function ListItem(props: ListItem) {
    const ListRow = (data: any) => {
        return (
            data &&
            (typeof data !== "string" && data?.length > 0 ? (
                data?.map((v: any, k: number) => (
                    <Row key={k} title={v?.title} $gap={typeof v?.gap === "undefined" ? 1 : v?.gap} $change={v?.change} style={v?.style} data-row={v?.align}>
                        {ListCol(v?.children || v)}
                    </Row>
                ))
            ) : typeof data === "string" ? (
                <span>{data}</span>
            ) : (
                data
            ))
        );
    };

    const ListCol = (data: any) => {
        return (
            data &&
            (typeof data !== "string" && data?.length > 0 ? (
                data?.map((v: any, k: number) => (
                    <Col key={k} title={v?.title} $gap={typeof v?.gap === "undefined" ? 1 : v?.gap} $change={v?.change} style={v?.style} data-col={v?.align}>
                        {ListRow(v?.children || v)}
                    </Col>
                ))
            ) : typeof data === "string" ? (
                <span>{data}</span>
            ) : (
                data
            ))
        );
    };

    const handleClick = (e: any) => {
        if (typeof props?.onClick === "function") props?.onClick(props, e);
    };

    return (
        <Style
            $gap={props?.gap}
            $change={props?.change}
            style={props?.style}
            onClick={(e: any) => handleClick(e)}
            $event={typeof props?.onClick === "function" ? true : false}>
            {ListCol(props?.children)}
        </Style>
    );
}
