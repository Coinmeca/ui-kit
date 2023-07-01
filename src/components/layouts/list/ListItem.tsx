export interface TableRow {
    children?: any;
}

export default function TableRow(props: TableRow) {
    <div>{props?.children}</div>;
}
