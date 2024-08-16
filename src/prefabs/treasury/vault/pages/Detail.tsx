"use client";
import { Charts, Controls, Elements, Layouts } from "components";
import type { Price, Volume } from "components/charts/lightweight/Candle";
import { Modal } from "containers";
import { usePortal, useWindowSize } from "hooks";
import { Root } from "lib/style";
import { capitalize, format } from "lib/utils";
import { Asset } from "prefabs";
import { Vault } from "prefabs/treasury";
import { useState } from "react";
import type { Token, VaultRecent } from "types";

export interface Detail {
    asset: Token;
    info?: any;
    charts?: {
        volume?: {
            value: number;
            time: number | string;
            type?: string;
        }[];
        value?: {
            value: number;
            time: string;
        }[];
        rate?: {
            price: Price[];
            volume?: Volume[];
        };
    };
    recent?: VaultRecent[];
    responsive?: boolean;
    onBack?: Function;
}

export default function Detail(props: Detail) {
    const { windowSize } = useWindowSize();

    const [mobile, setMobile] = useState("chart");
    const [tab, setTab] = useState("liquidity");
    const [chart, setChart] = useState("rate");
    const colorset = {
        DEPOSIT: "orange",
        WITHDRAW: "blue",
    };

    const handleDetailModal = (data: any) => {
        const date = (format(data?.time || 0, "date") as string).split(" ");
        return (
            <Modal title={"Transaction Detail"} onClose={closeDetail} close>
                <Layouts.Col gap={2} style={{ height: "100%" }}>
                    <Layouts.Contents.InnerContent>
                        <Layouts.Col gap={1}>
                            <Layouts.Row fix>
                                <Layouts.Col>
                                    <Elements.Text color={colorset[`${data?.type as "DEPOSIT" | "WITHDRAW"}`]} case={"capital"}>
                                        {data?.type}
                                    </Elements.Text>
                                </Layouts.Col>
                                <Layouts.Col gap={0}>
                                    <Elements.Text height={1.25} opacity={0.3} align={"right"}>
                                        {date[0]}
                                    </Elements.Text>
                                    <Elements.Text height={1.25} opacity={0.3} align={"right"}>
                                        {date[1]}
                                    </Elements.Text>
                                </Layouts.Col>
                            </Layouts.Row>
                            <Layouts.Divider />
                            <Layouts.Row fix>
                                <Elements.Text opacity={0.6} fit>
                                    Volume
                                </Elements.Text>
                                <Elements.Text align={"right"}>{data?.amount}</Elements.Text>
                                <Elements.Text opacity={0.6} style={{ maxWidth: "4em" }}>
                                    {props?.asset?.symbol}
                                </Elements.Text>
                            </Layouts.Row>
                            <Layouts.Row fix>
                                <Elements.Text opacity={0.6} fit>
                                    {data?.type === "DEPOSIT" ? "Earn" : "Burn"}
                                </Elements.Text>
                                <Elements.Text align={"right"}>{data?.meca}</Elements.Text>
                                <Elements.Text opacity={0.6} style={{ maxWidth: "4em" }}>
                                    MECA
                                </Elements.Text>
                            </Layouts.Row>
                            <Layouts.Divider />
                            <Layouts.Row fix>
                                <Elements.Text opacity={0.6} fit>
                                    Share
                                </Elements.Text>
                                <Elements.Text align={"right"}>{data?.share}</Elements.Text>
                                <Elements.Text opacity={0.6} style={{ maxWidth: "4em" }}>
                                    %
                                </Elements.Text>
                            </Layouts.Row>
                        </Layouts.Col>
                    </Layouts.Contents.InnerContent>
                    <Layouts.Row>
                        <Controls.Button onClick={closeDetail}>Close</Controls.Button>
                    </Layouts.Row>
                </Layouts.Col>
            </Modal>
        );
    };
    const [handleDetail, closeDetail] = usePortal(handleDetailModal);

    const recentFormatter = (data?: VaultRecent[]) => {
        return (
            data &&
            typeof data !== "string" &&
            data?.length > 0 &&
            data?.map((data: VaultRecent) => {
                return {
                    onClick: () => {
                        handleDetail(null, {
                            type: data?.type,
                            time: data?.time,
                            volume: data?.amount,
                            meca: data?.meca,
                            share: data?.share,
                        });
                    },
                    style: { padding: "2em" },
                    children: [
                        [
                            [
                                {
                                    gap: 0,
                                    style: { maxWidth: "max-content" },
                                    children: [
                                        <>
                                            <Elements.Text color={colorset[`${data?.type as "DEPOSIT" | "WITHDRAW"}`]} case={"capital"} fit>
                                                {capitalize(data?.type)}
                                            </Elements.Text>
                                        </>,
                                        <>
                                            <Layouts.Row gap={0.5} style={{ opacity: 0.6 }}>
                                                <Elements.Text
                                                    align={"right"}
                                                    style={{
                                                        fontFeatureSettings: "initial",
                                                    }}
                                                    fit>
                                                    {format(data?.share || 0, "currency", { unit: 9, limit: 12, fix: 3 })}
                                                </Elements.Text>
                                                <Elements.Text align={"left"} opacity={0.6} fit>
                                                    %
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </>,
                                    ],
                                },
                                {
                                    gap: 0,
                                    children: [
                                        {
                                            align: "right",
                                            children: (
                                                <>
                                                    <Elements.Text
                                                        align={"right"}
                                                        style={{
                                                            fontFeatureSettings: "initial",
                                                        }}>
                                                        {format(data?.amount || 0, "currency", { unit: 9, limit: 12, fix: 3 })}
                                                    </Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.6} case={"upper"} style={{ minWidth: "4em" }} fit>
                                                        {props?.asset?.symbol}
                                                    </Elements.Text>
                                                </>
                                            ),
                                        },
                                        {
                                            align: "right",
                                            style: { opacity: 0.3 },
                                            children: (
                                                <>
                                                    <Elements.Text
                                                        align={"right"}
                                                        style={{
                                                            fontFeatureSettings: "initial",
                                                        }}>
                                                        {format(data?.meca || 0, "currency", { unit: 9, limit: 12, fix: 3 })}
                                                    </Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.6} case={"upper"} style={{ minWidth: "4em" }} fit>
                                                        MECA
                                                    </Elements.Text>
                                                </>
                                            ),
                                        },
                                    ],
                                },
                            ],
                        ],
                    ],
                };
            })
        );
    };

    return (
        <>
            <Layouts.Contents.InnerContent>
                <Layouts.Row fix style={{ alignItems: "center" }}>
                    <Layouts.Row fix style={{ alignItems: "center" }} gap={2} fit>
                        <Controls.Button scale={0.875} icon={"chevron-left"} style={{ padding: "1em" }} onClick={props?.onBack} />
                        <Elements.Avatar
                            size={4}
                            img={require(`../../../../assets/coins/${props?.asset?.symbol?.toLocaleLowerCase()}.png`)}
                            style={{ marginLeft: "-1em" }}
                        />
                        <Layouts.Row responsive={"tablet"} gap={1} fit>
                            <Elements.Text size={2.5} height={1} case={"upper"} style={{ marginRight: "1em" }} responsive={{ device: "mobile", size: 1.5 }}>
                                {props?.asset?.symbol}
                            </Elements.Text>
                            <Elements.Text size={2.5} height={1} case={"capital"} responsive={{ device: "mobile", size: 1.5 }}>
                                {props?.asset?.name}
                            </Elements.Text>
                        </Layouts.Row>
                    </Layouts.Row>
                    <Layouts.Row fix align="right">
                        <Layouts.Row fix fit gap={1} style={{ alignItems: "center" }}>
                            <Elements.Icon scale={1.5} icon={"caret-up"} change />
                            <Elements.Text size={2.5} height={1} responsive={{ device: "mobile", size: 1.75 }} change>
                                {format(props?.info.per_token, "currency", { unit: 9, limit: 12, fix: 3 })}
                            </Elements.Text>
                        </Layouts.Row>
                    </Layouts.Row>
                </Layouts.Row>
                <Layouts.Divider style={{ marginTop: "1em" }} />
                <Layouts.Col show={"tablet"} gap={0}>
                    <Layouts.Row gap={1} fix>
                        <Controls.Tab active={mobile === "info"} onClick={() => setMobile("info")}>
                            Info
                        </Controls.Tab>
                        <Controls.Tab active={mobile === "chart"} onClick={() => setMobile("chart")}>
                            Chart
                        </Controls.Tab>
                        <Controls.Tab active={mobile === "recent"} onClick={() => setMobile("recent")}>
                            Recent
                        </Controls.Tab>
                    </Layouts.Row>
                    <Layouts.Divider />
                </Layouts.Col>
                <Layouts.Contents.GridContainer
                    fullsize
                    area={`'info info' 'recent chart' 'recent trade'`}
                    width={`${props?.responsive ? "0.75fr" : "40em"} 1fr`}
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
                                <Layouts.Contents.SlideContent active={props?.responsive ? mobile === "info" : true}>
                                    <Vault.Containers.Info asset={props?.asset} info={props?.info} responsive={props?.responsive} />
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
                                <Layouts.Contents.SlideContent active={props?.responsive ? mobile === "chart" : true}>
                                    <Layouts.Contents.InnerContent>
                                        <Layouts.Menu
                                            menu={[
                                                [
                                                    <>
                                                        <Controls.Tab active={chart === "rate"} onClick={() => setChart("rate")}>
                                                            Exchange Rate
                                                        </Controls.Tab>
                                                    </>,
                                                    <>
                                                        <Controls.Tab active={chart === "volume"} onClick={() => setChart("volume")}>
                                                            Volume
                                                        </Controls.Tab>
                                                    </>,
                                                    <>
                                                        <Controls.Tab active={chart === "value"} onClick={() => setChart("value")}>
                                                            Value
                                                        </Controls.Tab>
                                                    </>,
                                                ],
                                            ]}
                                        />
                                        <Layouts.Contents.TabContainer
                                            contents={[
                                                {
                                                    active: chart === "rate",
                                                    children: (
                                                        <Charts.LightWeight.Candle
                                                            price={props?.charts?.rate?.price}
                                                            volume={props?.charts?.rate?.volume}
                                                            up={"DEPOSIT"}
                                                            down={"WITHDRAW"}
                                                            // color={{ up: "255, 160, 0", down: "0,64,255" }}
                                                            fit
                                                        />
                                                    ),
                                                },
                                                {
                                                    active: chart === "volume",
                                                    children: (
                                                        <Charts.LightWeight.Histogram
                                                            data={props?.charts?.volume}
                                                            color={{
                                                                default: "0,64,255",
                                                                up: "255, 160, 0",
                                                                down: "0,64,255"
                                                            }}
                                                            format={(price: number | string) =>
                                                                format(price || 0, "currency", {
                                                                    limit: 4,
                                                                    fix: 3,
                                                                })
                                                            }
                                                            fit
                                                        />
                                                    ),
                                                },
                                                {
                                                    active: chart === "value",
                                                    children: (
                                                        <Charts.LightWeight.Area
                                                            data={props?.charts?.value}
                                                            up={"DEPOSIT"}
                                                            down={"WITHDRAW"}
                                                            color={{
                                                                default: "0,64,255",
                                                            }}
                                                            fit
                                                        />
                                                    ),
                                                },
                                            ]}
                                        />
                                    </Layouts.Contents.InnerContent>
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
                            area: "recent",
                            children: (
                                <Layouts.Contents.SlideContent active={props?.responsive ? mobile === "recent" : true}>
                                    <Layouts.Contents.InnerContent>
                                        <Layouts.Menu
                                            hide="tablet"
                                            menu={[
                                                [
                                                    <>
                                                        <Controls.Tab disabled>Recent</Controls.Tab>
                                                    </>,
                                                ],
                                            ]}
                                        />
                                        <Vault.Containers.Recent
                                            list={props?.recent}
                                            formatter={recentFormatter}
                                            fallback={"There is no history yet."}
                                            style={{ height: "100%" }}
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
                            area: "trade",
                            children: (
                                <Layouts.Contents.InnerContent>
                                    <Layouts.Menu
                                        menu={[
                                            [
                                                [
                                                    <>
                                                        <Controls.Tab
                                                            active={tab === "liquidity"}
                                                            onClick={() => {
                                                                setTab("liquidity");
                                                            }}>
                                                            Liquidity
                                                        </Controls.Tab>
                                                    </>,
                                                ],
                                                [
                                                    <>
                                                        <Controls.Tab
                                                            active={tab === "history"}
                                                            onClick={() => {
                                                                setTab("history");
                                                            }}>
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
                                                active: tab === "liquidity",
                                                children: (
                                                    <Vault.Containers.Trade
                                                        base={props?.asset}
                                                        quote={{
                                                            symbol: "MECA",
                                                            name: "Coinmeca",
                                                            decimals: 18,
                                                            address: "0x123456",
                                                        }}
                                                        price={props?.info?.token_per}
                                                        fee={0.1}
                                                        responsive={
                                                            (windowSize.width <= Root.Device.Tablet && windowSize.width > Root.Device.Mobile) ||
                                                            windowSize.width <= Root.Device.Mobile
                                                        }
                                                    />
                                                ),
                                            },
                                            {
                                                active: tab === "history",
                                                children: <Asset.Containers.History list={[]} responsive={props?.responsive} />,
                                            },
                                        ]}
                                    />
                                </Layouts.Contents.InnerContent>
                            ),
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
        </>
    );
}
