"use client";

import { Controls, Elements, Layouts } from "components";
import { useSort } from "hooks";

export interface Market {
    list: any[];
}

export default function Market(props: Market) {
    const { sorting, setSort, sortArrow } = useSort();

    const sorts = {
        symbol: { key: "symbol", type: "string" },
        name: { key: "name", type: "string" },
        price: { key: "price", type: "number" },
        change: { key: "change", type: "number" },
        volume: { key: "volume", type: "number" },
    };

    const formatter = (data: any) => {
        return (
            typeof data !== "string" &&
            data?.length > 0 &&
            data?.map((data: any) => ({
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
                                        <Elements.Text type="strong" case={"upper"} height={1.25}>
                                            {data?.symbol}
                                        </Elements.Text>
                                    </>,
                                    <>
                                        <Elements.Text type="p" case={"upper"} height={1.25} style={{ opacity: 0.45 }}>
                                            {data?.market}
                                        </Elements.Text>
                                    </>,
                                ],
                            ],
                        },
                    ],
                    {
                        align: "right",
                        change: parseFloat(data?.change) > 0 ? "var(--green)" : parseFloat(data?.change) < 0 && "var(--red)",
                        children: [
                            <>
                                <Elements.Text type="strong" height={1.25}>
                                    $ {data?.price}
                                </Elements.Text>
                            </>,
                            <>
                                <Elements.Text type="strong" height={1.25} change>
                                    {parseFloat(data?.change) > 0 && "+"}
                                    {data?.change} %
                                </Elements.Text>
                            </>,
                        ],
                    },
                    [
                        {
                            align: "right",
                            children: <Elements.Text>{data?.volume}</Elements.Text>,
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
                <Layouts.Table list={sorting(props?.list)} formatter={formatter} fallback="There is no data." />
            </Layouts.Contents.InnerContent>
        </>
    );
}
