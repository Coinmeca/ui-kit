"use client";
import { Controls, Frames, Layouts } from "components";

export default function Exchange() {

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
                    [
                        {
                            style: { width: "max-content" },
                            children: [`${data.symbol}`, `${data.name}`],
                        },
                    ],
                    [
                        { align: "right", children: `$${data.price}` },
                        { align: "right", children: `+${data.price}` },
                    ],
                    [
                        { align: "right", children: data.total },
                    ],
                ],
                onClick: (props: any) => alert(props.children),
            }))
        );
    };

    const sidebars = [
        {
            name: "exchange",
            children: (<>
            <Controls.Input icon="search" />
            <Layouts.Table list={formatter(data)} noData="There is no data." />
            </>),
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
    
    return (
        <Frames.Frame sidebar sidebars={sidebars} background={{filter:'black', img:{src: 2}}}>
            <Layouts.Content>
                <div style={{ height: "320px" }} />
                <Layouts.Box>
                    <Layouts.Table list={formatter(data)} noData="There is no data." />
                </Layouts.Box>
            </Layouts.Content>
        </Frames.Frame>
    );
}
