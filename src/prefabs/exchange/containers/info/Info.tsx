"use client";
import { Elements, Layouts } from "components";
import { Format, Sign } from "lib/utils";
import { Root } from "lib/style";
import { useWindowSize } from "hooks";
import { Token } from "types/web3";

export interface Info {
    info?: ExchangeInfo;
    base?: Token;
    quote?: Token;
    responsive?: boolean;
}

interface Pair {
    base?: number | string;
    quote?: number | string;
}
export interface ExchangeInfo {
    volume_base?: number | string;
    volume_quote?: number | string;
    high?: number | string;
    low?: number | string;
    change?: number | string;
    changeRate?: number | string;
    balance?: number | string;
    using?: number | string;
    volume?: Pair;
    liquidity?: Pair;
}

export default function Info(props: Info) {
    const { windowSize } = useWindowSize();
    return (
        <Layouts.Row
            fix
            responsive="mobile"
            gap={windowSize.width > Root.Device.Mobile ? 4 : 1}
            style={{
                marginTop: "0.5em",
                alignItems: "center",
                ...(props?.responsive && { height: "100%" }),
            }}
        >
            <Layouts.Col gap={0.5}>
                <Layouts.Row
                    fix
                    gap={1}
                    style={{
                        alignItems: "center",
                        padding: "0.5em",
                        ...(props?.responsive && { height: "100%" }),
                    }}
                >
                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                        Liquidity ({props?.base?.symbol})
                    </Elements.Text>
                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                        {Format(props?.info?.liquidity?.base, "currency", { unit: 9, limit: 12, fix: 3 })}
                    </Elements.Text>
                </Layouts.Row>
                <Layouts.Row
                    fix
                    gap={1}
                    style={{
                        alignItems: "center",
                        padding: "0.5em",
                        ...(props?.responsive && { height: "100%" }),
                    }}
                >
                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                        Liquidity ({props?.quote?.symbol})
                    </Elements.Text>
                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                        {Format(props?.info?.liquidity?.quote, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                        ...(props?.responsive && { height: "100%" }),
                    }}
                >
                    <Elements.Text opacity={0.6} style={{ minWidth: "max-content" }}>
                        Highest
                    </Elements.Text>
                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"green"}>
                        {Format(props?.info?.high, "currency", { unit: 9, limit: 12, fix: 3 })}
                    </Elements.Text>
                </Layouts.Row>
                <Layouts.Row
                    fix
                    gap={1}
                    style={{
                        alignItems: "center",
                        padding: "0.5em",
                        ...(props?.responsive && { height: "100%" }),
                    }}
                >
                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                        Lowest
                    </Elements.Text>
                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"red"}>
                        {Format(props?.info?.low, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                        ...(props?.responsive && { height: "100%" }),
                    }}
                >
                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                        Change
                    </Elements.Text>
                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} change>
                        {Sign(props?.info?.change)} {Format(props?.info?.change, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
                    </Elements.Text>
                </Layouts.Row>
                <Layouts.Row
                    fix
                    gap={1}
                    style={{
                        alignItems: "center",
                        padding: "0.5em",
                        ...(props?.responsive && { height: "100%" }),
                    }}
                >
                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                        Change Rate
                    </Elements.Text>
                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} change>
                        {Sign(props?.info?.changeRate)} {Format(props?.info?.changeRate, "currency", { unit: 9, limit: 12, fix: 3, sign: false })} %
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
                        ...(props?.responsive && { height: "100%" }),
                    }}
                >
                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                        Volume ({props?.base?.symbol})
                    </Elements.Text>
                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                        {Format(props?.info?.volume?.base, "currency", { unit: 9, limit: 12, fix: 3 })}
                    </Elements.Text>
                </Layouts.Row>
                <Layouts.Row
                    fix
                    gap={1}
                    style={{
                        alignItems: "center",
                        padding: "0.5em",
                        ...(props?.responsive && { height: "100%" }),
                    }}
                >
                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                        Volume ({props?.quote?.symbol})
                    </Elements.Text>
                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                        {Format(props?.info?.volume?.quote, "currency", { unit: 9, limit: 12, fix: 3 })}
                    </Elements.Text>
                </Layouts.Row>
            </Layouts.Col>
        </Layouts.Row>
    );
}
