"use client";

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
                data?.map((info: any, i: number) => {
                    return info?.style || info.children ? (
                        <Row key={i} style={ ...info?.style } data-row={info?.align}>
                            {ListCol(info?.children)}
                        </Row>
                    ) : (
                        <Row key={i}>{ListCol(info)}</Row>
                    );
                })
            ) : (
                <span>{data}</span>
            )
        );
    };

    const ListCol = (data: any) => {

        return data && (
            typeof data !== "string" && data?.length > 0 ? (
                data?.map((info: any, i: number) => {
                    return info?.style || info.children ? (
                        <Col key={i} style={info?.style} data-col={info?.align}>
                            {ListRow(info?.children)}
                        </Col>
                    ) : (
                        <Col key={i}>{ListRow(info)}</Col>
                    );
                })
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
