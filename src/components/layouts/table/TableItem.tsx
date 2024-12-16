"use client";

import Style, { Row, Cell } from "./TableItem.styled";

export interface ListItem {
    children?: any;
    style?: object;
    align?: "left" | "center" | "right";
    change?: string;
    active?: boolean;
    onClick?: Function;
}

export default function TableItem(props: ListItem) {
    const TableRow = (data: any) => {
        return (
            data &&
            ((typeof data !== "string" || typeof data !== "number") && data?.length > 0 ? (
                data?.map((info: any, i: number) => (
                    <Row key={i} $change={info?.change} style={info?.style} data-row={info?.align}>
                        {TableCell(info?.children || info)}
                    </Row>
                ))
            ) : typeof data === "object" && data?.children ? (
                <span data-col={data?.align} {...data}>
                    {TableCell(data?.children)}
                </span>
            ) : (
                <span data-row={data?.align}>{data}</span>
            ))
        );
    };

    const TableCell = (data: any) => {
        return (
            data &&
            (typeof data !== "string" && data?.length > 0 ? (
                data?.map((info: any, i: number) => (
                    <Cell key={i} $change={info?.change} style={data?.style} data-col={info?.align}>
                        {TableRow(info?.children || info)}
                    </Cell>
                ))
            ) : typeof data === "object" && data?.children ? (
                <span data-col={data?.align} {...data}>
                    {TableRow(data?.children)}
                </span>
            ) : (
                <span data-col={data?.align}>{data}</span>
            ))
        );
    };

    const handleClick = (e: any) => {
        if (typeof props?.onClick === "function") props?.onClick(props, e);
    };

    return (
        <Style
            $change={props?.change}
            $event={typeof props?.onClick === "function" ? true : false}
            onClick={(e: any) => handleClick(e)}
            style={props?.style}
            data-active={props?.active}>
            {TableCell(props?.children)}
        </Style>
    );
}
