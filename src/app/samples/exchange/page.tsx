"use client";
import { useState } from "react";
import { Root } from "lib/style";
import { Charts, Controls, Elements, Layouts } from "components";
import { Exchange } from "prefabs";
import { Capitalize, Format } from "lib/utils";
import useWindowSize from "hooks/useWindowSize";
import Data from "./data";

export default function Page() {
    const { windowSize } = useWindowSize();
    const { market, orderbook, info, orderbookView, chart } = Data();

    const [mobile, setMobile] = useState("orderbook");
    const [marketTab, setMarketTab] = useState("orderbook");
    const [option, setOption] = useState<"market" | "limit">("market");
    const [tab, setTab] = useState<string>(option);
    const [view, setView] = useState(0);

    return (
        <Layouts.Page>
            <Layouts.Box fit change={parseFloat(market?.change) > 0 ? "var(--green)" : (parseFloat(market?.change) < 0 && "var(--red)") || undefined}>
                <Layouts.Contents.InnerContent>
                    <Layouts.Row fix style={{ alignItems: "center" }}>
                        <Layouts.Row fix style={{ alignItems: "center" }} gap={2} fit>
                            <Elements.Avatar img={market.logo} scale={1.3334} />
                            <Layouts.Row responsive={"mobile"} gap={1} fit>
                                <Elements.Text size={2.5} height={1} style={{ marginRight: "1em" }} responsive={{ device: "mobile", size: 1.5 }}>
                                    {market?.base?.symbol?.toUpperCase()}
                                </Elements.Text>
                                <Elements.Text size={2.5} height={1} responsive={{ device: "mobile", size: 1.5 }}>
                                    {Capitalize(market?.base?.name || "")}
                                </Elements.Text>
                            </Layouts.Row>
                        </Layouts.Row>
                        <Layouts.Row fix align="right">
                            <Layouts.Row fix fit gap={1} style={{ alignItems: "center" }}>
                                <Elements.Icon scale={1.5} icon={"caret-up"} change />
                                <Elements.Text size={2.5} height={1} responsive={{ device: "mobile", size: 1.75 }} change>
                                    $ {Format(market.price, "currency", true)}
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
                                    <Layouts.Contents.SlideContent active={windowSize.width > Root.Device.Mobile ? true : mobile === "info"}>
                                        <Layouts.Row
                                            fix
                                            responsive="mobile"
                                            gap={windowSize.width > Root.Device.Mobile ? 4 : 1}
                                            style={{
                                                marginTop: "0.5em",
                                                alignItems: "center",
                                                ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                            }}
                                        >
                                            <Layouts.Col gap={0.5}>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Volume ({market?.base?.symbol?.toUpperCase()})
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(info?.volume_base, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Volume ({market?.quote?.symbol?.toUpperCase()})
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(info?.volume_quote, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </Layouts.Col>
                                            <Layouts.Col gap={0.5}>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Highest
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"green"}>
                                                        {Format(info?.high, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Lowest
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"red"}>
                                                        {Format(info?.low, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </Layouts.Col>
                                            <Layouts.Col gap={0.5}>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Change
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} change>
                                                        {Format(info?.volume_base, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Change Rate
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} change>
                                                        {Format(info?.volume_base, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </Layouts.Col>
                                            <Layouts.Col gap={0.5}>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Balance
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(info?.volume_base, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Using
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(info?.volume_base, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </Layouts.Col>
                                        </Layouts.Row>
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
                                                            option={orderbookView[view]}
                                                            options={orderbookView}
                                                            onClickItem={(e: any, k: any) => {
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
                                                            asks={orderbook.asks}
                                                            bids={orderbook.bids}
                                                            responsive={{ device: "mobile", vertical: false }}
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
                                        <Charts.Candle price={chart.price} volume={chart.volume} up={"BUY"} down={"SELL"} />
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
                                                    active: true,
                                                    children: (
                                                        <Layouts.Contents.InnerContent>
                                                            <Exchange.Containers.Order
                                                                base={market.base}
                                                                quote={market.quote}
                                                                price={market.price}
                                                                fee={0.1}
                                                                option={option}
                                                                responsive={Root.Device.Tablet}
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
            </Layouts.Box>
        </Layouts.Page>
    );
}
