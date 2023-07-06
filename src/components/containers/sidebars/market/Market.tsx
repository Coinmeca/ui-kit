"use client";

import { Fragment } from "react";
import Style, { Row, Col } from "./Market.styled";

export interface ListItem {
    children?: any;
    style?: object;
    align?: "left" | "center" | "right";
    onClick?: Function;
}

export default function Market(props: ListItem) {
    const ListRow = (data: any) => {
        return data && (
            typeof data !== "string" && data?.length > 0 ? (
                data?.map((v: any, k: number) =>
                    <Row key={k} style={...v?.style} data-row={v?.align}>
                        {ListCol(v?.children || v)}
                    </Row>
                )
            ) : (
                <span>{data}</span>
            )
        );
    };

    const ListCol = (data: any) => {

        return data && (
            typeof data !== "string" && data?.length > 0 ? (
                data?.map((v: any, k: number) => (
                    <Col key={k} style={data?.style} data-col={data?.align}>
                        {ListRow(v?.children || v)}
                    </Col>
                ))
            ) : (
                <span>{data}</span>
            )
        );
    };

    const onClick = (e: any) => {
        if (typeof props?.onClick === "function") props?.onClick(props, e);
    };

    return (
        <Style style={props?.style} onClick={(e: any) => onClick(e)} $event={typeof props?.onClick === "function" ? true : false}>
            {ListRow(props?.children)}
        </Style>
    );
}
