import Style from "./List.styled";
import ListItem from "./ListItem";

export interface List {
    list?: any;
    noData: string;
}

export default function List(props: List) {
    return <Style>{props?.list && (typeof props?.list !== "string" && props?.list?.length > 0 ? props?.list?.map((data: any, i: any) => <ListItem key={i} {...data} />) : <div>{props?.noData}</div>)}</Style>;
}
