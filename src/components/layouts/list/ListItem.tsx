"use client";

import { Fragment } from "react";
import Style, { Row, Col } from "./ListItem.style";

export interface ListItem {
    children?: any;
    style?: object;
    align?: "left" | "center" | "right";
    onClick?: Function;
}

export default function ListItem(props: ListItem) {
    const ListRow = (data: any) => {
        return data && (
            typeof data !== "string" && data?.length > 0 ? (
                <Row style={ ...data?.style } data-row={data?.align}>
                    {data?.map((info: any, i:number) => 
                        <Fragment key={i}>
                            {ListCol(info?.children || info)}
                        </Fragment>
                    )}
                </Row>
            ) : (
                <span>{data}</span>
            )
        );
    };

    const ListCol = (data: any) => {

        return data && (
            typeof data !== "string" && data?.length > 0 ? (
                <Col style={data?.style} data-col={data?.align}>
                    {data?.map((info: any, i: number) => (
                        <Fragment key={i}>
                            {ListRow(info?.children || info)}
                        </Fragment>
                    ))}
                </Col>
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
