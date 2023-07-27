"use client";
import { useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Modals } from "containers";
import { Format } from "lib/utils";
import { Token, History as Data } from "types/web3";
import usePortal from "hooks/usePortal";
import * as HistoryData from "app/samples/asset/data";

export interface History {
    assets?: Token[];
    history?: Data[];
    responsive?: boolean;
    noData?: any;
}

export default function History(props: History) {
    const responsive = props?.responsive;

    const { category, state, colorset, history } = HistoryData.default();
    const [process, setProcess] = useState(null);

    const [handleDetail, closeDetail] = usePortal();
    const handleDetailModal = (data: any) => {
        return (
            <Modals.Process
                process={process}
                title="Transaction Detail"
                content={
                    <>
                        <Layouts.Contents.InnerContent>
                            <Layouts.Col gap={1}>
                                <Layouts.Row gap={1} fix>
                                    <Layouts.Col gap={0}>
                                        <Elements.Text height={1.5} color={colorset[data?.category]}>
                                            {category[data?.category]}
                                        </Elements.Text>
                                        <Elements.Text height={1.5} opacity={data?.state !== 2 ? 1 : 0.3}>
                                            {state[data?.state]}
                                        </Elements.Text>
                                    </Layouts.Col>
                                    <Layouts.Col gap={0}>
                                        <Elements.Text height={1.5} weight={"normal"} opacity={0.6} align={"right"}>
                                            {data?.date}
                                        </Elements.Text>
                                        <Elements.Text height={1.5} weight={"normal"} opacity={0.6} align={"right"}>
                                            {data?.time}
                                        </Elements.Text>
                                    </Layouts.Col>
                                </Layouts.Row>
                                <Layouts.Divider />
                                <Layouts.Row gap={1} fix>
                                    <Elements.Text opacity={0.6} fit>
                                        Price
                                    </Elements.Text>
                                    <Elements.Text align={"right"}>{data?.price}</Elements.Text>
                                    <Elements.Text opacity={0.6} style={{ maxWidth: "6em" }}>
                                        {data?.quote}
                                    </Elements.Text>
                                </Layouts.Row>
                                <Layouts.Divider />
                                <Layouts.Row gap={1} fix>
                                    <Elements.Text opacity={0.3} fit>
                                        Amount
                                    </Elements.Text>
                                    <Elements.Text align={"right"}>{data?.amount}</Elements.Text>
                                    <Elements.Text opacity={0.3} style={{ maxWidth: "6em" }}>
                                        {data?.quote}
                                    </Elements.Text>
                                </Layouts.Row>
                                <Layouts.Divider />
                                <Layouts.Row gap={1} fix>
                                    <Elements.Text opacity={0.6} fit>
                                        Quantity
                                    </Elements.Text>
                                    <Elements.Text align={"right"}>{data?.quantity}</Elements.Text>
                                    <Elements.Text opacity={0.6} style={{ maxWidth: "6em" }}>
                                        {data?.base}
                                    </Elements.Text>
                                </Layouts.Row>
                                <Layouts.Row gap={1} fix>
                                    <Elements.Text opacity={0.6} fit>
                                        Fees
                                    </Elements.Text>
                                    <Elements.Text align={"right"}>- {data?.fees}</Elements.Text>
                                    <Elements.Text opacity={0.6} style={{ maxWidth: "6em" }}>
                                        {data?.base}
                                    </Elements.Text>
                                </Layouts.Row>
                            </Layouts.Col>
                        </Layouts.Contents.InnerContent>
                        <Layouts.Row fix style={{ marginTop: "2em" }}>
                            <Controls.Button>Undo</Controls.Button>
                            <Controls.Button onClick={() => closeDetail()}>Close</Controls.Button>
                        </Layouts.Row>
                    </>
                }
                onClose={() => closeDetail()}
                close
            />
        );
    };

    const historyFormatter = (data: Data[]) => {
        return (
            typeof data !== "string" &&
            data?.length > 0 &&
            data?.map((data: Data) => {
                // console.log(props?.assets?.find((a: Token) => console.log(a)));
                const pay: any = props?.assets?.find((a: Token) => a?.address === data?.pay)?.symbol;
                const item: any = props?.assets?.find((a: Token) => a?.address === data?.item)?.symbol;

                const d = new Date(data?.time * 1000);
                const date = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear().toString().substring(2, 4);
                const time = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);

                return {
                    onClick: () => {
                        handleDetail(handleDetailModal, {
                            base: item,
                            quote: pay,
                            date: date,
                            time: time,
                            category: data?.category,
                            state: data?.state,
                            price: data?.price,
                            amount: data?.amount,
                            quantity: data?.quantity,
                            fees: data?.fees,
                        });
                    },
                    style: { flex: 1, padding: "2em" },
                    children: [
                        {
                            style: { flex: 1, maxWidth: !responsive && "20%" },
                            children: [
                                {
                                    style: { flexDirection: responsive && "row-reverse" },
                                    children: [
                                        {
                                            style: { gap: "0", maxWidth: "10em" },
                                            children: [
                                                <>
                                                    <Elements.Text
                                                        weight={"normal"}
                                                        opacity={0.6}
                                                        style={{ ...(responsive && { width: "100%", textAlign: "right" }) }}
                                                    >
                                                        {date}
                                                    </Elements.Text>
                                                </>,
                                                <>
                                                    <Elements.Text
                                                        weight={"normal"}
                                                        opacity={0.6}
                                                        style={{ ...(responsive && { width: "100%", textAlign: "right" }) }}
                                                    >
                                                        {time}
                                                    </Elements.Text>
                                                </>,
                                            ],
                                        },
                                        {
                                            style: { gap: "0" },
                                            children: [
                                                <>
                                                    <Elements.Text color={colorset[data?.category]}>{category[data?.category]}</Elements.Text>
                                                </>,
                                                <>
                                                    <Elements.Text opacity={data?.state === 1 ? 0.3 : 1}>{state[data?.state]}</Elements.Text>
                                                </>,
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            style: { flex: 2 },
                            children: [
                                [
                                    {
                                        style: { gap: 0 },
                                        children: [
                                            <>
                                                <Layouts.Row gap={1}>
                                                    <Elements.Text align={"right"}>{Format(data?.amount || 0, "currency", true)}</Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "4em" }} fit>
                                                        {pay}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </>,
                                            <>
                                                <Layouts.Row gap={1}>
                                                    <Elements.Text align={"right"}>{Format(data?.price || 0, "currency", true)}</Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "4em" }} fit>
                                                        {pay}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </>,
                                        ],
                                    },
                                    {
                                        style: { gap: 0 },
                                        children: [
                                            <>
                                                <Layouts.Row gap={1} style={{ width: "100%" }}>
                                                    <Elements.Text align={"right"}>{Format(data?.quantity || 0, "currency", true)}</Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "4em" }} fit>
                                                        {item}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </>,
                                            <>
                                                <Layouts.Row gap={1} style={{ width: "100%" }}>
                                                    <Elements.Text align={"right"}>- {Format(data?.fees || 0, "currency", true)}</Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "4em" }} fit>
                                                        {item}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </>,
                                        ],
                                    },
                                ],
                            ],
                        },
                    ],
                };
            })
        );
    };

    return <Layouts.List list={historyFormatter(history)} noData={props?.noData} />;
}
