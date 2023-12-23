"use client";
import { useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Modals } from "containers";
import { usePortal, useSort } from "hooks";
import { Filter, Format } from "lib/utils";
import type { Token, History as H } from "types";
import type { List } from "components/layouts/list/List";

export interface History extends List {
    assets?: Token[];
    list?: H[];
    filter?: string;
    responsive?: boolean;
    fallback?: any;
}

export default function History(props: History) {
    const { sorting, setSort, sortArrow } = useSort();

    const sorts = {
        time: { key: "time", type: "number" },
        category: { key: "category", type: "number" },
        state: { key: "state", type: "number" },
        market: { key: "market", type: "string" },
        pay: { key: "pay", type: "string" },
        item: { key: "item", type: "string" },
        price: { key: "price", type: "number" },
        amount: { key: "amount", type: "number" },
        quantity: { key: "quantity", type: "number" },
        fees: { key: "fees", type: "number" },
        total: { key: "total", type: "number" },
    };

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
                    <Layouts.Col gap={2} style={{ height: "100%" }}>
                        <Layouts.Contents.InnerContent
                            style={{
                                fontFeatureSettings: `'tnum' on, 'lnum' on`,
                            }}
                        >
                            <Layouts.Col gap={1}>
                                <Layouts.Row gap={1} fix>
                                    <Layouts.Col align={"left"} gap={0}>
                                        <Elements.Text height={1.5} color={colorset[data?.category]}>
                                            {category[data?.category]}
                                        </Elements.Text>
                                        <Elements.Text height={1.5} opacity={data?.state === 1 ? 0.3 : 1}>
                                            {state[data?.state]}
                                        </Elements.Text>
                                    </Layouts.Col>
                                    <Layouts.Col gap={0}>
                                        <Elements.Text height={1.5} opacity={0.3} align={"right"}>
                                            {data?.date}
                                        </Elements.Text>
                                        <Elements.Text height={1.5} opacity={0.3} align={"right"}>
                                            {data?.time}
                                        </Elements.Text>
                                    </Layouts.Col>
                                </Layouts.Row>
                                <Layouts.Divider />
                                <Layouts.Row gap={1} fix>
                                    <Elements.Text opacity={0.3} fit>
                                        Price
                                    </Elements.Text>
                                    <Elements.Text align={"right"}>{Format(data?.price, "currency", true)}</Elements.Text>
                                    <Elements.Text opacity={0.3} align={"left"} style={{ maxWidth: "6em" }}>
                                        {data?.quote}
                                    </Elements.Text>
                                </Layouts.Row>
                                <Layouts.Divider />
                                <Layouts.Row gap={1} fix>
                                    <Elements.Text opacity={0.3} fit>
                                        Amount
                                    </Elements.Text>
                                    <Elements.Text align={"right"}>{Format(data?.amount, "currency", true)}</Elements.Text>
                                    <Elements.Text opacity={0.3} align={"left"} style={{ maxWidth: "6em" }}>
                                        {data?.quote}
                                    </Elements.Text>
                                </Layouts.Row>
                                <Layouts.Row gap={1} fix>
                                    <Elements.Text opacity={0.3} fit>
                                        Quantity
                                    </Elements.Text>
                                    <Elements.Text align={"right"}>{Format(data?.quantity, "currency", true)}</Elements.Text>
                                    <Elements.Text opacity={0.3} align={"left"} style={{ maxWidth: "6em" }}>
                                        {data?.base}
                                    </Elements.Text>
                                </Layouts.Row>
                                <Layouts.Divider />
                                <Layouts.Row gap={1} fix>
                                    <Elements.Text opacity={0.3} fit>
                                        Fees
                                    </Elements.Text>
                                    <Elements.Text opacity={0.6} align={"right"}>
                                        - {Format(data?.fees, "currency", true)}
                                    </Elements.Text>
                                    <Elements.Text opacity={0.3} align={"left"} style={{ maxWidth: "6em" }}>
                                        {data?.base}
                                    </Elements.Text>
                                </Layouts.Row>
                                <Layouts.Row gap={1} fix>
                                    <Elements.Text opacity={0.3} fit>
                                        Total
                                    </Elements.Text>
                                    <Elements.Text align={"right"}>{Format(data?.quantity - data?.fees, "currency", true)}</Elements.Text>
                                    <Elements.Text opacity={0.3} align={"left"} style={{ maxWidth: "6em" }}>
                                        {data?.base}
                                    </Elements.Text>
                                </Layouts.Row>
                            </Layouts.Col>
                        </Layouts.Contents.InnerContent>
                        <Layouts.Row fix style={{ marginTop: "2em" }}>
                            <Controls.Button>Undo</Controls.Button>
                            <Controls.Button onClick={() => closeDetail()}>Close</Controls.Button>
                        </Layouts.Row>
                    </Layouts.Col>
                }
                onClose={() => closeDetail()}
                close
            />
        );
    };

    const historyFormatter = (data?: H[]) => {
        return (
            data &&
            typeof data !== "string" &&
            data?.length > 0 &&
            data?.map((data: H) => {
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
                            style: {
                                flex: 1,
                                maxWidth: !props?.responsive && "20%",
                            },
                            children: [
                                {
                                    style: {
                                        flexDirection: props?.responsive && "row-reverse",
                                    },
                                    children: [
                                        {
                                            gap: 0,
                                            style: {
                                                maxWidth: "10em",
                                                opacit: 0.3,
                                            },
                                            children: [
                                                <>
                                                    <Elements.Text
                                                        opacity={0.3}
                                                        style={{
                                                            ...(props?.responsive && {
                                                                width: "100%",
                                                                textAlign: "right",
                                                            }),
                                                        }}
                                                    >
                                                        {date[0]}
                                                    </Elements.Text>
                                                </>,
                                                <>
                                                    <Elements.Text
                                                        style={{
                                                            ...(props?.responsive && {
                                                                width: "100%",
                                                                textAlign: "right",
                                                            }),
                                                        }}
                                                    >
                                                        {date[1]}
                                                    </Elements.Text>
                                                </>,
                                            ],
                                        },
                                        {
                                            gap: 0,
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
                                        gap: 0,
                                        children: [
                                            {
                                                align: "right",
                                                children: (
                                                    <>
                                                        <Elements.Text align={"right"}>{Format(data?.amount || 0, "currency", true)}</Elements.Text>
                                                        <Elements.Text
                                                            align={"left"}
                                                            opacity={0.6}
                                                            style={{
                                                                maxWidth: "4em",
                                                            }}
                                                            fit
                                                        >
                                                            {pay}
                                                        </Elements.Text>
                                                    </>
                                                ),
                                            },
                                            {
                                                align: "right",
                                                children: (
                                                    <>
                                                        <Elements.Text align={"right"}>{Format(data?.price || 0, "currency", true)}</Elements.Text>
                                                        <Elements.Text
                                                            align={"left"}
                                                            opacity={0.6}
                                                            style={{
                                                                maxWidth: "4em",
                                                            }}
                                                            fit
                                                        >
                                                            {pay}
                                                        </Elements.Text>
                                                    </>
                                                ),
                                            },
                                        ],
                                    },
                                    {
                                        gap: 0,
                                        children: [
                                            {
                                                align: "right",
                                                children: (
                                                    <>
                                                        <Elements.Text align={"right"}>{Format(data?.quantity || 0, "currency", true)}</Elements.Text>
                                                        <Elements.Text
                                                            align={"left"}
                                                            opacity={0.6}
                                                            style={{
                                                                maxWidth: "4em",
                                                            }}
                                                            fit
                                                        >
                                                            {item}
                                                        </Elements.Text>
                                                    </>
                                                ),
                                            },
                                            {
                                                align: "right",
                                                children: (
                                                    <>
                                                        <Elements.Text align={"right"}>- {Format(data?.fees || 0, "currency", true)}</Elements.Text>
                                                        <Elements.Text
                                                            align={"left"}
                                                            opacity={0.6}
                                                            style={{
                                                                maxWidth: "4em",
                                                            }}
                                                            fit
                                                        >
                                                            {item}
                                                        </Elements.Text>
                                                    </>
                                                ),
                                            },
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

    return (
        <Layouts.Contents.InnerContent>
            <Layouts.Row gap={1} fix>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.time)} onClick={() => setSort(sorts.time)}>
                        Time
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.category)} onClick={() => setSort(sorts.category)}>
                        Category
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.state)} onClick={() => setSort(sorts.state)}>
                        State
                    </Controls.Tab>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.market)} onClick={() => setSort(sorts.market)}>
                        Market
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.item)} onClick={() => setSort(sorts.item)}>
                        Base
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.pay)} onClick={() => setSort(sorts.pay)}>
                        Quote
                    </Controls.Tab>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.price)} onClick={() => setSort(sorts.price)}>
                        Price
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.amount)} onClick={() => setSort(sorts.amount)}>
                        Amount
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.quantity)} onClick={() => setSort(sorts.quantity)}>
                        Quantity
                    </Controls.Tab>
                </Layouts.Row>
            </Layouts.Row>
            <Layouts.Divider />
            <Layouts.List list={Filter(sorting(history), props?.filter)} formatter={historyFormatter} fallback={props?.fallback} />
        </Layouts.Contents.InnerContent>
    );
}
