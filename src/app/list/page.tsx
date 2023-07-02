"use client";
import { Controls, Frames, Layouts } from "components";

export default function Exchange() {
    const sidebars = [
        {
            name: "exchange",
            children: <div>exchange</div>,
        },
        {
            name: "notification",
            children: <div>notification</div>,
        },
        {
            name: "asset",
            children: <div>asset</div>,
        },
    ];

    const data = [
        {
            symbol: "ETH",
            name: "Ethereum",
            amount: "4,678.050000",
            price: "623.740000",
            fees: "0.18292683",
            total: "7.31707317",
        },
        {
            symbol: "ETH",
            name: "Ethereum",
            amount: "4,678.050000",
            price: "623.740000",
            fees: "0.18292683",
            total: "7.31707317",
        },
        {
            symbol: "ETH",
            name: "Ethereum",
            amount: "4,678.050000",
            price: "623.740000",
            fees: "0.18292683",
            total: "7.31707317",
        },
        {
            symbol: "ETH",
            name: "Ethereum",
            amount: "4,678.050000",
            price: "623.740000",
            fees: "0.18292683",
            total: "7.31707317",
        },
        {
            symbol: "ETH",
            name: "Ethereum",
            amount: "4,678.050000",
            price: "623.740000",
            fees: "0.18292683",
            total: "7.31707317",
        },
    ];

    const formatter = (data: any) => {
        return (
            data?.length > 0 &&
            data?.map((data: any) => ({
                children: [
                    {
                        children: [
                            {
                                style: { width: "max-content" },
                                children: [`${data.symbol}`, `${data.name}`],
                            },
                            {
                                align: "right",
                                children: (
                                    <>
                                        {data.amount}
                                        <span>{data.symbol}</span>
                                    </>
                                ),
                            },
                        ],
                    },
                    [
                        [
                            { align: "right", children: `${data.price} ${data.symbol}` },
                            { align: "right", children: `${data.price} ${data.symbol}` },
                        ],
                        [
                            { align: "right", children: `${data.total} ${data.symbol}` },
                            { align: "right", children: `${data.total} ${data.symbol}` },
                        ],
                    ],
                ],
                onClick: (props: any) => alert(props.children),
            }))
        );
    };

    return (
        <Frames.Frame sidebar sidebars={sidebars}>
            <Layouts.Content>
                <div style={{ height: "320px" }} />
                <Layouts.Box>
                    <Layouts.List list={formatter(data)} noData="There is no data." />
                </Layouts.Box>
            </Layouts.Content>
        </Frames.Frame>
    );
}
