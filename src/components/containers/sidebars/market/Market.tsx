"use client";

import { Fragment } from "react";
import Style, { Row, Col } from "./Market.style";

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
                data?.map((info: any, i:number) => 
                    <Row key={i} style={ ...info?.style } data-row={info?.align}>
                        {ListCol(info?.children || info)}
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
                data?.map((info: any, i: number) => (
                    <Col key={i} style={data?.style} data-col={data?.align}>
                        {ListRow(info?.children || info)}
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
        <Style style={props?.style} onClick={(e) => onClick(e)} $event={typeof props?.onClick === "function" ? true : false}>
            {ListRow(props?.children)}
        </Style>
    );
}
