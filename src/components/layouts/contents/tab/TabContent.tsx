export interface TabContent {
    active?: boolean;
    children?: any;
}

export default function TabContent(props: TabContent) {
    const active = props?.active || true;

    return <div >{props?.children}</div>;
}
