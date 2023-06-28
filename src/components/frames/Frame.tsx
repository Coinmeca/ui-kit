interface Props {
    sidebar: boolean;
    sidebars: any;
}

export default function Frame(props: Props) {
    const sidebar = props?.sidebar || false;

    return (
        <>
            <header></header>
            <section>
                <main></main>
                {sidebar && <aside>{props?.sidebars && props?.sidebars?.map((v: any, k: any) => <div key={k}>{v}</div>)}</aside>}
            </section>
        </>
    );
}
