"use client";
import { useState } from "react";
import { Controls, Elements, Layouts } from "components";
import { Format } from "lib/utils";
import { Root } from "lib/style";
import { Token } from "types/web3";
import useWindowSize from "hooks/useWindowSize";

export interface View {
    info?: any;
    assets?: Token[];
    onSelect?: Function;
}

export default function View(props: any) {
    const { windowSize } = useWindowSize();
    const [mobile, setMobile] = useState("asset");
    const responsive = windowSize.width > Root.Device.Mobile;

    const info = props?.info;

    const handleSelectedAsset = (data: Token) => {
        if (typeof props?.onSelect === "function") props?.onSelect(data);
    };

    const assetListFormatter = (data: Token[]) => {
        return (
            typeof data !== "string" &&
            data?.length > 0 &&
            data?.map((data: Token) => ({
                onClick: () => handleSelectedAsset(data),
                style: { flex: 1, padding: responsive && "2em" },
                children: [
                    {
                        style: { flex: 1 },
                        children: [
                            {
                                style: { maxWidth: "max-content" },
                                children: (
                                    <>
                                        <Elements.Avatar
                                            size={responsive ? 4 : 3}
                                            style={{ marginRight: responsive && "1em" }}
                                            img={require(`/src/assets/coins/${data?.symbol?.toLowerCase()}.png`)}
                                        />
                                    </>
                                ),
                            },
                            [
                                {
                                    style: { gap: "0" },
                                    children: [
                                        <>
                                            <Elements.Text>{data?.symbol}</Elements.Text>
                                        </>,
                                        <>
                                            <Elements.Text weight={"normal"} opacity={0.6}>
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
                                            <Layouts.Row gap={1}>
                                                <Elements.Text align={"right"}>$ {data?.using}</Elements.Text>
                                                <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "6em" }}>
                                                    USD
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </>,
                                    ],
                                },
                                {
                                    style: { gap: 0 },
                                    children: [
                                        <>
                                            <Layouts.Row gap={1} style={{ width: "100%" }}>
                                                <Elements.Text align={"right"}>{data?.using}</Elements.Text>
                                                <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "6em" }}>
                                                    {data?.symbol}
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </>,
                                        <>
                                            <Layouts.Row gap={1} style={{ width: "100%" }}>
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

    return (
        <>
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
                            <Layouts.Contents.SlideContent active={responsive ? true : mobile === "info"}>
                                <Layouts.Row
                                    fix
                                    responsive="mobile"
                                    gap={responsive ? 4 : 1}
                                    style={{
                                        marginTop: "0.5em",
                                        alignItems: "center",
                                        ...(!responsive && { height: "100%" }),
                                    }}
                                >
                                    <Layouts.Col gap={0.5}>
                                        <Layouts.Row
                                            fix
                                            gap={1}
                                            style={{
                                                alignItems: "center",
                                                padding: "0.5em",
                                                ...(!responsive && { height: "100%" }),
                                            }}
                                        >
                                            <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                Volume
                                            </Elements.Text>
                                            <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                {Format(info?.volume_base, "currency", true)}
                                            </Elements.Text>
                                        </Layouts.Row>
                                        <Layouts.Row
                                            fix
                                            gap={1}
                                            style={{
                                                alignItems: "center",
                                                padding: "0.5em",
                                                ...(!responsive && { height: "100%" }),
                                            }}
                                        >
                                            <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                Volume
                                            </Elements.Text>
                                            <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                {Format(info?.volume_quote, "currency", true)}
                                            </Elements.Text>
                                        </Layouts.Row>
                                    </Layouts.Col>
                                    <Layouts.Col gap={0.5}>
                                        <Layouts.Row
                                            fix
                                            gap={1}
                                            style={{
                                                alignItems: "center",
                                                padding: "0.5em",
                                                ...(!responsive && { height: "100%" }),
                                            }}
                                        >
                                            <Elements.Text opacity={0.6} style={{ minWidth: "max-content" }}>
                                                Highest
                                            </Elements.Text>
                                            <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"green"}>
                                                {Format(info?.high, "currency", true)}
                                            </Elements.Text>
                                        </Layouts.Row>
                                        <Layouts.Row
                                            fix
                                            gap={1}
                                            style={{
                                                alignItems: "center",
                                                padding: "0.5em",
                                                ...(!responsive && { height: "100%" }),
                                            }}
                                        >
                                            <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                Lowest
                                            </Elements.Text>
                                            <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"red"}>
                                                {Format(info?.low, "currency", true)}
                                            </Elements.Text>
                                        </Layouts.Row>
                                    </Layouts.Col>
                                    <Layouts.Col gap={0.5}>
                                        <Layouts.Row
                                            fix
                                            gap={1}
                                            style={{
                                                alignItems: "center",
                                                padding: "0.5em",
                                                ...(!responsive && { height: "100%" }),
                                            }}
                                        >
                                            <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                Change
                                            </Elements.Text>
                                            <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} change>
                                                {Format(info?.volume_base, "currency", true)}
                                            </Elements.Text>
                                        </Layouts.Row>
                                        <Layouts.Row
                                            fix
                                            gap={1}
                                            style={{
                                                alignItems: "center",
                                                padding: "0.5em",
                                                ...(!responsive && { height: "100%" }),
                                            }}
                                        >
                                            <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                Change Rate
                                            </Elements.Text>
                                            <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} change>
                                                {Format(info?.volume_base, "currency", true)}
                                            </Elements.Text>
                                        </Layouts.Row>
                                    </Layouts.Col>
                                    <Layouts.Col gap={0.5}>
                                        <Layouts.Row
                                            fix
                                            gap={1}
                                            style={{
                                                alignItems: "center",
                                                padding: "0.5em",
                                                ...(!responsive && { height: "100%" }),
                                            }}
                                        >
                                            <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                Balance
                                            </Elements.Text>
                                            <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                {Format(info?.volume_base, "currency", true)}
                                            </Elements.Text>
                                        </Layouts.Row>
                                        <Layouts.Row
                                            fix
                                            gap={1}
                                            style={{
                                                alignItems: "center",
                                                padding: "0.5em",
                                                ...(!responsive && { height: "100%" }),
                                            }}
                                        >
                                            <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                Using
                                            </Elements.Text>
                                            <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                {Format(info?.volume_base, "currency", true)}
                                            </Elements.Text>
                                        </Layouts.Row>
                                    </Layouts.Col>
                                </Layouts.Row>
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
                            <Layouts.Contents.SlideContent active={responsive ? true : mobile === "asset"}>
                                <Layouts.Menu
                                    hide="mobile"
                                    menu={[
                                        [
                                            <>
                                                <Controls.Tab disabled>Assets</Controls.Tab>
                                            </>,
                                        ],
                                    ]}
                                />
                                <Layouts.List list={assetListFormatter(props?.assets)} noData={"There is no assets yet."} />
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
        </>
    );
}
