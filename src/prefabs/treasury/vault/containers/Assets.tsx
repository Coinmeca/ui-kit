"use client";
import { Controls, Elements, Layouts } from "components";
import { Format, Sign } from "lib/utils";
import { Asset } from "types/web3";
import { useSort } from "hooks";

export interface Assets {
    assets?: Asset[];
    responsive?: boolean;
    onSelect?: Function;
}

export default function Assets(props: Assets) {
    const { sorting, setSort, sortArrow } = useSort();

    const assetListFormatter = (data: Asset[] | undefined) => {
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
                                    style: { gap: 0 },
                                    children: [
                                        <>
                                            <Layouts.Row gap={1}>
                                                <Elements.Text align={"right"}>{data?.exchange_rate}</Elements.Text>
                                                <Elements.Text opacity={0.6} style={{ maxWidth: "6em" }}>
                                                    MECA
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </>,
                                        <>
                                            <Layouts.Row
                                                gap={1}
                                                change={Sign(data?.exchange_rate) === "+" ? "green" : Sign(data?.exchange_rate) === "-" && "red"}
                                            >
                                                <Elements.Text align={"right"} change>
                                                    {data?.exchange_rate_change}
                                                </Elements.Text>
                                                <Elements.Text opacity={0.6} style={{ maxWidth: "6em" }} change>
                                                    %
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </>,
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
                                        <>
                                            <Layouts.Row gap={1}>
                                                <Elements.Text align={"right"}>{Format(data?.tv, "currency", true)}</Elements.Text>
                                                <Elements.Text opacity={0.6} style={{ maxWidth: "6em" }}>
                                                    {data?.symbol}
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </>,
                                        <>
                                            <Layouts.Row gap={1} style={{ opacity: 0.3 }}>
                                                <Elements.Text align={"right"}>
                                                    {Sign(data?.tv_change)} {Format(data?.tv_change, "currency", true)}
                                                </Elements.Text>
                                                <Elements.Text opacity={0.6} style={{ maxWidth: "6em" }}>
                                                    {data?.symbol}
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </>,
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
                                        <>
                                            <Layouts.Row gap={1}>
                                                <Elements.Text align={"right"}>$ {Format(data?.tvl, "currency", true)}</Elements.Text>
                                            </Layouts.Row>
                                        </>,
                                        <>
                                            <Layouts.Row gap={1} style={{ opacity: 0.3 }}>
                                                <Elements.Text align={"right"} fix>
                                                    {Sign(data?.tvl_change)}$ {Math.abs(Format(data?.tvl_change, "currency", true) as number)}
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </>,
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
        tl: { key: "tv", type: "number" },
        tl_change: { key: "tv_change", type: "number" },
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
            <Layouts.List list={sorting(props?.assets)} formatter={assetListFormatter} />
        </Layouts.Contents.InnerContent>
    );
}
