"use client";
import { useState } from "react";
import { Contents, Controls, Elements, Layouts } from "components";
import { Asset } from "prefabs";
import { Format } from "lib/utils";
import { Token } from "types/web3";
import { Order } from "types/history";
import { AnimatePresence } from "framer-motion";

export interface Detail {
    info?: any;
    assets?: Token[];
    asset?: Token;
    history?: Order[];
    onBack?: Function;
    responsive?: boolean;
}

export default function Detail(props: Detail) {
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
                                        <Layouts.Contents.SlideContent active={props?.responsive ? mobile === "info" : true}>
                                            <Asset.Containers.Info info={props?.info} responsive={props?.responsive} />
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
                                                assets={props?.assets}
                                                list={history}
                                                responsive={props?.responsive}
                                                fallback={"There is no assets yet."}
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
