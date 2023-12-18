"use client";
import { useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Filter, Format } from "lib/utils";
import { Token } from "types/web3";
import { Asset } from "prefabs";
import { useSort } from "hooks";

export interface View {
    info?: any;
    assets?: Token[];
    onSelect?: Function;
    responsive?: boolean;
}

export default function View(props: any) {
    const [mobile, setMobile] = useState("asset");
    const { sorting, setSort, sortArrow } = useSort();

    const info = props?.info;

    const sorts = {
        symbol: { key: "symbol", type: "string" },
        name: { key: "name", type: "string" },
        balance: { key: "balance", type: "number" },
        using: { key: "using", type: "number" },
        balanceUSD: { key: "balance", type: "number" },
        usingUSD: { key: "using", type: "number" },
    };

    const handleSelectedAsset = (data: Token) => {
        if (typeof props?.onSelect === "function") props?.onSelect(data);
    };

    const assetListFormatter = (data: Token[]) => {
        return (
            typeof data !== "string" &&
            data?.length > 0 &&
            data?.map((data: Token) => ({
                onClick: () => handleSelectedAsset(data),
                style: { padding: "2em" },
                children: [
                    {
                        style: { flex: 1 },
                        children: [
                            {
                                style: { maxWidth: "max-content" },
                                children: (
                                    <>
                                        <Elements.Avatar
                                            size={props?.responsive ? 4 : 3.5}
                                            img={require(`../../../assets/coins/${data?.symbol?.toLowerCase()}.png`)}
                                        />
                                    </>
                                ),
                            },
                            [
                                {
                                    style: { gap: "0" },
                                    children: [
                                        <>
                                            <Elements.Text height={1.25}>{data?.symbol}</Elements.Text>
                                        </>,
                                        <>
                                            <Elements.Text height={1.25} opacity={0.3}>
                                                {data?.name}
                                            </Elements.Text>
                                        </>,
                                    ],
                                },
                            ],
                        ],
                    },
                    {
                        style: { flex: 2 },
                        children: [
                            [
                                {
                                    style: { gap: 0 },
                                    children: [
                                        <>
                                            <Layouts.Row gap={1}>
                                                <Elements.Text align={"right"}>{data?.balance}</Elements.Text>
                                                <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "6em" }}>
                                                    {data?.symbol}
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </>,
                                        <>
                                            <Layouts.Row gap={1} style={{ opacity: 0.3 }}>
                                                <Elements.Text align={"right"}>{data?.using}</Elements.Text>
                                                <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "6em" }}>
                                                    {data?.symbol}
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </>,
                                    ],
                                },
                                {
                                    style: { gap: 0 },
                                    children: [
                                        <>
                                            <Layouts.Row gap={1}>
                                                <Elements.Text align={"right"}>$ {data?.using}</Elements.Text>
                                                <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "6em" }}>
                                                    USD
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </>,
                                        <>
                                            <Layouts.Row gap={1} style={{ opacity: 0.3 }}>
                                                <Elements.Text align={"right"}>$ {data?.using}</Elements.Text>
                                                <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "6em" }}>
                                                    USD
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </>,
                                    ],
                                },
                            ],
                        ],
                    },
                ],
            }))
        );
    };

    const [keyword, setKeyword] = useState("");

    return (
        <Layouts.Contents.InnerContent>
            <Layouts.Row fix style={{ minHeight: "4em", alignItems: "center" }}>
                <Layouts.Row fix style={{ alignItems: "center" }} gap={2} fit>
                    <Layouts.Row responsive={"mobile"} gap={1} fit>
                        <Elements.Text size={2.5} height={1} style={{ marginRight: "1em" }} responsive={{ device: "mobile", size: 2 }}>
                            All Assets
                        </Elements.Text>
                    </Layouts.Row>
                </Layouts.Row>
                <Layouts.Row fix align="right">
                    <Layouts.Row fix fit gap={1} style={{ alignItems: "center" }}>
                        <Elements.Text size={2.5} height={1} responsive={{ device: "mobile", size: 2 }} change>
                            $ {Format("1,567,851,378.516", "currency", true)}
                        </Elements.Text>
                    </Layouts.Row>
                </Layouts.Row>
            </Layouts.Row>
            <Layouts.Divider style={{ marginTop: "1em" }} />
            <Layouts.Col show={"mobile"} gap={0}>
                <Layouts.Row gap={1} fix>
                    <Controls.Tab active={mobile === "info"} onClick={() => setMobile("info")}>
                        Info
                    </Controls.Tab>
                    <Controls.Tab active={mobile === "asset"} onClick={() => setMobile("asset")}>
                        Assets
                    </Controls.Tab>
                </Layouts.Row>
                <Layouts.Divider />
            </Layouts.Col>
            <Layouts.Contents.GridContainer
                fullsize
                area={`'info' 'asset'`}
                width={"1fr"}
                height={"max-content 1fr"}
                gap={3}
                responsive={[
                    {
                        device: "mobile",
                        area: `'area'`,
                        width: "1fr",
                        height: "1fr max-content",
                        gap: { col: 0, row: 2 },
                    },
                ]}
                contents={[
                    {
                        area: "info",
                        children: (
                            <Layouts.Contents.SlideContent active={props?.responsive ? mobile === "info" : true}>
                                <Asset.Containers.Info info={props?.info} responsive={props?.responsive} />
                            </Layouts.Contents.SlideContent>
                        ),
                        responsive: [
                            {
                                device: "mobile",
                                area: "area",
                            },
                        ],
                    },
                    {
                        area: "asset",
                        children: (
                            <Layouts.Contents.SlideContent active={props?.responsive ? mobile === "asset" : true}>
                                <Layouts.Contents.InnerContent>
                                    <Layouts.Menu
                                        // hide="mobile"
                                        menu={[
                                            {
                                                style: { padding: "1em 0" },
                                                children: [
                                                    {
                                                        hide: "mobile",
                                                        children: [
                                                            <>
                                                                <Controls.Tab disabled>Assets</Controls.Tab>
                                                            </>,
                                                        ],
                                                    },
                                                    {
                                                        style: { maxWidth: "64em" },
                                                        children: [
                                                            <>
                                                                <Controls.Input
                                                                    style={{ width: "100%" }}
                                                                    left={{ children: <Elements.Icon icon={"search"} /> }}
                                                                    placeholder={"Search asset"}
                                                                    value={keyword}
                                                                    onChange={(e: any, v: string) => setKeyword(v)}
                                                                />
                                                            </>,
                                                        ],
                                                    },
                                                ],
                                            },
                                        ]}
                                    />
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
                                            <Controls.Tab iconLeft={sortArrow(sorts.balance)} onClick={() => setSort(sorts.balance)}>
                                                Balance
                                            </Controls.Tab>
                                            <Controls.Tab iconLeft={sortArrow(sorts.using)} onClick={() => setSort(sorts.using)}>
                                                Using
                                            </Controls.Tab>
                                        </Layouts.Row>
                                        <Layouts.Row gap={0} fix>
                                            <Controls.Tab iconLeft={sortArrow(sorts.balanceUSD)} onClick={() => setSort(sorts.balanceUSD)}>
                                                Balance (USD)
                                            </Controls.Tab>
                                            <Controls.Tab iconLeft={sortArrow(sorts.usingUSD)} onClick={() => setSort(sorts.usingUSD)}>
                                                Using (USD)
                                            </Controls.Tab>
                                        </Layouts.Row>
                                    </Layouts.Row>
                                    <Layouts.Divider />
                                    <Layouts.List
                                        list={Filter(sorting(props?.assets), keyword)}
                                        formatter={assetListFormatter}
                                        fallback={"There is no assets yet."}
                                    />
                                </Layouts.Contents.InnerContent>
                            </Layouts.Contents.SlideContent>
                        ),
                        responsive: [
                            {
                                device: "mobile",
                                area: "area",
                            },
                        ],
                    },
                ]}
            />
        </Layouts.Contents.InnerContent>
    );
}
