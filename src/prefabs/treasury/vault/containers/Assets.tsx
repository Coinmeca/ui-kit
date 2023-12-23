"use client";
import { Controls, Elements, Layouts } from "components";
import { Filter, Format, Sign } from "lib/utils";
import { Asset } from "types/web3";
import { useSort } from "hooks";

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
                        {
                            style: { flex: 1, maxWidth: "20%" },
                            children: [
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
                        },
                        {
                            style: { flex: 3 },
                            children: [
                                {
                                    gap: 0,
                                    children: [
                                        {
                                            align: "right",
                                            children: (
                                                <>
                                                    <Elements.Text align={"right"}>{Format(data?.exchange_rate, "currency", true)}</Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.6} style={{ minWidth: "6em" }}>
                                                        MECA
                                                    </Elements.Text>
                                                </>
                                            ),
                                        },
                                        {
                                            align: "right",
                                            change: Sign(data?.exchange_rate) === "+" ? "green" : Sign(data?.exchange_rate) === "-" && "red",
                                            children: (
                                                <>
                                                    <Elements.Text align={"right"} change>
                                                        {Format(data?.exchange_rate_change, "currency", true)}
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
                                                    <Elements.Text align={"right"}>{Format(data?.tl, "currency", true)}</Elements.Text>
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
                                                        {Sign(data?.tl_change)} {Format(data?.tl_change, "currency", true)}
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
                                            children: <Elements.Text align={"right"}>$ {Format(data?.tvl, "currency", true)}</Elements.Text>,
                                        },
                                        {
                                            align: "right",
                                            style: { opacity: 0.3 },
                                            children: (
                                                <>
                                                    <Elements.Text align={"right"} fix>
                                                        {Sign(data?.tvl_change)}$ {Math.abs(Format(data?.tvl_change, "currency", true) as number)}
                                                    </Elements.Text>
                                                </>
                                            ),
                                        },
                                    ],
                                },
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
        exchange_rate: { key: "exchange_rate", type: "number" },
        exchange_rate_change: { key: "exchange_rate_change", type: "number" },
        tl: { key: "tl", type: "number" },
        tl_change: { key: "tl_change", type: "number" },
        tvl: { key: "tvl", type: "number" },
        tvl_change: { key: "tvl_change", type: "number" },
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
                    <Controls.Tab iconLeft={sortArrow(sorts.exchange_rate)} onClick={() => setSort(sorts.exchange_rate)}>
                        Exchange Rate
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.exchange_rate_change)} onClick={() => setSort(sorts.exchange_rate_change)}>
                        Change
                    </Controls.Tab>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.tl)} onClick={() => setSort(sorts.tl)}>
                        Total
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.tl_change)} onClick={() => setSort(sorts.tl_change)}>
                        Total Change
                    </Controls.Tab>
                </Layouts.Row>
                <Layouts.Row gap={0} fix>
                    <Controls.Tab iconLeft={sortArrow(sorts.tvl)} onClick={() => setSort(sorts.tvl)}>
                        TVL
                    </Controls.Tab>
                    <Controls.Tab iconLeft={sortArrow(sorts.tvl_change)} onClick={() => setSort(sorts.tvl_change)}>
                        TVL Change
                    </Controls.Tab>
                </Layouts.Row>
            </Layouts.Row>
            <Layouts.Divider />
            <Layouts.List list={Filter(sorting(props?.assets), props?.filter)} formatter={formatter} />
        </Layouts.Contents.InnerContent>
    );
}
