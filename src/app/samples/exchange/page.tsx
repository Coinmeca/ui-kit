"use client";
import { Controls, Elements, Layouts, Parts } from "components";
import { Avatar } from "components/elements";
import { GridContainer } from "components/layouts/contents";
import useWindowSize from "hooks/useWindowSize";
import { Root } from "lib/style";
import { Capitalize } from "lib/utils";
import { useState } from "react";
import Data from "./data";

export default function Page() {
    const windowSize = useWindowSize();
    const { market, orderbook } = Data();

    const [mobile, setMobile] = useState("orderbook");
    const [marketTab, setMarketTab] = useState("orderbook");

    return (
        <Layouts.Page>
            <Layouts.Box fit change={parseFloat(market?.change) > 0 ? "var(--green)" : (parseFloat(market?.change) < 0 && "var(--red)") || undefined}>
                <Layouts.Contents.InnerContent>
                    <Layouts.Row fix style={{ alignItems: "center" }}>
                        <Layouts.Row fix style={{ alignItems: "center" }} gap={2} fit>
                            <Avatar img={market.logo} scale={1.3334} />
                            <Layouts.Row responsive={"mobile"} gap={1} fit>
                                <Elements.Text scale={2.5} height={1} style={{ marginRight: "1em" }} responsive={{ device: "mobile", scale: 1.5 }}>
                                    {market?.base?.symbol?.toUpperCase()}
                                </Elements.Text>
                                <Elements.Text scale={2.5} height={1} responsive={{ device: "mobile", scale: 1.5 }}>
                                    {Capitalize(market?.base?.name || "")}
                                </Elements.Text>
                            </Layouts.Row>
                        </Layouts.Row>
                        <Layouts.Row fix align="right">
                            <Layouts.Row fix fit gap={1} style={{ alignItems: "center" }}>
                                <Elements.Icon scale={1.5} icon={"caret-up"} style={{ maxHeight: "100%" }} change />
                                <Elements.Text scale={2.5} height={1} responsive={{ device: "mobile", scale: 2 }} change>
                                    $ {market.price}
                                </Elements.Text>
                            </Layouts.Row>
                        </Layouts.Row>
                    </Layouts.Row>
                    <Layouts.Divider style={{ marginTop: "1em" }} />
                    <Layouts.Col show={"mobile"} gap={0}>
                        <Layouts.Row gap={1} fix>
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
                        width={`${windowSize.width < Root.Device.Tablet ? "0.75fr" : "320px"} 1fr`}
                        height={"max-content 1fr max-content"}
                        gap={3}
                        responsive={[
                            {
                                device: "mobile",
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
                                    <Layouts.Contents.SlideContent active={windowSize.width > Root.Device.Mobile ? true : mobile === "info"} style={{ background: "red", minHeight: 128 }}>
                                        Red
                                    </Layouts.Contents.SlideContent>
                                ),
                                responsive: [
                                    {
                                        device: "mobile",
                                        area: "up",
                                    },
                                ],
                            },
                            {
                                area: "book",
                                children: (
                                    <Layouts.Contents.SlideContent active={windowSize.width > Root.Device.Mobile ? true : mobile === "orderbook"}>
                                        <Layouts.Menu
                                            menu={[
                                                [
                                                    <>
                                                        <Controls.Tab
                                                            active={marketTab === "orderbook"}
                                                            onClick={() => {
                                                                setMarketTab("orderbook");
                                                                // setMobile("orderbook");
                                                            }}
                                                        >
                                                            Orderbook
                                                        </Controls.Tab>
                                                    </>,
                                                    <>
                                                        <Controls.Tab
                                                            active={marketTab === "history"}
                                                            onClick={() => {
                                                                setMarketTab("history");
                                                                // setMobile("history");
                                                            }}
                                                        >
                                                            Market History
                                                        </Controls.Tab>
                                                    </>,
                                                ],
                                            ]}
                                            hide={"mobile"}
                                        />
                                        <Layouts.Contents.TabContainer
                                            contents={[
                                                {
                                                    active: marketTab === "orderbook" || mobile === "orderbook",
                                                    style: { padding: 0 },
                                                    children: <Parts.Orderbook asks={orderbook.asks} bids={orderbook.bids} responsive={{ device: "mobile", vertical: false }} />,
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
                                        device: "mobile",
                                        area: "up",
                                    },
                                ],
                            },
                            {
                                area: "chart",
                                children: (
                                    <Layouts.Contents.SlideContent active={windowSize.width > Root.Device.Mobile ? true : mobile === "chart"} style={{ background: "yellow" }}>
                                        Yellow
                                    </Layouts.Contents.SlideContent>
                                ),
                                responsive: [
                                    {
                                        device: "mobile",
                                        area: "up",
                                    },
                                ],
                            },
                            {
                                area: "order",
                                children: (
                                    <Layouts.Contents.InnerContent>
                                        <Layouts.Menu
                                            menu={[
                                                [
                                                    <>
                                                        <Controls.Tab>Market</Controls.Tab>
                                                    </>,
                                                    <>
                                                        <Controls.Tab>Limit</Controls.Tab>
                                                    </>,
                                                ],
                                            ]}
                                        />
                                        <Layouts.Contents.TabContainer
                                            contents={[
                                                {
                                                    active: true,
                                                    children: (
                                                        <Layouts.Contents.InnerContent>
                                                            <Parts.OrderControl base={market.base} quote={market.quote} price={market.price} responsive={Root.Device.Tablet} />
                                                        </Layouts.Contents.InnerContent>
                                                    ),
                                                },
                                            ]}
                                        />
                                    </Layouts.Contents.InnerContent>
                                ),
                                responsive: [
                                    {
                                        device: "mobile",
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
