"use client";
import { useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Modals } from "containers";
import type { List } from "components/layouts/list/List";
import { Format } from "lib/utils";
import { Token } from "types/web3";
import { Order } from "types/history";
import usePortal from "hooks/usePortal";

export interface History extends List {
    assets?: Token[];
    list?: Order[];
    responsive?: boolean;
}

export default function History(props: History) {
    const category = ["Order", "Buy", "Sell", "Deposit", "Withdraw", "Stake", "Unstake", "Claim", "Futures", "Perpetual"];
    const state = ["Pending", "Complete", "Cancel", "Claimable", "Liquidation"];
    const colorset = ["white", "green", "red", "orange", "blue"];

    const [history, setHistory] = useState(props?.list || []);
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

    const historyFormatter = (data?: Order[]) => {
        return (
            data &&
            typeof data !== "string" &&
            data?.length > 0 &&
            data?.map((data: Order) => {
                // console.log(props?.assets?.find((a: Token) => console.log(a)));
                const pay: any = props?.assets?.find((a: Token) => a?.address === data?.pay)?.symbol;
                const item: any = props?.assets?.find((a: Token) => a?.address === data?.item)?.symbol;

                const date = (Format(data?.time, "date") as string).split(" ");
                return {
                    onClick: () => {
                        handleDetail(handleDetailModal, {
                            base: item,
                            quote: pay,
                            date: date[0],
                            time: date[1],
                            category: data?.category,
                            state: data?.state,
                            price: data?.price,
                            amount: data?.amount,
                            quantity: data?.quantity,
                            fees: data?.fees,
                        });
                    },
                    style: { padding: "2em" },
                    children: [
                        {
                            style: { flex: 1, maxWidth: !props?.responsive && "20%" },
                            children: [
                                {
                                    style: { flexDirection: props?.responsive && "row-reverse" },
                                    children: [
                                        {
                                            style: { gap: "0", maxWidth: "10em" },
                                            children: [
                                                <>
                                                    <Elements.Text opacity={0.3} style={{ ...(props?.responsive && { width: "100%", textAlign: "right" }) }}>
                                                        {date[0]}
                                                    </Elements.Text>
                                                </>,
                                                <>
                                                    <Elements.Text opacity={0.3} style={{ ...(props?.responsive && { width: "100%", textAlign: "right" }) }}>
                                                        {date[1]}
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
                                                <Layouts.Row gap={1} style={{ opacity: 0.3 }}>
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
                                                <Layouts.Row gap={1}>
                                                    <Elements.Text align={"right"}>{Format(data?.quantity || 0, "currency", true)}</Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "4em" }} fit>
                                                        {item}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </>,
                                            <>
                                                <Layouts.Row gap={1} style={{ opacity: 0.3 }}>
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

    return <Layouts.List list={historyFormatter(history)} fallback={props?.fallback} />;
}
