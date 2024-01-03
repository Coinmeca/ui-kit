"use client";

import { Controls, Elements, Layouts } from "components";
import { useSort } from "hooks";
import { Filter, Format, Sign } from "lib/utils";

export interface Market {
    list: MarketData[];
    filter?: string;
}

export interface MarketData {
    logo?: string;
    symbol?: string;
    name?: string;
    market?: string;
    price?: number | string;
    change?: number | string;
    volume?: number | string;
}

export default function Market(props: Market) {
    const { sorting, setSort, sortArrow } = useSort();

    const sorts = {
        symbol: { key: "symbol", type: "string" },
        name: { key: "name", type: "string" },
        market: { key: "market", type: "string" },
        price: { key: "price", type: "number" },
        change: { key: "change", type: "number" },
        volume: { key: "volume", type: "number" },
    };

    const formatter = (data: MarketData[]) => {
        return (
            typeof data !== "string" &&
            data?.length > 0 &&
            data?.map((data: MarketData) => ({
                children: [
                    [
                        {
                            style: { width: "max-content" },
                            children: [
                                <>
                                    <Elements.Avatar
                                        // length={8}
                                        size={3}
                                        img={data?.logo}
                                        // name={'0x16e39d21f7f3ab3dafabd12fc07f4fd4928fb47163e79bb879d0928ac34e817e'}
                                    />
                                </>,
                                [
                                    <>
                                        <Elements.Text type="strong" case={"upper"} height={1}>
                                            {data?.symbol}
                                        </Elements.Text>
                                    </>,
                                    <>
                                        <Elements.Text type="p" case={"upper"} height={1} opacity={0.45}>
                                            {data?.market}
                                        </Elements.Text>
                                    </>,
                                ],
                            ],
                        },
                    ],
                    {
                        align: "right",
                        change: data?.change ? (Sign(data?.change) === "+" ? "var(--green)" : Sign(data?.change) === "-" && "var(--red)") : "",
                        children: [
                            <>
                                <Elements.Text type="strong">$ {Format(data?.price, "currency", { unit: 9, limit: 12, fix: 3 })}</Elements.Text>
                            </>,
                            <>
                                <Elements.Text type="strong" change>
                                    {Sign(data?.change)} {Format(data?.change, "number", { sign: false })} %
                                </Elements.Text>
                            </>,
                        ],
                    },
                    [
                        {
                            align: "right",
                            children: <Elements.Text>{Format(data?.volume, "currency", { unit: 9, limit: 12, fix: 3 })}</Elements.Text>,
                        },
                    ],
                ],
                onClick: (props: any) => alert(props.children),
            }))
        );
    };

    return (
        <>
            <Layouts.Row gap={1} style={{ padding: "1em" }} fix>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.symbol)} onClick={() => setSort(sorts.symbol)}>
                        Symbol
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.name)} onClick={() => setSort(sorts.name)}>
                        Name
                    </Controls.Tab>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.price)} onClick={() => setSort(sorts.price)}>
                        Price
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.change)} onClick={() => setSort(sorts.change)}>
                        Change
                    </Controls.Tab>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.volume)} onClick={() => setSort(sorts.volume)}>
                        Volume
                    </Controls.Tab>
                </Layouts.Row>
            </Layouts.Row>
            <Layouts.Divider strong />
            <Layouts.Contents.InnerContent scroll>
                <Layouts.Table list={Filter(sorting(props?.list), props?.filter)} formatter={formatter} fallback="There is no data." />
            </Layouts.Contents.InnerContent>
        </>
    );
}
