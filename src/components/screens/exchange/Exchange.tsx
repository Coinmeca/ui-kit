import { useState } from "react";
import { Controls, Elements, Frames, Layouts } from "components";
import type { Frame } from "components/frames/Frame";

export interface Exchange {
    frames?: Frame;
    children?: any;
}

export default function Exchange(props: Exchange) {
    const [sidebarTab, setSidebarTab] = useState("exchange");

    const formatter = (data: any) => {
        return (
            data?.length > 0 &&
            data?.map((data: any) => ({
                children: [
                    [
                        [
                            {
                                style: { width: "max-content" },
                                children: [
                                    {
                                        style: { width: "max-content" },
                                        children: (
                                            <Elements.Avatar
                                                // length={8}
                                                size={3}
                                                img={data?.logo}
                                                // name={'0x16e39d21f7f3ab3dafabd12fc07f4fd4928fb47163e79bb879d0928ac34e817e'}
                                            />
                                        ),
                                    },
                                    [`${data?.symbol}`, `${data?.market}`],
                                ],
                            },
                        ],
                    ],
                    [
                        { align: "right", children: `$${data?.price}` },
                        { align: "right", children: `+${data?.change}` },
                    ],
                    [{ align: "right", children: data.volume }],
                ],
                onClick: (props: any) => alert(props.children),
            }))
        );
    };

    const markets = [
        {
            value: "All Markets",
        },
        {
            value: "USDT",
            img: "/src/assets/coins/eth.png",
        },
        {
            value: "ETH",
            img: "/src/assets/coins/eth.png",
        },
        {
            value: "USDC",
            img: "/src/assets/coins/eth.png",
        },
    ];
    const marketlist = [
        {
            logo: "/src/assets/coins/eth.png",
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: "/src/assets/coins/eth.png",
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
    ];

    const header = {
        color: "red",
        logo: {
            src: "/src/assets/coinmeca.svg",
            width: 128,
            height: 48,
        },
        menu: [
            {
                name: "Asset",
                path: "/asset",
            },
            {
                name: "Exchange",
                path: "/exchange",
            },
            {
                name: "Treasury",
                path: "/treasury",
            },
            {
                name: "Launchpad",
                path: "/launchpad",
            },
        ],
        side: {
            children: (
                <>
                    <Layouts.Row fit>
                        <Controls.Dropdown fit />
                        <Controls.Dropdown fit />
                    </Layouts.Row>
                    {/* <Controls.Button fit>Connect</Controls.Button> */}
                    <Controls.Button iconRight={"chevron-down-bold"} fit>
                        <Elements.Avatar length={8} size={3} display={4} name={"0x16e39d21f7f3ab3dafabd12fc07f4fd4928fb47163e79bb879d0928ac34e817e"} />
                    </Controls.Button>
                </>
            ),
        },
    };

    const sidebars = {
        active: true,
        align: "left",
        lower: {
            active: true,
            children: [
                {
                    children: (
                        <>
                            <Layouts.Row fit style={{ padding: "0.5em 1em" }} gap={0}>
                                <Controls.Tab active={sidebarTab === "exchange"} onClick={() => setSidebarTab("exchange")}>
                                    Exchange
                                </Controls.Tab>
                                <Controls.Tab active={sidebarTab === "alert"} onClick={() => setSidebarTab("alert")}>
                                    Alert
                                </Controls.Tab>
                                <Controls.Tab active={sidebarTab === "asset"} onClick={() => setSidebarTab("asset")}>
                                    Assets
                                </Controls.Tab>
                            </Layouts.Row>
                            <Controls.Input icon="search" dropdown={{ options: markets }} />
                            <Layouts.Contents.InnerContent>
                                <Layouts.Contents.SlideContainer
                                    contents={[
                                        {
                                            active: sidebarTab === "exchange",
                                            children: (
                                                <Layouts.Contents.InnerContent>
                                                    <Layouts.Row gap={1} style={{ padding: "1em" }} only>
                                                        <Layouts.Row gap={0} only>
                                                            <Controls.Tab iconLeft="sort-up">Symbol</Controls.Tab>
                                                            <Controls.Tab iconLeft="sort-up">Name</Controls.Tab>
                                                        </Layouts.Row>
                                                        <Layouts.Row gap={0} only>
                                                            <Controls.Tab iconLeft="sort-up">Price</Controls.Tab>
                                                            <Controls.Tab iconLeft="sort-up">Change</Controls.Tab>
                                                        </Layouts.Row>
                                                        <Layouts.Row gap={0} only>
                                                            <Controls.Tab iconLeft="sort-up">Volume</Controls.Tab>
                                                        </Layouts.Row>
                                                    </Layouts.Row>
                                                    <Layouts.Divider />
                                                    <Layouts.Table list={formatter(marketlist)} noData="There is no data." />
                                                </Layouts.Contents.InnerContent>
                                            ),
                                        },
                                        {
                                            active: sidebarTab === "alert",
                                            children: (
                                                <Layouts.Contents.InnerContent>
                                                    <Layouts.Row gap={1} style={{ padding: "1em" }} only>
                                                        <Layouts.Row gap={0} only>
                                                            <Controls.Tab iconLeft="sort-up">Symbol</Controls.Tab>
                                                            <Controls.Tab iconLeft="sort-up">Name</Controls.Tab>
                                                        </Layouts.Row>
                                                        <Layouts.Row gap={0} only>
                                                            <Controls.Tab iconLeft="sort-up">Price</Controls.Tab>
                                                            <Controls.Tab iconLeft="sort-up">Change</Controls.Tab>
                                                        </Layouts.Row>
                                                        <Layouts.Row gap={0} only>
                                                            <Controls.Tab iconLeft="sort-up">Volume</Controls.Tab>
                                                        </Layouts.Row>
                                                    </Layouts.Row>
                                                    <Layouts.Divider />
                                                    <Layouts.Table list={formatter(marketlist)} noData="There is no data." />
                                                </Layouts.Contents.InnerContent>
                                            ),
                                        },
                                        {
                                            active: sidebarTab === "asset",
                                            children: (
                                                <Layouts.Contents.InnerContent>
                                                    <Layouts.Row gap={1} style={{ padding: "1em" }} only>
                                                        <Layouts.Row gap={0} only>
                                                            <Controls.Tab iconLeft="sort-up">Symbol</Controls.Tab>
                                                            <Controls.Tab iconLeft="sort-up">Name</Controls.Tab>
                                                        </Layouts.Row>
                                                        <Layouts.Row gap={0} only>
                                                            <Controls.Tab iconLeft="sort-up">Price</Controls.Tab>
                                                            <Controls.Tab iconLeft="sort-up">Change</Controls.Tab>
                                                        </Layouts.Row>
                                                        <Layouts.Row gap={0} only>
                                                            <Controls.Tab iconLeft="sort-up">Volume</Controls.Tab>
                                                        </Layouts.Row>
                                                    </Layouts.Row>
                                                    <Layouts.Divider />
                                                    <Layouts.Table list={formatter(marketlist)} noData="There is no data." />
                                                </Layouts.Contents.InnerContent>
                                            ),
                                        },
                                    ]}
                                />
                            </Layouts.Contents.InnerContent>
                        </>
                    ),
                },
            ],
        },
    };

    return (
        <Frames.Frame header={header} sidebar={sidebars}>
            {props?.children}
        </Frames.Frame>
    );
    // return <Frames.Frame {...props?.frames}>{props?.children}</Frames.Frame>;
}
