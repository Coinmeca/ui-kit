"use client";

import Style, { Row, Col } from "./ListItem.style";

export interface ListItem {
    children?: any;
    style?: any;
    align?: "left" | "center" | "right";
    onClick?: Function;
}

export default function ListItem(props: ListItem) {
    const ListRow = (data: any) => {
        const align = (align: string) => {
            switch (align) {
                case "center":
                    return { justifyContent: "center" };
                case "right":
                    return { justifyContent: "end" };
                case "left":
                    return { justifyContent: "start" };
            }
        };

        return data && typeof data !== "string" && data?.length > 0 ? (
            data?.map((info: any, i: any) => {
                return info?.style || info.children ? (
                    <Row key={i} style={{ ...align(info?.align), ...info?.style }}>
                        {ListCol(info?.children)}
                    </Row>
                ) : (
                    <Row key={i}>{ListCol(info)}</Row>
                );
            })
        ) : (
            <span>{data}</span>
        );
    };

    const ListCol = (data: any) => {
        const align = (align: string) => {
            switch (align) {
                case "center":
                    return { alignItems: "center" };
                case "right":
                    return { alignItems: "end" };
                case "left":
                    return { alignItems: "start" };
            }
        };

        return data && typeof data !== "string" && data?.length > 0 ? (
            data?.map((info: any, i: any) => {
                return info?.style || info.children ? (
                    <Col key={i} style={{ ...align(info?.align), ...info?.style }}>
                        {ListRow(info?.children)}
                    </Col>
                ) : (
                    <Col key={i}>{ListRow(info)}</Col>
                );
            })
        ) : (
            <span>{data}</span>
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
