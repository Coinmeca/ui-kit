interface Page {
    children?: any;
}

export default function Page(props: Page) {
    return <div>{props?.children}</div>;
}
