"use client";
import { Controls, Elements, Layouts, Parts } from "components";
import { Avatar } from "components/elements";
import { GridContainer } from "components/layouts/contents";
import { useState } from "react";

export default function Page() {
    const [mobile, setMobile] = useState("orderbook");
    const [marketTab, setMarketTab] = useState("orderbook");

    const market = {
        logo: require("/src/assets/coins/eth.png"),
        base: {
            symbol: "ETH",
            name: "Ethereum",
            decimal: 18,
        },
        quote: {
            symbol: "DAI",
            name: "Dai",
            decimal: 18,
        },
        market: "ETH/DAI",
        price: "1510",
        change: "23.12",
        volume: "73170731",
    };

    const asks = [
        { price: 1530, balance: 100 },
        { price: 1529, balance: 500 },
        { price: 1528, balance: 700 },
        { price: 1527, balance: 800 },
        { price: 1526, balance: 600 },
        { price: 1525, balance: 300 },
        { price: 1524, balance: 200 },
        { price: 1523, balance: 400 },
        { price: 1522, balance: 100 },
        { price: 1521, balance: 50 },
        { price: 1519, balance: 600 },
        { price: 1518, balance: 700 },
        { price: 1517, balance: 1200 },
        { price: 1516, balance: 400 },
        { price: 1515, balance: 600 },
        { price: 1514, balance: 900 },
        { price: 1513, balance: 700 },
        { price: 1512, balance: 1200 },
        { price: 1511, balance: 800 },
    ];

    const bids = [
        { price: 1510, balance: 100 },
        { price: 1509, balance: 500 },
        { price: 1508, balance: 700 },
        { price: 1507, balance: 800 },
        { price: 1506, balance: 600 },
        { price: 1505, balance: 300 },
        { price: 1504, balance: 200 },
        { price: 1503, balance: 400 },
        { price: 1502, balance: 100 },
        { price: 1501, balance: 50 },
        { price: 1500, balance: 600 },
        { price: 1499, balance: 700 },
        { price: 1498, balance: 1200 },
        { price: 1497, balance: 400 },
        { price: 1496, balance: 600 },
        { price: 1495, balance: 900 },
        { price: 1494, balance: 700 },
        { price: 1493, balance: 1200 },
        { price: 1492, balance: 800 },
    ];

    return (
        <Layouts.Page>
            <Layouts.Box fit change={parseFloat(market?.change) > 0 ? "var(--green)" : (parseFloat(market?.change) < 0 && "var(--red)") || undefined}>
                <Layouts.Contents.InnerContent>
                    <Layouts.Row only style={{ alignItems: "center" }}>
                        <Layouts.Row only style={{ alignItems: "center" }} gap={2} fit>
                            <Avatar img={market.logo} scale={1.3334} />
                            <Layouts.Row responsive={"tablet"} gap={1} fit>
                                <Elements.Text scale={2.5} height={1} style={{ marginRight: "1em" }} responsive={{ device: "tablet", scale: 1.5 }}>
                                    {market.base.symbol}
                                </Elements.Text>
                                <Elements.Text scale={2.5} height={1} responsive={{ device: "tablet", scale: 1.5 }}>
                                    {market.base.name}
                                </Elements.Text>
                            </Layouts.Row>
                        </Layouts.Row>
                        <Layouts.Row only align="right">
                            <Layouts.Row only fit gap={1} style={{ alignItems: "center" }}>
                                <Elements.Icon scale={1.5} icon={"caret-up"} style={{ maxHeight: "100%" }} change />
                                <Elements.Text scale={2.5} height={1} responsive={{ device: "tablet", scale: 2 }} change>
                                    $ {market.price}
                                </Elements.Text>
                            </Layouts.Row>
                        </Layouts.Row>
                    </Layouts.Row>
                    <Layouts.Divider style={{ marginTop: "1em" }} />
                    <Layouts.Col show={"mobile"} gap={0}>
                        <Layouts.Row only>
                            <Controls.Tab active={mobile === "info"} onClick={() => setMobile("info")}>
                                Info
                            </Controls.Tab>
                            <Controls.Tab active={mobile === "orderbook"} onClick={() => setMobile("orderbook")}>
                                Orderbook
                            </Controls.Tab>
                            <Controls.Tab active={mobile === "chart"} onClick={() => setMobile("chart")}>
                                Chart
                            </Controls.Tab>
                        </Layouts.Row>
                        <Layouts.Divider />
                    </Layouts.Col>
                    <GridContainer
                        fullsize
                        area={`'info info' 'book chart' 'book order'`}
                        width={"320px 1fr"}
                        height={"max-content 1fr max-content"}
                        gap={3}
                        responsive={[
                            {
                                device: "tablet",
                                area: `'up' 'down'`,
                                width: "1fr",
                                height: "1fr max-content",
                                gap: { col: 0, row: 2 },
                            },
                        ]}
                        contents={[
                            {
                                area: "info",
                                children: (
                                    <Layouts.Contents.SlideContent active={mobile === "info"} style={{ background: "red", minHeight: 128 }}>
                                        Red
                                    </Layouts.Contents.SlideContent>
                                ),
                                responsive: [
                                    {
                                        device: "tablet",
                                        area: "up",
                                    },
                                ],
                            },
                            {
                                area: "book",
                                children: (
                                    <Layouts.Contents.SlideContent active={mobile === "orderbook"}>
                                        <Layouts.Menu
                                            menu={[
                                                [
                                                    <Controls.Tab
                                                        active={marketTab === "orderbook" || mobile === "orderbook"}
                                                        onClick={() => {
                                                            setMarketTab("orderbook");
                                                            setMobile("orderbook");
                                                        }}
                                                    >
                                                        Orderbook
                                                    </Controls.Tab>,
                                                    <Controls.Tab
                                                        active={marketTab === "history" || mobile === "history"}
                                                        onClick={() => {
                                                            setMarketTab("history");
                                                            setMobile("history");
                                                        }}
                                                    >
                                                        Market History
                                                    </Controls.Tab>,
                                                ],
                                            ]}
                                            hide={"tablet"}
                                        />
                                        <Layouts.Divider />
                                        <Layouts.Contents.TabContainer
                                            contents={[
                                                {
                                                    active: marketTab === "orderbook" || mobile === "orderbook",
                                                    children: <Parts.Orderbook asks={asks} bids={bids} responsive={"tablet"} />,
                                                },
                                                {
                                                    active: marketTab === "history" || mobile === "history",
                                                    children: <></>,
                                                },
                                            ]}
                                        />
                                    </Layouts.Contents.SlideContent>
                                ),
                                responsive: [
                                    {
                                        device: "tablet",
                                        area: "up",
                                    },
                                ],
                            },
                            {
                                area: "chart",
                                children: (
                                    <Layouts.Contents.SlideContent active={mobile === "chart"} style={{ background: "yellow" }}>
                                        Yellow
                                    </Layouts.Contents.SlideContent>
                                ),
                                responsive: [
                                    {
                                        device: "tablet",
                                        area: "up",
                                    },
                                ],
                            },
                            {
                                area: "order",
                                children: <div style={{ background: "purple", height: 288 }}></div>,
                                responsive: [
                                    {
                                        device: "tablet",
                                        area: "down",
                                    },
                                ],
                            },
                        ]}
                    />
                </Layouts.Contents.InnerContent>
            </Layouts.Box>
        </Layouts.Page>
    );
}
