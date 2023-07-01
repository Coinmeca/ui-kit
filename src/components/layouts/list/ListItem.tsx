"use client";

import Style from "./ListItem.style";

export interface ListItem {
    children?: any;
    onClick?: Function;
}

export default function ListItem(props: ListItem) {
    const Data = (data: any) => {
        return (
            data &&
            (typeof data !== "string" && data?.length > 0 ? (
                data?.map((info: any, i: any) => (
                    <div key={i} style={{ display: "table-cell", verticalAlign: "middle" }}>
                        {Data(info)}
                    </div>
                ))
            ) : (
                <>{data}</>
            ))
        );
    };

    const onClick = (e: any) => {
        if (typeof props?.onClick === "function") props?.onClick(e);
    };

    return (
        <Style onClick={(e) => onClick(e)} $event={typeof props?.onClick === "function" ? true : false}>
            {Data(props?.children)}
        </Style>
    );
}
