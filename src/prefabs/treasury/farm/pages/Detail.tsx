"use client";
import { useState } from "react";
import { Charts, Controls, Elements, Layouts } from "components";
import { Modal } from "containers";
import { Asset } from "prefabs";
import { Farms } from "prefabs/treasury";
import { usePortal, useWindowSize } from "hooks";
import { Capitalize, Format } from "lib/utils";
import { Root } from "lib/style";
import type { Farm } from "types/web3";
import type { Stake as Data } from "types/history";

export interface Detail {
    farm: Farm;
    info?: any;
    charts?: {
        apr?: {
            value: number;
            time: string;
        }[];
        staking?: {
            value: number;
            time: string;
            type?: string;
        }[];
    };
    history?: Data[];
    responsive?: boolean;
    onBack?: Function;
}

export default function Detail(props: Detail) {
    const { windowSize } = useWindowSize();

    const [mobile, setMobile] = useState("chart");
    const [tab, setTab] = useState("staking");
    const [chart, setChart] = useState("apr");
    const colorset = {
        STAKING: "orange",
        UNSTAKING: "blue",
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
                                    <Elements.Text color={colorset[`${data?.type as "STAKING" | "UNSTAKING"}`]} case={"capital"}>
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
                                    Stake
                                </Elements.Text>
                                <Elements.Text align={"right"}>{data?.volume}</Elements.Text>
                                <Elements.Text opacity={0.6} style={{ maxWidth: "4em" }}>
                                    {props?.farm?.stake?.symbol}
                                </Elements.Text>
                            </Layouts.Row>
                            {/* <Layouts.Row fix>
                                <Elements.Text opacity={0.6} fit>
                                    {data?.type === "DEPOSIT" ? "Earn" : "Burn"}
                                </Elements.Text>
                                <Elements.Text align={"right"}>{data?.meca}</Elements.Text>
                                <Elements.Text opacity={0.6} style={{ maxWidth: "4em" }}>
                                    MECA
                                </Elements.Text>
                            </Layouts.Row> */}
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
                                            <Elements.Text color={colorset[`${data?.type as "STAKING" | "UNSTAKING"}`]} case={"capital"} fit>
                                                {Capitalize(data?.type)}
                                            </Elements.Text>
                                        </>,
                                        <>
                                            <Layouts.Row gap={0.5} style={{ opacity: 0.6 }}>
                                                <Elements.Text
                                                    align={"right"}
                                                    style={{
                                                        fontFeatureSettings: "initial",
                                                    }}
                                                    fit
                                                >
                                                    {Format(data?.share || 0, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                                            gap: 1,
                                            align: "right",
                                            children: (
                                                <>
                                                    <Elements.Text
                                                        align={"right"}
                                                        style={{
                                                            fontFeatureSettings: "initial",
                                                        }}
                                                    >
                                                        {Format(data?.volume || 0, "currency", { unit: 9, limit: 12, fix: 3 })}
                                                    </Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.6} case={"upper"} style={{ maxWidth: "4em" }} fit>
                                                        {props?.farm?.stake?.symbol}
                                                    </Elements.Text>
                                                </>
                                            ),
                                        },
                                        {
                                            gap: 1,
                                            align: "right",
                                            style: { opacity: 0.3 },
                                            children: (
                                                <>
                                                    <Elements.Text
                                                        align={"right"}
                                                        style={{
                                                            fontFeatureSettings: "initial",
                                                        }}
                                                    >
                                                        0{/* {Format(data?.meca || 0, "currency", { unit: 9, limit: 12, fix: 3 })} */}
                                                    </Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.6} case={"upper"} style={{ maxWidth: "4em" }} fit>
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
                            img={require(`../../../../assets/coins/${props?.farm?.stake?.symbol?.toLocaleLowerCase()}.png`)}
                            style={{ marginLeft: "-1em" }}
                        />
                        <Layouts.Row responsive={"mobile"} gap={1} fit>
                            <Elements.Text size={2.5} height={1} case={"upper"} style={{ marginRight: "1em" }} responsive={{ device: "mobile", size: 1.5 }}>
                                {props?.farm?.stake?.symbol}
                            </Elements.Text>
                            <Elements.Text size={2.5} height={1} case={"capital"} responsive={{ device: "mobile", size: 1.5 }}>
                                {props?.farm?.name}
                            </Elements.Text>
                        </Layouts.Row>
                    </Layouts.Row>
                    <Layouts.Row fix align="right">
                        <Layouts.Row fix fit gap={1} style={{ alignItems: "center" }}>
                            <Elements.Icon scale={1.5} icon={"caret-up"} change />
                            <Elements.Text size={2.5} height={1} responsive={{ device: "mobile", size: 1.75 }} change>
                                {Format(props?.info?.apr, "currency", { unit: 9, limit: 12, fix: 3 })} %
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
                    width={`${props?.responsive ? "0.75fr" : "40em"} 1fr`}
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
                                <Layouts.Contents.SlideContent active={props?.responsive ? mobile === "info" : true}>
                                    <Farms.Containers.Info farm={props?.farm} info={props?.info} responsive={props?.responsive} />
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
                                <Layouts.Contents.SlideContent active={props?.responsive ? mobile === "chart" : true}>
                                    <Layouts.Contents.InnerContent>
                                        <Layouts.Menu
                                            menu={[
                                                [
                                                    <>
                                                        <Controls.Tab active={chart === "apr"} onClick={() => setChart("apr")}>
                                                            APR
                                                        </Controls.Tab>
                                                    </>,
                                                    <>
                                                        <Controls.Tab active={chart === "volume"} onClick={() => setChart("volume")}>
                                                            Volume
                                                        </Controls.Tab>
                                                    </>,
                                                ],
                                            ]}
                                        />
                                        <Layouts.Contents.TabContainer
                                            contents={[
                                                {
                                                    active: chart === "apr",
                                                    children: (
                                                        <Charts.LightWeight.Area
                                                            data={props?.charts?.apr}
                                                            color={{
                                                                default: "0,64,255",
                                                            }}
                                                        />
                                                    ),
                                                },
                                                {
                                                    active: chart === "volume",
                                                    children: (
                                                        <Charts.LightWeight.Histogram
                                                            data={props?.charts?.staking}
                                                            up={"STAKING"}
                                                            down={"UNSTAKING"}
                                                            color={{
                                                                default: "0,64,255",
                                                                up: "255, 160, 0",
                                                                down: "0,64,255",
                                                            }}
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
                                    device: "mobile",
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
                                            hide="mobile"
                                            menu={[
                                                [
                                                    <>
                                                        <Controls.Tab disabled>Recent</Controls.Tab>
                                                    </>,
                                                ],
                                            ]}
                                        />
                                        <Farms.Containers.History
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
                                                            active={tab === "staking"}
                                                            onClick={() => {
                                                                setTab("staking");
                                                            }}
                                                        >
                                                            Staking
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
                                                active: tab === "staking",
                                                children: (
                                                    <Farms.Containers.Stake
                                                        asset={props?.farm?.stake!}
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
