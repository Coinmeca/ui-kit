import Style from "./Table.styled";
import TableItem from "./TableItem";

export interface List {
    list?: any;
    noData: any;
}

export default function Table(props: List) {
    return <Style>{props?.list && (typeof props?.list !== "string" && props?.list?.length > 0 ? props?.list?.map((v: any, i: number) => <TableItem key={i} {...v} />) : <div>{props?.noData}</div>)}</Style>;
}
