"use client";
import { useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Token } from "types/web3";
import { Format } from "lib/utils";
import { Root } from "lib/style";
import useWindowSize from "hooks/useWindowSize";

export interface Detail {
    info?: any;
    asset?: Token;
    onBack?: Function;
    responsive?: boolean;
}

export default function Detail(props: Detail) {
    const { windowSize } = useWindowSize();
    const [mobile, setMobile] = useState("chart");

    const handleBack = () => {
        if (typeof props?.onBack === "function") props?.onBack(undefined);
    };

    return (
        <Layouts.Box>
            <Layouts.Contents.InnerContent>
                <Layouts.Row fix style={{ alignItems: "center" }}>
                    <Layouts.Row fix style={{ alignItems: "center" }} gap={2} fit>
                        <Controls.Button scale={0.875} icon={"chevron-left"} style={{ padding: "1em" }} onClick={handleBack} />
                        <Elements.Avatar
                            size={4}
                            img={require(`/src/assets/coins/${props?.asset?.symbol?.toLocaleLowerCase() || "btc"}.png`)}
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
                        <Controls.Tab active={mobile === "chart"} onClick={() => setMobile("chart")}>
                            Chart
                        </Controls.Tab>
                        <Controls.Tab active={mobile === "history"} onClick={() => setMobile("history")}>
                            History
                        </Controls.Tab>
                    </Layouts.Row>
                    <Layouts.Divider />
                </Layouts.Col>
                <Layouts.Contents.GridContainer
                    fullsize
                    area={`'info info' 'history chart' 'history trade'`}
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
                                <Layouts.Contents.SlideContent active={props?.responsive ? mobile === "info" : true}>
                                    <Layouts.Row
                                        fix
                                        responsive="mobile"
                                        gap={props?.responsive ? 1 : 4}
                                        style={{
                                            marginTop: "0.5em",
                                            alignItems: "center",
                                            ...(props?.responsive && { height: "100%" }),
                                        }}
                                    >
                                        <Layouts.Col gap={0.5}>
                                            <Layouts.Row
                                                fix
                                                gap={1}
                                                style={{
                                                    alignItems: "center",
                                                    padding: "0.5em",
                                                    ...(props?.responsive && { height: "100%" }),
                                                }}
                                            >
                                                <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                    Total Buy
                                                </Elements.Text>
                                                <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                    {Format(props?.info?.volume_base, "currency", true)}
                                                </Elements.Text>
                                            </Layouts.Row>
                                            <Layouts.Row
                                                fix
                                                gap={1}
                                                style={{
                                                    alignItems: "center",
                                                    padding: "0.5em",
                                                    ...(props?.responsive && { height: "100%" }),
                                                }}
                                            >
                                                <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                    Total Sell
                                                </Elements.Text>
                                                <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                    {Format(props?.info?.volume_quote, "currency", true)}
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
                                                    ...(props?.responsive && { height: "100%" }),
                                                }}
                                            >
                                                <Elements.Text opacity={0.6} style={{ minWidth: "max-content" }}>
                                                    Total Avg Buy
                                                </Elements.Text>
                                                <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"green"}>
                                                    {Format(props?.info?.high, "currency", true)}
                                                </Elements.Text>
                                            </Layouts.Row>
                                            <Layouts.Row
                                                fix
                                                gap={1}
                                                style={{
                                                    alignItems: "center",
                                                    padding: "0.5em",
                                                    ...(props?.responsive && { height: "100%" }),
                                                }}
                                            >
                                                <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                    Total Avg Sell
                                                </Elements.Text>
                                                <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"red"}>
                                                    {Format(props?.info?.low, "currency", true)}
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
                                                    ...(props?.responsive && { height: "100%" }),
                                                }}
                                            >
                                                <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                    Total Avg Sell
                                                </Elements.Text>
                                                <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} change>
                                                    {Format(props?.info?.volume_base, "currency", true)}
                                                </Elements.Text>
                                            </Layouts.Row>
                                            <Layouts.Row
                                                fix
                                                gap={1}
                                                style={{
                                                    alignItems: "center",
                                                    padding: "0.5em",
                                                    ...(props?.responsive && { height: "100%" }),
                                                }}
                                            >
                                                <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                    Change Rate
                                                </Elements.Text>
                                                <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} change>
                                                    {Format(props?.info?.volume_base, "currency", true)}
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
                                                    ...(props?.responsive && { height: "100%" }),
                                                }}
                                            >
                                                <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                    Balance
                                                </Elements.Text>
                                                <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                    {Format(props?.info?.volume_base, "currency", true)}
                                                </Elements.Text>
                                            </Layouts.Row>
                                            <Layouts.Row
                                                fix
                                                gap={1}
                                                style={{
                                                    alignItems: "center",
                                                    padding: "0.5em",
                                                    ...(props?.responsive && { height: "100%" }),
                                                }}
                                            >
                                                <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                    Using
                                                </Elements.Text>
                                                <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                    {Format(props?.info?.volume_base, "currency", true)}
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
                            area: "history",
                            children: (
                                <Layouts.Contents.SlideContent active={props?.responsive ? mobile === "history" : true}>
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
                                    history area
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
                                    chart area
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
                            children: <>trade</>,
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
    );
}
