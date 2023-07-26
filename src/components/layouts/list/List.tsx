import Style from "./List.styled";
import ListItem from "./ListItem";

export interface List {
    list?: any;
    noData?: any;
}

export default function List(props: List) {
    const nodata = props?.noData || "There is no data.";

    return (
        <Style>
            {props?.list &&
                (typeof props?.list !== "string" && props?.list?.length > 0 ? (
                    props?.list?.map((data: any, i: number) => (
                        <ListItem key={i} {...(data?.children && data)}>
                            {data?.children ? data?.children : data}
                        </ListItem>
                    ))
                ) : nodata?.typeof$$ ? (
                    { nodata }
                ) : (
                    <div>{nodata}</div>
                ))}
        </Style>
    );
}
