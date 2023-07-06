import Style from "./Table.styled";
import TableItem from "./TableItem";

export interface List {
    list?: any;
    noData: string;
}

export default function Table(props: List) {
    return <Style>{props?.list && (typeof props?.list !== "string" && props?.list?.length > 0 ? props?.list?.map((data: any, i: number) => <TableItem key={i} {...data} />) : <div>{props?.noData}</div>)}</Style>;
}
