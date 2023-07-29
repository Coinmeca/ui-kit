"use client";
import { useState } from "react";
import { Charts, Controls, Elements, Layouts } from "components";
import { Modal } from "containers";
import { Vault } from "prefabs/treasury";
import { Token } from "types/web3";
import { Trade as Data } from "types/history";
import { Root } from "lib/style";
import { Capitalize, Format } from "lib/utils";
import usePortal from "hooks/usePortal";
import useWindowSize from "hooks/useWindowSize";

export interface Detail {
    asset: Token;
    info?: any;
    charts?: {
        volume?: {
            value: number;
            time: number | string;
            type?: string;
        }[];
        tvl?: {
            value: number;
            time: number | string;
        }[];
    };
    history?: Data[];
    responsive?: boolean;
    onBack?: Function;
}

export function Detail(props: Detail) {
    const { windowSize } = useWindowSize();

    const [mobile, setMobile] = useState("chart");
    const [tab, setTab] = useState("liquidity");
    const colorset = {
        DEPOSIT: "orange",
        WITHDRAW: "blue",
    };

    const handleDetailModal = (data: any) => {
        const date = (Format(data?.time || 0, "date") as string).split(" ");
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
                                <Elements.Text align={"right"}>{data?.volume}</Elements.Text>
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

    const historyFormatter = (data?: Data[]) => {
        return (
            data &&
            typeof data !== "string" &&
            data?.length > 0 &&
            data?.map((data: Data) => {
                return {
                    onClick: () => {
                        handleDetail(null, {
                            type: data?.type,
                            time: data?.time,
                            volume: data?.volume,
                            meca: data?.meca,
                            share: data?.share,
                        });
                    },
                    style: { padding: "2em" },
                    children: [
                        [
                            [
                                {
                                    style: { gap: 0, maxWidth: "max-content" },
                                    children: [
                                        <>
                                            <Elements.Text color={colorset[`${data?.type as "DEPOSIT" | "WITHDRAW"}`]} case={"capital"} fit>
                                                {Capitalize(data?.type)}
                                            </Elements.Text>
                                        </>,
                                        <>
                                            <Layouts.Row gap={0.5} style={{ opacity: 0.6 }}>
                                                <Elements.Text align={"right"} style={{ fontFeatureSettings: "initial" }} fit>
                                                    {Format(data?.share || 0, "currency", true)}
                                                </Elements.Text>
                                                <Elements.Text align={"left"} opacity={0.6} fit>
                                                    %
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </>,
                                    ],
                                },
                                {
                                    style: { gap: 0 },
                                    children: [
                                        <>
                                            <Layouts.Row gap={1}>
                                                <Elements.Text align={"right"} style={{ fontFeatureSettings: "initial" }}>
                                                    {Format(data?.volume || 0, "currency", true)}
                                                </Elements.Text>
                                                <Elements.Text align={"left"} opacity={0.6} case={"upper"} style={{ maxWidth: "4em" }} fit>
                                                    {props?.asset?.symbol}
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </>,
                                        <>
                                            <Layouts.Row gap={1} style={{ opacity: 0.3 }}>
                                                <Elements.Text align={"right"} style={{ fontFeatureSettings: "initial" }}>
                                                    {Format(data?.meca || 0, "currency", true)}
                                                </Elements.Text>
                                                <Elements.Text align={"left"} opacity={0.6} case={"upper"} style={{ maxWidth: "4em" }} fit>
                                                    MECA
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </>,
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
                            img={require(`/src/assets/coins/${props?.asset?.symbol?.toLocaleLowerCase()}.png`)}
                            style={{ marginLeft: "-1em" }}
                        />
                        <Layouts.Row responsive={"mobile"} gap={1} fit>
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
                                {Format(props?.info.per_token, "currency", true)}
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
                    width={`${props?.responsive ? "40em" : "0.75fr"} 1fr`}
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
                                <Layouts.Contents.SlideContent active={props?.responsive ? true : mobile === "info"}>
                                    <Layouts.Contents.InnerContent
                                        scroll={windowSize.width > 840 || windowSize.width <= 640}
                                        style={{
                                            ...(windowSize.width <= 840 && windowSize.width > 640 && { flexDirection: "row" }),
                                        }}
                                    >
                                        <Layouts.Row
                                            fix
                                            responsive="mobile"
                                            gap={props?.responsive ? 4 : 1}
                                            style={{
                                                marginTop: "0.5em",
                                                alignItems: "center",
                                                ...(!props?.responsive && { height: "100%" }),
                                            }}
                                        >
                                            <Layouts.Col gap={0.5}>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(!props?.responsive && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Total Locked
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(props?.info?.tl, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(!props?.responsive && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Total Locked Change
                                                    </Elements.Text>
                                                    <Elements.Text
                                                        height={1}
                                                        align="right"
                                                        style={{ minWidth: "max-content" }}
                                                        color={props?.info?.change > 0 ? "green" : props?.info?.change < 0 && "red"}
                                                    >
                                                        {Format(props?.info?.tl_change, "currency", true)}
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
                                                        ...(!props?.responsive && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Total Value Locked
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        $ {Format(props?.info?.tvl, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(!props?.responsive && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Total Value Locked Change
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        $ {Format(props?.info?.tvl_change, "currency", true)}
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
                                                        ...(!props?.responsive && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Total Deposit
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(props?.info?.deposit, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(!props?.responsive && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Deposit (24H)
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(props?.info?.deposit_24h, "currency", true)}
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
                                                        ...(!props?.responsive && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Total Withdraw
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(props?.info?.withdraw, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(!props?.responsive && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Withdraw (24H)
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(props?.info?.withdraw_24h, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </Layouts.Col>
                                        </Layouts.Row>
                                        <Layouts.Divider margin={1} vertical={windowSize.width <= 840 && windowSize.width > 640} />
                                        <Layouts.Row
                                            fix
                                            responsive="mobile"
                                            gap={props?.responsive ? 4 : 1}
                                            style={{
                                                alignItems: "center",
                                                ...(!props?.responsive && { height: "100%" }),
                                            }}
                                        >
                                            <Layouts.Col gap={0.5}>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(!props?.responsive && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Weight
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(props?.info?.weight, "currency", true)} %
                                                    </Elements.Text>
                                                </Layouts.Row>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(!props?.responsive && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Weight Change
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(props?.info?.weight_change, "currency", true)} %
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
                                                        ...(!props?.responsive && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        {props?.asset?.symbol?.toLocaleUpperCase()} per MECA
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(props?.info?.token_per, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(!props?.responsive && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        MECA per {props?.asset?.symbol?.toLocaleUpperCase()}
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(props?.info?.per_token, "currency", true)}
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
                                                        ...(!props?.responsive && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Exchange Change
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(props?.info?.exchange_change, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(!props?.responsive && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Exchange Change Rate
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(props?.info?.exchange_change_rate, "currency", true)} %
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
                                                        ...(!props?.responsive && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Mint
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(props?.info?.earn, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                                <Layouts.Row
                                                    fix
                                                    gap={1}
                                                    style={{
                                                        alignItems: "center",
                                                        padding: "0.5em",
                                                        ...(!props?.responsive && { height: "100%" }),
                                                    }}
                                                >
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Burn
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(props?.info?.burn, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </Layouts.Col>
                                        </Layouts.Row>
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
                                <Layouts.Contents.SlideContent active={props?.responsive ? true : mobile === "chart"}>
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
                                    <Charts.Histogram
                                        data={props?.charts?.volume}
                                        up={"DEPOSIT"}
                                        down={"WITHDRAW"}
                                        color={{ default: "0,64,255", up: "255, 160, 0", down: "0,64,255" }}
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
                            area: "recent",
                            children: (
                                <Layouts.Contents.SlideContent active={props?.responsive ? true : mobile === "recent"}>
                                    <Layouts.Contents.InnerContent>
                                        <Layouts.Menu
                                            hide="mobile"
                                            menu={[
                                                [
                                                    <>
                                                        <Controls.Tab disabled>Recent</Controls.Tab>
                                                    </>,
                                                ],
                                            ]}
                                        />
                                        <Vault.Containers.History
                                            list={historyFormatter(props?.history)}
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
                                                            }}
                                                        >
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
                                                active: tab === "liquidity",
                                                children: (
                                                    <Vault.Containers.Trade
                                                        base={props?.asset}
                                                        quote={{ symbol: "MECA", name: "Coinmeca" }}
                                                        price={props?.info?.token_per}
                                                        fee={0.1}
                                                        responsive={
                                                            (windowSize.width <= Root.Device.Tablet && windowSize.width > 840) ||
                                                            (windowSize.width <= Root.Device.Tablet && windowSize.width < 640)
                                                        }
                                                    />
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
        </>
    );
}
