"use client";
import { useState } from "react";
import { Contents, Controls, Elements, Layouts } from "components";
import { Asset } from "prefabs";
import { Format } from "lib/utils";
import { Token } from "types/web3";
import { Order } from "types/history";
import { AnimatePresence } from "framer-motion";
import { Root } from "lib/style";
import useWindowSize from "hooks/useWindowSize";
import Image from "next/image";

export interface Detail {
    info?: any;
    assets?: Token[];
    asset?: Token;
    history?: Order[];
    positions?: any;
    onBack?: Function;
    responsive?: boolean;
}

export default function DetailNFT(props: Detail) {
    const { windowSize } = useWindowSize();

    const [mobile, setMobile] = useState("history");
    const [history, setHistory] = useState<Order[]>(props?.history || []);

    const handleBack = () => {
        if (typeof props?.onBack === "function") props?.onBack(undefined);
    };

    return (
        <AnimatePresence>
            {props?.asset ? (
                <>
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
                                    <Elements.Text
                                        size={2.5}
                                        height={1}
                                        case={"upper"}
                                        style={{ marginRight: "1em" }}
                                        responsive={{ device: "mobile", size: 1.5 }}
                                    >
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
                                <Controls.Tab active={mobile === "history"} onClick={() => setMobile("history")}>
                                    History
                                </Controls.Tab>
                                <Controls.Tab active={mobile === "position"} onClick={() => setMobile("position")}>
                                    Positions
                                </Controls.Tab>
                            </Layouts.Row>
                            <Layouts.Divider />
                        </Layouts.Col>
                        <Layouts.Contents.GridContainer
                            fullsize
                            area={`'info info' 'history position' 'history position'`}
                            width={`${windowSize.width < Root.Device.Tablet ? "0.75fr" : "40em"} 1fr`}
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
                                            area: "area",
                                        },
                                    ],
                                },
                                {
                                    area: "history",
                                    children: (
                                        <Layouts.Contents.SlideContent active={props?.responsive ? mobile === "history" : true}>
                                            <Layouts.Contents.InnerContent>
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
                                                <Asset.Containers.HistoryShort
                                                    assets={props?.assets}
                                                    list={history}
                                                    responsive={true}
                                                    fallback={"There is no assets yet."}
                                                />
                                            </Layouts.Contents.InnerContent>
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
                                    area: "position",
                                    children: (
                                        <Layouts.Contents.SlideContent active={props?.responsive ? mobile === "position" : true}>
                                            <Layouts.Contents.InnerContent>
                                                <Layouts.Menu
                                                    hide="mobile"
                                                    menu={[
                                                        [
                                                            <>
                                                                <Controls.Tab disabled>Position</Controls.Tab>
                                                            </>,
                                                        ],
                                                    ]}
                                                />
                                                <Layouts.Contents.GridContainer
                                                    direction={!props?.responsive ? "row" : "col"}
                                                    width={{ min: 24 }}
                                                    gap={4}
                                                    style={{ padding: "2em" }}
                                                    fullsize
                                                >
                                                    {props?.positions?.map((position: any, i: number) => (
                                                        <Layouts.Col key={i} gap={0}>
                                                            <div>
                                                                <Image
                                                                    width={0}
                                                                    height={0}
                                                                    src={position?.imageUrl}
                                                                    alt={position?.name}
                                                                    style={{ width: "100%", height: "100%", maxHeight: "50vh" }}
                                                                />
                                                            </div>
                                                            <div style={{ padding: "0.5em 0" }}>
                                                                <Layouts.Row gap={1} fix>
                                                                    <Elements.Text opacity={0.3} fit>
                                                                        Market
                                                                    </Elements.Text>
                                                                    <Elements.Text align={"right"}>{position?.name?.split(" ")[1]}</Elements.Text>
                                                                </Layouts.Row>
                                                                <Layouts.Row gap={1} fix>
                                                                    <Elements.Text opacity={0.3} fit>
                                                                        Price
                                                                    </Elements.Text>
                                                                    <Elements.Text align={"right"}>{position?.name?.split(" ")[2]}</Elements.Text>
                                                                    <Elements.Text align={"right"} opacity={0.3} fit>
                                                                        {position?.name?.split(" ")[1]?.split("/")[1]}
                                                                    </Elements.Text>
                                                                </Layouts.Row>
                                                            </div>
                                                        </Layouts.Col>
                                                    ))}
                                                </Layouts.Contents.GridContainer>
                                            </Layouts.Contents.InnerContent>
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
                        <Layouts.Row gap={2}>
                            <Controls.Button type={"solid"} color={"orange"}>
                                Deposit & Widthdraw
                            </Controls.Button>
                            <Controls.Button type={"solid"} color={"green"}>
                                Trades
                            </Controls.Button>
                        </Layouts.Row>
                    </Layouts.Contents.InnerContent>
                </>
            ) : (
                <Contents.States.Failure message={"Oops, something wrong"}>
                    <Controls.Button onClick={handleBack}>Go Back</Controls.Button>
                </Contents.States.Failure>
            )}
        </AnimatePresence>
    );
}
