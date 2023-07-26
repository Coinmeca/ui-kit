import Style from "./Table.styled";
import TableItem from "./TableItem";

export interface List {
    list?: any;
    noData?: any;
}

export default function Table(props: List) {
    const nodata = props?.noData || "There is no data.";

    return (
        <Style>
            {props?.list &&
                (typeof props?.list !== "string" && props?.list?.length > 0 ? (
                    props?.list?.map((data: any, i: number) => (
                        <TableItem key={i} {...(data?.children && data)}>
                            {data?.children ? data?.children : data}
                        </TableItem>
                    ))
                ) : nodata?.typeof$$ ? (
                    { nodata }
                ) : (
                    <div>{nodata}</div>
                ))}
        </Style>
    );
}
