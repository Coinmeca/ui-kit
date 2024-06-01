"use client";
import { Controls, Elements, Layouts } from "components";
import { useSort } from "hooks";
import { Filter, Format, Sign } from "lib/utils";
import { Farm } from "types/web3";

export interface Assets {
    farms?: Farm[];
    filter?: string;
    responsive?: boolean;
    onSelect?: Function;
}

export default function Assets(props: Assets) {
    const { sorting, setSort, sortArrow } = useSort();

    const formatter = (data: Farm[] | undefined) => {
        return (
            data &&
            typeof data !== "string" &&
            data?.length > 0 &&
            data?.map((data: Farm) => ({
                onClick: () => {
                    if (typeof props?.onSelect === "function") props?.onSelect(data);
                },
                style: { padding: "2em" },
                children: [
                    [
                        [
                            [
                                {
                                    style: { flex: 1 },
                                    children: [
                                        {
                                            style: { maxWidth: "max-content" },
                                            children: (
                                                <Elements.Avatar
                                                    size={props?.responsive ? 3.5 : 4}
                                                    style={{ maxWidth: "max-content" }}
                                                    img={require(`../../../../assets/coins/${data?.stake?.symbol?.toLowerCase()}.png`)}
                                                />
                                            ),
                                        },
                                        <>
                                            <Layouts.Col gap={0}>
                                                <Elements.Text height={1.25}>{data?.name}</Elements.Text>
                                                <Elements.Text height={1.25} opacity={0.3} fix>
                                                    {data?.type === 0 ? "Main" : "Derive"}
                                                </Elements.Text>
                                            </Layouts.Col>
                                        </>,
                                    ],
                                },
                            ],
                            [
                                {
                                    style: { flex: 2 },
                                    children: [
                                        {
                                            gap: 0,
                                            children: [
                                                {
                                                    align: "right",
                                                    children: (
                                                        <>
                                                            <Elements.Text align={"right"}>
                                                                {Format(data?.interest, "currency", { unit: 9, limit: 12, fix: 3 })}
                                                            </Elements.Text>
                                                            <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "6em" }}>
                                                                {data?.earn?.symbol}
                                                            </Elements.Text>
                                                        </>
                                                    ),
                                                },
                                                {
                                                    align: "right",
                                                    change: Sign(data?.interestChange) === "+" ? "green" : Sign(data?.interestChange) === "-" && "red",
                                                    children: (
                                                        <>
                                                            <Elements.Text align={"right"} change>
                                                                {data?.interestChange}
                                                            </Elements.Text>
                                                            <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "6em" }} change>
                                                                %
                                                            </Elements.Text>
                                                        </>
                                                    ),
                                                },
                                            ],
                                        },
                                        {
                                            gap: 0,
                                            style: {
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
                                                                {Format(data?.staked, "currency", { unit: 9, limit: 12, fix: 3 })}
                                                            </Elements.Text>
                                                            <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "6em" }}>
                                                                {data?.stake?.symbol}
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
                                                                {Sign(data?.stakedChange)}{" "}
                                                                {Format(data?.stakedChange, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
                                                            </Elements.Text>
                                                            <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "6em" }}>
                                                                {data?.stake?.symbol}
                                                            </Elements.Text>
                                                        </>
                                                    ),
                                                },
                                            ],
                                        },
                                        // {
                                        //     style: {
                                        //         gap: 0,
                                        //         ...(props?.responsive && {
                                        //             display: "none",
                                        //         }),
                                        //     },
                                        //     children: [
                                        //         <>
                                        //             <Layouts.Row gap={1}>
                                        //                 <Elements.Text align={"right"}>$ {Format(data?.valueLocked, "currency", { unit: 9, limit: 12, fix: 3 })}</Elements.Text>
                                        //             </Layouts.Row>
                                        //         </>,
                                        //         <>
                                        //             <Layouts.Row gap={1} style={{ opacity: 0.3 }}>
                                        //                 <Elements.Text align={"right"} fix>
                                        //                     {Sign(data?.valuestakedChange)}$ {Math.abs(Format(data?.valuestakedChange, "currency", { unit: 9, limit: 12, fix: 3 }) as number)}
                                        //                 </Elements.Text>
                                        //             </Layouts.Row>
                                        //         </>,
                                        //     ],
                                        // },
                                    ],
                                },
                            ],
                        ],
                    ],
                ],
            }))
        );
    };

    const sorts = {
        symbol: { key: "symbol", type: "string" },
        name: { key: "name", type: "string" },
        interest: { key: "interest", type: "number" },
        interestChange: { key: "interestChange", type: "number" },
        staked: { key: "staked", type: "number" },
        stakedChange: { key: "stakedChange", type: "number" },
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
                    <Controls.Tab iconLeft={sortArrow(sorts.interest)} onClick={() => setSort(sorts.interest)}>
                        Interest
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.interestChange)} onClick={() => setSort(sorts.interestChange)}>
                        Interest Rate
                    </Controls.Tab>
                </Layouts.Row>
                {/* <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.staked)} onClick={() => setSort(sorts.staked)}>
                        interest Change
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.stakedChange)} onClick={() => setSort(sorts.stakedChange)}>
                        interest Change Rate
                    </Controls.Tab>
                </Layouts.Row> */}
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.staked)} onClick={() => setSort(sorts.staked)}>
                        Total staked
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.stakedChange)} onClick={() => setSort(sorts.stakedChange)}>
                        Total staked Change
                    </Controls.Tab>
                </Layouts.Row>
            </Layouts.Row>
            <Layouts.Divider />
            <Layouts.List list={Filter(sorting(props?.farms), props?.filter)} formatter={formatter} />
        </Layouts.Contents.InnerContent>
    );
}
