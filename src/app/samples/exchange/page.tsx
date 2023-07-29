"use client";
import { useState } from "react";
import { Root } from "lib/style";
import { Charts, Controls, Elements, Layouts } from "components";
import { Asset, Exchange } from "prefabs";
import { Capitalize, Format } from "lib/utils";
import useWindowSize from "hooks/useWindowSize";
import { AnimatePresence } from "framer-motion";

import ExchangeData from "./data";
import AssetData from "../asset/data";

export default function Page() {
    const { windowSize } = useWindowSize();
    const DummyExchange = ExchangeData();
    const DummyAsset = AssetData();
    const props = {
        market: DummyExchange.market,
        info: DummyExchange.info,
        orderbook: DummyExchange.orderbook,
        orderbookView: DummyExchange.orderbookView,
        chart: DummyExchange.chart,
        assets: DummyAsset.assets,
        history: DummyAsset.history,
        responsive: windowSize.width <= Root.Device.Mobile,
    };

    const [mobile, setMobile] = useState("orderbook");
    const [marketTab, setMarketTab] = useState("orderbook");
    const [option, setOption] = useState<"market" | "limit">("market");
    const [tab, setTab] = useState<string>(option);
    const [view, setView] = useState(0);

    return (
        <Layouts.Page>
            <Layouts.Box fit change={parseFloat(props?.market?.change) > 0 ? "green" : parseFloat(props?.market?.change) < 0 && "red"}>
                <AnimatePresence mode="wait">
                    <Layouts.Contents.InnerContent>
                        <Layouts.Row fix style={{ alignItems: "center" }}>
                            <Layouts.Row fix style={{ alignItems: "center" }} gap={2} fit>
                                <Elements.Avatar img={props?.market?.logo} scale={1.3334} />
                                <Layouts.Row responsive={"mobile"} gap={1} fit>
                                    <Elements.Text size={2.5} height={1} style={{ marginRight: "1em" }} responsive={{ device: "mobile", size: 1.5 }}>
                                        {props?.market?.base?.symbol?.toUpperCase()}
                                    </Elements.Text>
                                    <Elements.Text size={2.5} height={1} responsive={{ device: "mobile", size: 1.5 }}>
                                        {Capitalize(props?.market?.base?.name || "")}
                                    </Elements.Text>
                                </Layouts.Row>
                            </Layouts.Row>
                            <Layouts.Row fix align="right">
                                <Layouts.Row fix fit gap={1} style={{ alignItems: "center" }}>
                                    <Elements.Icon scale={1.5} icon={"caret-up"} change />
                                    <Elements.Text size={2.5} height={1} responsive={{ device: "mobile", size: 1.75 }} change>
                                        $ {Format(props?.market?.price, "currency", true)}
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
                        <Layouts.Contents.GridContainer
                            fullsize
                            area={`'info info' 'book chart' 'book order'`}
                            width={`${windowSize.width < Root.Device.Tablet ? "0.75fr" : "40em"} 1fr`}
                            height={`max-content 1fr ${tab === "history" ? "minmax(34em, 1fr)" : "34em"}`}
                            gap={3}
                            responsive={[
                                {
                                    device: "mobile",
                                    area: `'up' 'down'`,
                                    width: "1fr",
                                    height: `1fr ${tab === "history" ? "minmax(34em, 1fr)" : "34em"}`,
                                    gap: { col: 0, row: 2 },
                                },
                            ]}
                            contents={[
                                {
                                    area: "info",
                                    children: (
                                        <Layouts.Contents.SlideContent active={windowSize.width > Root.Device.Mobile ? true : mobile === "info"}>
                                            <Exchange.Containers.Info
                                                base={props?.market?.base}
                                                quote={props?.market?.quote}
                                                info={props?.info}
                                                responsive={props?.responsive}
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
                                    area: "book",
                                    children: (
                                        <Layouts.Contents.SlideContent active={windowSize.width > Root.Device.Mobile ? true : mobile === "orderbook"}>
                                            <Layouts.Contents.InnerContent>
                                                <Layouts.Menu
                                                    menu={{
                                                        style: { overflow: "initial" },
                                                        children: [
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
                                                                        Trades
                                                                    </Controls.Tab>
                                                                </>,
                                                            ],
                                                            <>
                                                                <Controls.Dropdown
                                                                    option={props?.orderbookView[view]}
                                                                    options={props?.orderbookView}
                                                                    onClickItem={(e: any, v: any, k: any) => {
                                                                        setView(k);
                                                                    }}
                                                                />
                                                            </>,
                                                        ],
                                                    }}
                                                    hide={"mobile"}
                                                />
                                                <Layouts.Contents.TabContainer
                                                    contents={[
                                                        {
                                                            active: marketTab === "orderbook" || mobile === "orderbook",
                                                            style: { padding: 0 },
                                                            children: (
                                                                <Exchange.Containers.Orderbook
                                                                    view={view}
                                                                    asks={props?.orderbook?.asks}
                                                                    bids={props?.orderbook?.bids}
                                                                    base={props?.market?.base?.symbol}
                                                                    quote={props?.market?.quote?.symbol}
                                                                    responsive={{ device: "mobile", vertical: windowSize.width < 640 }}
                                                                    guidance
                                                                />
                                                            ),
                                                        },
                                                        {
                                                            active: marketTab === "history" || mobile === "history",
                                                            children: <></>,
                                                        },
                                                    ]}
                                                />
                                            </Layouts.Contents.InnerContent>
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
                                        <Layouts.Contents.SlideContent active={windowSize.width > Root.Device.Mobile ? true : mobile === "chart"}>
                                            <Layouts.Menu
                                                hide="mobile"
                                                menu={[
                                                    [
                                                        <>
                                                            <Controls.Tab disabled>Chart</Controls.Tab>
                                                        </>,
                                                    ],
                                                ]}
                                            />
                                            <Charts.Candle price={props?.chart?.price} volume={props?.chart?.volume} up={"BUY"} down={"SELL"} />
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
                                                        [
                                                            <>
                                                                <Controls.Tab
                                                                    active={tab === "market"}
                                                                    onClick={() => {
                                                                        setTab("market");
                                                                        setOption("market");
                                                                    }}
                                                                >
                                                                    Market
                                                                </Controls.Tab>
                                                            </>,
                                                            <>
                                                                <Controls.Tab
                                                                    active={tab === "limit"}
                                                                    onClick={() => {
                                                                        setTab("limit");
                                                                        setOption("limit");
                                                                    }}
                                                                >
                                                                    Limit
                                                                </Controls.Tab>
                                                            </>,
                                                        ],
                                                        [
                                                            <>
                                                                <Controls.Tab
                                                                    active={tab === "history"}
                                                                    onClick={() => {
                                                                        setTab("history");
                                                                    }}
                                                                >
                                                                    History
                                                                </Controls.Tab>
                                                            </>,
                                                        ],
                                                    ],
                                                ]}
                                            />
                                            <Layouts.Contents.TabContainer
                                                contents={[
                                                    {
                                                        active: tab !== "history",
                                                        children: (
                                                            <Exchange.Containers.Order
                                                                base={props?.market?.base}
                                                                quote={props?.market?.quote}
                                                                price={props?.market?.price}
                                                                fee={0.1}
                                                                option={option}
                                                                responsive={
                                                                    (windowSize.width <= Root.Device.Tablet && windowSize.width > 840) ||
                                                                    (windowSize.width <= Root.Device.Tablet && windowSize.width < 640)
                                                                }
                                                            />
                                                        ),
                                                    },
                                                    {
                                                        active: tab === "history",
                                                        children: (
                                                            <Layouts.Contents.InnerContent scroll>
                                                                <Asset.Containers.History
                                                                    assets={props?.assets}
                                                                    list={props?.history}
                                                                    responsive={props?.responsive}
                                                                />
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
                </AnimatePresence>
            </Layouts.Box>
        </Layouts.Page>
    );
}
