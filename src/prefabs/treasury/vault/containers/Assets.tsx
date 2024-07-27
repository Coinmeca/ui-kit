"use client";
import { Controls, Elements, Layouts } from "components";
import { useSort } from "hooks";
import { filter, format, sign } from "lib/utils";
import { Asset } from "types/web3";

export interface Assets {
    assets?: Asset[];
    filter?: string;
    responsive?: boolean;
    onSelect?: Function;
}

export default function Assets(props: Assets) {
    const { sorting, setSort, sortArrow } = useSort();

    const formatter = (data: Asset[] | undefined) => {
        return (
            data &&
            typeof data !== "string" &&
            data?.length > 0 &&
            data?.map((data: Asset) => ({
                onClick: () => {
                    if (typeof props?.onSelect === "function") props?.onSelect(data);
                },
                style: { padding: "2em" },
                children: [
                    [
                        [
                            {
                                style: { flex: 1, maxWidth: "20%" },
                                children: [
                                    [
                                        {
                                            style: { maxWidth: "max-content" },
                                            children: (
                                                <Elements.Avatar
                                                    size={props?.responsive ? 3.5 : 4}
                                                    style={{ maxWidth: "max-content" }}
                                                    img={require(`../../../../assets/coins/${data?.symbol?.toLowerCase()}.png`)}
                                                />
                                            ),
                                        },
                                        <>
                                            <Layouts.Col gap={0}>
                                                <Elements.Text height={1.25}>{data?.symbol}</Elements.Text>
                                                <Elements.Text height={1.25} opacity={0.3} fix>
                                                    {data?.name}
                                                </Elements.Text>
                                            </Layouts.Col>
                                        </>,
                                    ],
                                ],
                            },
                            {
                                style: { flex: 3 },
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
                                                                {format(data?.rateChangeRate, "currency", { unit: 9, limit: 12, fix: 3 })}
                                                            </Elements.Text>
                                                            <Elements.Text align={"left"} opacity={0.6} style={{ minWidth: "6em" }}>
                                                                MECA
                                                            </Elements.Text>
                                                        </>
                                                    ),
                                                },
                                                {
                                                    align: "right",
                                                    change: sign(data?.rateChangeRate) === "+" ? "green" : sign(data?.rateChangeRate) === "-" && "red",
                                                    children: (
                                                        <>
                                                            <Elements.Text align={"right"} change>
                                                                {format(data?.rateChange, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
                                                            </Elements.Text>
                                                            <Elements.Text align={"left"} opacity={0.6} style={{ minWidth: "6em" }} change>
                                                                %
                                                            </Elements.Text>
                                                        </>
                                                    ),
                                                },
                                            ],
                                        },
                                        {
                                            style: {
                                                gap: 0,
                                                ...(props?.responsive && {
                                                    display: "none",
                                                }),
                                            },
                                            children: [
                                                {
                                                    align: "right",
                                                    children: (
                                                        <>
                                                            <Elements.Text align={"right"}>
                                                                {format(data?.locked, "currency", { unit: 9, limit: 12, fix: 3 })}
                                                            </Elements.Text>
                                                            <Elements.Text align={"left"} opacity={0.6} style={{ minWidth: "6em" }}>
                                                                {data?.symbol}
                                                            </Elements.Text>
                                                        </>
                                                    ),
                                                },
                                                {
                                                    align: "right",
                                                    style: { opacity: 0.3 },
                                                    children: (
                                                        <>
                                                            <Elements.Text align={"right"}>
                                                                {sign(data?.lockedChange)}{" "}
                                                                {format(data?.lockedChange, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
                                                            </Elements.Text>
                                                            <Elements.Text align={"left"} opacity={0.6} style={{ minWidth: "6em" }}>
                                                                {data?.symbol}
                                                            </Elements.Text>
                                                        </>
                                                    ),
                                                },
                                            ],
                                        },
                                        {
                                            style: {
                                                gap: 0,
                                                ...(props?.responsive && {
                                                    display: "none",
                                                }),
                                            },
                                            children: [
                                                {
                                                    align: "right",
                                                    children: (
                                                        <Elements.Text align={"right"}>
                                                            $ {format(data?.valueLocked, "currency", { unit: 9, limit: 12, fix: 3 })}
                                                        </Elements.Text>
                                                    ),
                                                },
                                                {
                                                    align: "right",
                                                    style: { opacity: 0.3 },
                                                    children: (
                                                        <>
                                                            <Elements.Text align={"right"} fix>
                                                                {sign(data?.valueLockedChange)}${" "}
                                                                {format(data?.valueLockedChange, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
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
                    ],
                ],
            }))
        );
    };

    const sorts = {
        symbol: { key: "symbol", type: "string" },
        name: { key: "name", type: "string" },
        rateChangeRate: { key: "rateChangeRate", type: "number" },
        rateChange: { key: "rateChange", type: "number" },
        locked: { key: "locked", type: "number" },
        lockedChange: { key: "lockedChange", type: "number" },
        valueLocked: { key: "valueLocked", type: "number" },
        valueLockedChange: { key: "valueLockedChange", type: "number" },
    };

    return (
        <Layouts.Contents.InnerContent>
            <Layouts.Row fix style={{ overflow: "auto hidden" }}>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.symbol)} onClick={() => setSort(sorts.symbol)}>
                        Symbol
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.name)} onClick={() => setSort(sorts.name)}>
                        Name
                    </Controls.Tab>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.rateChangeRate)} onClick={() => setSort(sorts.rateChangeRate)}>
                        Exchange Rate
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.rateChange)} onClick={() => setSort(sorts.rateChange)}>
                        Change
                    </Controls.Tab>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.locked)} onClick={() => setSort(sorts.locked)}>
                        Total
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.lockedChange)} onClick={() => setSort(sorts.lockedChange)}>
                        Total Change
                    </Controls.Tab>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.valueLocked)} onClick={() => setSort(sorts.valueLocked)}>
                        valueLocked
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.valueLockedChange)} onClick={() => setSort(sorts.valueLockedChange)}>
                        valueLocked Change
                    </Controls.Tab>
                </Layouts.Row>
            </Layouts.Row>
            <Layouts.Divider />
            <Layouts.List list={filter(sorting(props?.assets), props?.filter)} formatter={formatter} />
        </Layouts.Contents.InnerContent>
    );
}
