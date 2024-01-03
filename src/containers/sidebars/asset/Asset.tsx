"use client";

import { Controls, Elements, Layouts } from "components";
import { useSort } from "hooks";
import { Filter, Format } from "lib/utils";
import TableItem from "../../../components/layouts/table/TableItem";

export interface Asset {
    list: AssetData[];
    filter?: string;
}

export interface AssetData {
    symbol?: string;
    name?: string;
    logo?: string;
    balance?: number | string;
    using?: number | string;
    value?: number | string;
}

export default function Asset(props: Asset) {
    const { sorting, setSort, sortArrow } = useSort();

    const sorts = {
        symbol: { key: "symbol", type: "string" },
        name: { key: "name", type: "string" },
        balance: { key: "balance", type: "number" },
        value: { key: "value", type: "number" },
    };

    const formatter = (data: AssetData[]) => {
        return (
            typeof data !== "string" &&
            data?.length > 0 &&
            data?.map((data: AssetData, i: number) => ({
                key: i,
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
                                        <Elements.Text type="p" height={1} opacity={0.45}>
                                            {data?.name}
                                        </Elements.Text>
                                    </>,
                                ],
                            ],
                        },
                    ],
                    {
                        align: "right",
                        children: [
                            <>
                                <Elements.Text type="strong">{data?.balance}</Elements.Text>
                            </>,
                            <>
                                <Elements.Text type="p" opacity={0.45}>
                                    ${" "}
                                    {Format(parseFloat(Format(data?.balance, "number")) * parseFloat(Format(data?.value, "number")), "currency", {
                                        unit: 9,
                                        limit: 12,
                                        fix: 3,
                                    })}
                                    {/* {data?.using} */}
                                </Elements.Text>
                            </>,
                        ],
                    },
                    // [
                    //     {
                    //         align: "right",
                    //         children: (
                    //             <Elements.Text>
                    //                 $ {Format((Format(data?.balance, "number") as number) * (Format(data?.value, "number") as number), "currency", { unit: 9, limit: 12, fix: 3 })}
                    //             </Elements.Text>
                    //         ),
                    //     },
                    // ],
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
                    <Controls.Tab iconLeft={sortArrow(sorts.balance)} onClick={() => setSort(sorts.balance)}>
                        Balance
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.value)} onClick={() => setSort(sorts.value)}>
                        Value
                    </Controls.Tab>
                </Layouts.Row>
                {/* <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.value)} onClick={() => setSort(sorts.value)}>
                        Value
                    </Controls.Tab>
                </Layouts.Row> */}
            </Layouts.Row>
            <Layouts.Divider strong />
            <Layouts.Table
                list={[
                    {
                        style: { height: "6.5em" },
                        onClick: () => {},
                        children: [
                            <>
                                <Elements.Text type={"strong"}>Total of all your assets</Elements.Text>
                            </>,
                            {
                                align: "right",
                                children: (
                                    <>
                                        <Elements.Text align={"right"}>$ {Format(123456789, "currency", { unit: 9, limit: 12, fix: 3 })}</Elements.Text>
                                    </>
                                ),
                            },
                        ],
                    },
                ]}
                fallback="There is no data."
            />
            <Layouts.Divider strong />
            <Layouts.Contents.InnerContent scroll>
                <Layouts.Table list={Filter(sorting(props?.list), props?.filter)} formatter={formatter} fallback="There is no data." />
            </Layouts.Contents.InnerContent>
        </>
    );
}
