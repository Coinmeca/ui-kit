"use client";
import { Controls, Elements, Layouts } from "components";
import { Modals } from "containers";
import { usePortal } from "hooks";
import { format } from "lib/utils";
import { useState } from "react";
import type { History as H } from "types/history";
import { Token } from "types/web3";
import { History, colorMap } from "./Default";

export default function Short(props: History) {
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
                                    <Layouts.Col gap={0}>
                                        <Elements.Text height={1.5} color={colorMap[data?.category]}>
                                            {data?.category}
                                        </Elements.Text>
                                        <Elements.Text height={1.5} opacity={data?.state === 1 ? 0.3 : 1}>
                                            {data?.state}
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
                                    <Elements.Text align={"right"}>{format(data?.price, "currency", { unit: 9, limit: 12, fix: 3 })}</Elements.Text>
                                    <Elements.Text opacity={0.3} style={{ maxWidth: "6em" }}>
                                        {data?.quote}
                                    </Elements.Text>
                                </Layouts.Row>
                                <Layouts.Divider />
                                <Layouts.Row gap={1} fix>
                                    <Elements.Text opacity={0.3} fit>
                                        Amount
                                    </Elements.Text>
                                    <Elements.Text align={"right"}>{format(data?.amount, "currency", { unit: 9, limit: 12, fix: 3 })}</Elements.Text>
                                    <Elements.Text opacity={0.3} style={{ maxWidth: "6em" }}>
                                        {data?.quote}
                                    </Elements.Text>
                                </Layouts.Row>
                                <Layouts.Row gap={1} fix>
                                    <Elements.Text opacity={0.3} fit>
                                        Quantity
                                    </Elements.Text>
                                    <Elements.Text align={"right"}>{format(data?.quantity, "currency", { unit: 9, limit: 12, fix: 3 })}</Elements.Text>
                                    <Elements.Text opacity={0.3} style={{ maxWidth: "6em" }}>
                                        {data?.base}
                                    </Elements.Text>
                                </Layouts.Row>
                                <Layouts.Divider />
                                <Layouts.Row gap={1} fix>
                                    <Elements.Text opacity={0.3} fit>
                                        Fees
                                    </Elements.Text>
                                    <Elements.Text opacity={0.6} align={"right"}>
                                        - {format(data?.fees, "currency", { unit: 9, limit: 12, fix: 3 })}
                                    </Elements.Text>
                                    <Elements.Text opacity={0.3} style={{ maxWidth: "6em" }}>
                                        {data?.base}
                                    </Elements.Text>
                                </Layouts.Row>
                                <Layouts.Row gap={1} fix>
                                    <Elements.Text opacity={0.3} fit>
                                        Total
                                    </Elements.Text>
                                    <Elements.Text align={"right"}>
                                        {format(data?.quantity - data?.fees, "currency", { unit: 9, limit: 12, fix: 3 })}
                                    </Elements.Text>
                                    <Elements.Text opacity={0.3} style={{ maxWidth: "6em" }}>
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

                const date = (format(data?.time, "date") as string).split(" ");
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
                        [
                            [
                                [
                                    [
                                        {
                                            gap: 0,
                                            children: [
                                                <>
                                                    <Elements.Text color={colorMap[data?.category]}>{data?.category}</Elements.Text>
                                                </>,
                                                <>
                                                    <Elements.Text opacity={data?.state === "Pending" || data?.state === "Open" ? 1 : 0.3}>
                                                        {data?.state}
                                                    </Elements.Text>
                                                </>,
                                            ],
                                        },
                                        {
                                            gap: 0,
                                            style: { opacity: 0.3 },
                                            children: [
                                                <>
                                                    <Elements.Text
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
                                    ],
                                    [
                                        {
                                            gap: 0,
                                            style: { maxWidth: "calc(50% - 1em)" },
                                            children: [
                                                {
                                                    align: "right",
                                                    children: (
                                                        <>
                                                            <Elements.Text align={"right"} fix>
                                                                {format(data?.amount || 0, "currency", { unit: 6, limit: 8, fix: 2 })}
                                                            </Elements.Text>
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
                                                            <Elements.Text align={"right"} fix>
                                                                {format(data?.price || 0, "currency", { unit: 6, limit: 8, fix: 2 })}
                                                            </Elements.Text>
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
                                            style: { maxWidth: "calc(50% - 1em)" },
                                            children: [
                                                {
                                                    align: "right",
                                                    children: (
                                                        <>
                                                            <Elements.Text align={"right"} fix>
                                                                {format(data?.quantity || 0, "currency", { unit: 6, limit: 8, fix: 2 })}
                                                            </Elements.Text>
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
                                                    style: { opacity: 0.3 },
                                                    children: (
                                                        <>
                                                            <Elements.Text align={"right"} fix>{`- ${format(data?.fees || 0, "currency", {
                                                                unit: 6,
                                                                limit: 8,
                                                                fix: 2,
                                                            })}`}</Elements.Text>
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
                            ],
                        ],
                    ],
                };
            })
        );
    };

    return <Layouts.List list={historyFormatter(history)} fallback={props?.fallback} />;
}
