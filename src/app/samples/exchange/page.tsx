"use client";
import { Controls, Elements, Layouts } from "components";
import { Avatar } from "components/elements";
import { GridContainer } from "components/layouts/contents";
import { useState } from "react";

export default function Page() {
    const [tab, setTab] = useState("");
    const [mobile, setMobile] = useState("orderbook");

    const market = {
        logo: require("/src/assets/coins/eth.png"),
        symbol: "ETH",
        market: "ETH/DAI",
        price: "4,678.05",
        change: "23.12",
        volume: "73170731",
    };

    return (
        <Layouts.Page>
            <Layouts.Box fit change={parseFloat(market?.change) > 0 ? "var(--green)" : (parseFloat(market?.change) < 0 && "var(--red)") || undefined}>
                <Layouts.Contents.InnerContent>
                    <Layouts.Row only style={{ alignItems: "center" }}>
                        <Layouts.Row only style={{ alignItems: "center" }} gap={2} fit>
                            <Avatar img={market.logo} scale={1.3334} />
                            <Layouts.Row responsive={"tablet"} gap={1} fit>
                                <Elements.Text scale={2.5} height={1} style={{ marginRight: "1em" }} responsive={{ device: "tablet", scale: 1.5 }}>
                                    ETH
                                </Elements.Text>
                                <Elements.Text scale={2.5} height={1} responsive={{ device: "tablet", scale: 1.5 }}>
                                    Ethereum
                                </Elements.Text>
                            </Layouts.Row>
                        </Layouts.Row>
                        <Layouts.Row only align="right">
                            <Layouts.Row only fit gap={1} style={{ alignItems: "center" }}>
                                <Elements.Icon scale={1.5} icon={"caret-up"} style={{ maxHeight: "100%" }} change />
                                <Elements.Text scale={2.5} height={1} responsive={{ device: "tablet", scale: 2 }} change>
                                    $ 2,164
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
                        width={"384px 1fr"}
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
                                    <Layouts.Contents.SlideContent active={mobile === "orderbook"} style={{ background: "green" }}>
                                        Green
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
