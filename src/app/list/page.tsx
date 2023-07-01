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

    const data = {
        symbol: "ETH",
        name: "Ethereum",
        amount: "4,678.050000",
        price: "623.740000",
        fees: "0.18292683",
        total: "7.31707317",
    };

    const list = [
        {
            children: [[`${data.symbol}`, `${data.name}`], [`${data.amount} ${data.symbol}`], [`${data.price} ${data.symbol}`], [`${data.fees} ${data.symbol}`], [`${data.total} ${data.symbol}`]],
            onClick: () => alert("1"),
        },
        {
            children: [
                [`${data.symbol}`, `${data.name}`],
                [
                    <>
                        {data.amount}
                        <span>{data.symbol}</span>
                    </>,
                ],
                [`${data.price} ${data.symbol}`],
                [`${data.fees} ${data.symbol}`],
                [`${data.total} ${data.symbol}`],
            ],
            onClick: () => alert("1"),
        },
    ];

    return (
        <Frames.Frame sidebar sidebars={sidebars}>
            <Layouts.Content>
                <div style={{ height: "320px" }} />
                <Layouts.Box>
                    <Layouts.List list={list} noData="There is no data." />
                </Layouts.Box>
            </Layouts.Content>
        </Frames.Frame>
    );
}
