"use client";
import Style, { Row, Col } from "./ListItem.style";

export interface ListItem {
    children?: any;
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
                    <Row
                        key={k}
                        $change={v?.change}
                        style={v?.style}
                        data-row={v?.align}
                    >
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
                    <Col
                        key={k}
                        $change={v?.change}
                        style={v?.style}
                        data-col={v?.align}
                    >
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
            $change={props?.change}
            style={props?.style}
            onClick={(e: any) => handleClick(e)}
            $event={typeof props?.onClick === "function" ? true : false}
        >
            {ListCol(props?.children)}
        </Style>
    );
}
