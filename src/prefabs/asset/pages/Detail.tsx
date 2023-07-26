"use client";
import { useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Asset } from "prefabs";
import { Capitalize, Format } from "lib/utils";
import { Root } from "lib/style";
import { Token } from "types/web3";
import useWindowSize from "hooks/useWindowSize";

import Data from "app/samples/asset/data";
import * as HistoryData from "app/samples/asset/data";

export interface Detail {
    assets?: Token[];
    selectedAsset?: Token;
    onBack?: Function;
}

export default function Detail(props: Detail) {
    const { windowSize } = useWindowSize();
    const [mobile, setMobile] = useState("history");
    const responsive = windowSize.width <= Root.Device.Mobile;

    const { info } = Data();
    const { history } = HistoryData.default();

    const handleBack = (data: Token | undefined) => {
        if (typeof props?.onBack === "function") props?.onBack(data);
    };

    return (
        <>
            <Layouts.Contents.InnerContent>
                <Layouts.Row fix style={{ alignItems: "center" }}>
                    <Layouts.Row fix style={{ alignItems: "center" }} gap={2} fit>
                        <Controls.Button scale={0.875} icon={"chevron-left"} style={{ padding: "1em" }} onClick={() => handleBack(undefined)} />
                        <Elements.Avatar
                            size={4}
                            img={require(`/src/assets/coins/${props?.selectedAsset?.symbol?.toLocaleLowerCase() || "btc"}.png`)}
                            style={{ marginLeft: "-1em" }}
                        />
                        <Layouts.Row responsive={"mobile"} gap={1} fit>
                            <Elements.Text size={2.5} height={1} style={{ marginRight: "1em" }} responsive={{ device: "mobile", size: 1.5 }}>
                                {"ETH".toUpperCase()}
                            </Elements.Text>
                            <Elements.Text size={2.5} height={1} responsive={{ device: "mobile", size: 1.5 }}>
                                {Capitalize("Ethereum" || "")}
                            </Elements.Text>
                        </Layouts.Row>
                    </Layouts.Row>
                    <Layouts.Row fix align="right">
                        <Layouts.Row fix fit gap={1} style={{ alignItems: "center" }}>
                            <Elements.Text size={2.5} height={1} responsive={{ device: "mobile", size: 2 }} change>
                                $ {Format("1,567,851,378.516", "currency", true)}
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
                        <Controls.Tab active={mobile === "history"} onClick={() => setMobile("history")}>
                            History
                        </Controls.Tab>
                    </Layouts.Row>
                    <Layouts.Divider />
                </Layouts.Col>
                <Layouts.Contents.GridContainer
                    fullsize
                    area={`'info' 'history'`}
                    width={"1fr"}
                    height={"max-content 1fr"}
                    gap={3}
                    responsive={[
                        {
                            device: "mobile",
                            area: `'area'`,
                            width: "1fr",
                            height: "1fr max-content",
                            gap: { col: 0, row: 2 },
                        },
                    ]}
                    contents={[
                        {
                            area: "info",
                            children: (
                                <Layouts.Contents.SlideContent active={responsive ? mobile === "info" : true}>
                                    <Layouts.Row
                                        fix
                                        responsive="mobile"
                                        gap={responsive ? 1 : 4}
                                        style={{
                                            marginTop: "0.5em",
                                            alignItems: "center",
                                            ...(responsive && { height: "100%" }),
                                        }}
                                    >
                                        <Layouts.Col gap={0.5}>
                                            <Layouts.Row
                                                fix
                                                gap={1}
                                                style={{
                                                    alignItems: "center",
                                                    padding: "0.5em",
                                                    ...(responsive && { height: "100%" }),
                                                }}
                                            >
                                                <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                    Volume
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
                                                    ...(responsive && { height: "100%" }),
                                                }}
                                            >
                                                <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                    Volume
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
                                                    ...(responsive && { height: "100%" }),
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
                                                    ...(responsive && { height: "100%" }),
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
                                                    ...(responsive && { height: "100%" }),
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
                                                    ...(responsive && { height: "100%" }),
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
                                                    ...(responsive && { height: "100%" }),
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
                                                    ...(responsive && { height: "100%" }),
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
                                    area: "area",
                                },
                            ],
                        },
                        {
                            area: "history",
                            children: (
                                <Layouts.Contents.SlideContent active={responsive ? mobile === "history" : true}>
                                    <Layouts.Menu
                                        hide="mobile"
                                        menu={[
                                            [
                                                <>
                                                    <Controls.Tab disabled>History</Controls.Tab>
                                                </>,
                                            ],
                                        ]}
                                    />
                                    <Asset.Containers.History
                                        responsive={responsive}
                                        assets={props?.assets}
                                        history={history}
                                        noData={"There is no assets yet."}
                                    />
                                </Layouts.Contents.SlideContent>
                            ),
                            responsive: [
                                {
                                    device: "mobile",
                                    area: "area",
                                },
                            ],
                        },
                    ]}
                />
            </Layouts.Contents.InnerContent>
            <Layouts.Col gap={2}>
                <Controls.Button type={"solid"} color={"orange"}>
                    Deposit & Widthdraw
                </Controls.Button>
                <Controls.Button type={"solid"} color={"green"}>
                    Trades
                </Controls.Button>
            </Layouts.Col>
        </>
    );
}
