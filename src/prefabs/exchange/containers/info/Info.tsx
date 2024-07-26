"use client";
import { Elements, Layouts } from "components";
import { useWindowSize } from "hooks";
import { Root } from "lib/style";
import { format, sign } from "lib/utils";
import { Token } from "types/web3";

export interface Info {
    info?: ExchangeInfo;
    base?: Token;
    quote?: Token;
    responsive?: boolean;
}

export interface ExchangeInfo {
    volume_base?: number | string;
    volume_quote?: number | string;
    high?: number | string;
    low?: number | string;
    change?: number | string;
    change_rate?: number | string;
    balance?: number | string;
    using?: number | string;
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
                        Volume ({props?.base?.symbol})
                    </Elements.Text>
                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                        {format(props?.info?.volume_base, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                        {format(props?.info?.volume_quote, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                        {format(props?.info?.high, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                        {format(props?.info?.low, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                        {sign(props?.info?.change)} {format(props?.info?.change, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
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
                        {sign(props?.info?.change_rate)} {format(props?.info?.change_rate, "currency", { unit: 9, limit: 12, fix: 3, sign: false })} %
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
                        Balance
                    </Elements.Text>
                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                        {format(props?.info?.volume_base, "currency")}
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
                        Using
                    </Elements.Text>
                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                        {format(props?.info?.volume_base, "currency")}
                    </Elements.Text>
                </Layouts.Row>
            </Layouts.Col>
        </Layouts.Row>
    );
}
