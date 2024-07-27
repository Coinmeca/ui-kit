"use client";
import { useState } from "react";
import { Controls, Elements, Layouts } from "components";
import type { List } from "components/layouts/list/List";
import { usePortal, useSort } from "hooks";
import { filter, format } from "lib/utils";
import type { History as H, Token } from "types";
// import { TransactionDetail } from "../modals";

export const colorMap: {
    [x: string]: string;
} = {
    Buy: "green",
    Sell: "red",
    Long: "green",
    Short: "red",
    Deposit: "oange",
    Withdraw: "blue",
    Stake: "orange",
    Unstake: "blue",
    undefined: "",
    "": "",
};

export interface History extends List {
    assets?: Token[];
    list?: any[];
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

    const [history, setHistory] = useState(props?.list || []);
    const [process, setProcess] = useState(null);

    const [handleDetail, closeDetail] = usePortal();

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
                    onClick: () => handleDetail(),
                    // <TransactionDetail
                    //     data={{
                    //         base: item,
                    //         quote: pay,
                    //         date: date[0],
                    //         time: date[1],
                    //         category: data?.category,
                    //         option: data?.option,
                    //         state: data?.state,
                    //         price: data?.price,
                    //         amount: data?.amount,
                    //         quantity: data?.quantity,
                    //         fees: data?.fees,
                    //     }}
                    //     onClose={closeDetail}
                    // />
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
                                                    <Elements.Text color={colorMap[data?.category]}>{data?.category}</Elements.Text>
                                                </>,
                                                <>
                                                    <Elements.Text opacity={data?.state === "Pending" || data?.state === "Open" ? 1 : 0.3}>
                                                        {data?.state}
                                                    </Elements.Text>
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
                                                        <Elements.Text align={"right"}>
                                                            {format(data?.amount || 0, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                                                        <Elements.Text align={"right"}>
                                                            {format(data?.price || 0, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                                        children: [
                                            {
                                                align: "right",
                                                children: (
                                                    <>
                                                        <Elements.Text align={"right"}>
                                                            {format(data?.quantity || 0, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                                                children: (
                                                    <>
                                                        <Elements.Text align={"right"}>
                                                            - {format(data?.fees || 0, "currency", { unit: 9, limit: 12, fix: 3 })}
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
            <Layouts.List list={filter(sorting(history), props?.filter)} formatter={historyFormatter} fallback={props?.fallback} />
        </Layouts.Contents.InnerContent>
    );
}
