"use client";
import { Elements, Layouts } from "components";
import { Format, Sign } from "lib/utils";
import { Asset } from "types/web3";

export interface Assets {
    assets?: Asset[];
    responsive?: boolean;
    onSelect?: Function;
}

export default function Assets(props: Assets) {
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
                                            img={require(`/src/assets/coins/${data?.symbol?.toLowerCase()}.png`)}
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
                                    style: { gap: 0, ...(props?.responsive && { display: "none" }) },
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
                                    style: { gap: 0, ...(props?.responsive && { display: "none" }) },
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

    return <Layouts.List list={assetListFormatter(props?.assets)} />;
}
