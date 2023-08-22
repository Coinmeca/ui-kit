import { Layouts } from "components";
import type { List } from "components/layouts/list/List";

export interface History extends List {}

export default function History(props: History) {
    return (
        <Layouts.List
            list={props?.list}
            fallback={props?.fallback}
            style={{ height: "100%" }}
        />
    );
}
