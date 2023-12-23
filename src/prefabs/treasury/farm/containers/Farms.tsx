"use client";
import { Controls, Elements, Layouts } from "components";
import { Filter, Format, Sign } from "lib/utils";
import { Farm } from "types/web3";
import { useSort } from "hooks";

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
                                                    <Elements.Text align={"right"}>{Format(data?.rewards, "currency", true)}</Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "6em" }}>
                                                        {data?.reward?.symbol?.toUpperCase()}
                                                    </Elements.Text>
                                                </>
                                            ),
                                        },
                                        {
                                            align: "right",
                                            change: Sign(data?.rewards_rate) === "+" ? "green" : Sign(data?.rewards_rate) === "-" && "red",
                                            children: (
                                                <>
                                                    <Elements.Text align={"right"} change>
                                                        {data?.rewards_rate}
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
                                                    <Elements.Text align={"right"}>{Format(data?.tl, "currency", true)}</Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "6em" }}>
                                                        {data?.stake?.symbol?.toUpperCase()}
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
                                                        {Sign(data?.tl_change)} {Format(data?.tl_change, "currency", true)}
                                                    </Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "6em" }}>
                                                        {data?.stake?.symbol?.toUpperCase()}
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
                                //                 <Elements.Text align={"right"}>$ {Format(data?.tvl, "currency", true)}</Elements.Text>
                                //             </Layouts.Row>
                                //         </>,
                                //         <>
                                //             <Layouts.Row gap={1} style={{ opacity: 0.3 }}>
                                //                 <Elements.Text align={"right"} fix>
                                //                     {Sign(data?.tvl_change)}$ {Math.abs(Format(data?.tvl_change, "currency", true) as number)}
                                //                 </Elements.Text>
                                //             </Layouts.Row>
                                //         </>,
                                //     ],
                                // },
                            ],
                        },
                    ],
                ],
            }))
        );
    };

    const sorts = {
        symbol: { key: "symbol", type: "string" },
        name: { key: "name", type: "string" },
        rewards: { key: "rewards", type: "number" },
        rewards_rate: { key: "rewards_rate", type: "number" },
        tl: { key: "tl", type: "number" },
        tl_change: { key: "tl_change", type: "number" },
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
                    <Controls.Tab iconLeft={sortArrow(sorts.rewards)} onClick={() => setSort(sorts.rewards)}>
                        Interest
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.rewards_rate)} onClick={() => setSort(sorts.rewards_rate)}>
                        Interest Rate
                    </Controls.Tab>
                </Layouts.Row>
                {/* <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.tl)} onClick={() => setSort(sorts.tl)}>
                        Rewards Change
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.tl_change)} onClick={() => setSort(sorts.tl_change)}>
                        Rewards Change Rate
                    </Controls.Tab>
                </Layouts.Row> */}
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.tl)} onClick={() => setSort(sorts.tl)}>
                        Total Locked
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.tl_change)} onClick={() => setSort(sorts.tl_change)}>
                        Total Locked Change
                    </Controls.Tab>
                </Layouts.Row>
            </Layouts.Row>
            <Layouts.Divider />
            <Layouts.List list={Filter(sorting(props?.farms), props?.filter)} formatter={formatter} />
        </Layouts.Contents.InnerContent>
    );
}
