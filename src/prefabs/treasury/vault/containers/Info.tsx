"use client";
import { Elements, Layouts } from "components";
import { useWindowSize } from "hooks";
import { Root } from "lib/style";
import { format, sign } from "lib/utils";
import { Token } from "types/web3";

export interface Info {
    asset: Token;
    info?: VaultInfo;
    responsive?: boolean;
}

export interface VaultInfo {
    exchange: number | string;
    exchange_rate: number | string;
    exchange_rate_change: number | string;
    tl: number | string;
    tl_change: number | string;
    tvl: number | string;
    tvl_change: number | string;
    weight: number | string;
    weight_change: number | string;
    deposit: number | string;
    deposit_24h: number | string;
    withdraw: number | string;
    withdraw_24h: number | string;
    per_token: number | string;
    token_per: number | string;
    burn: number | string;
    earn: number | string;
}

export default function Info(props: Info) {
    const { windowSize } = useWindowSize();

    return (
        <Layouts.Contents.InnerContent
            style={{
                ...(windowSize.width <= Root.Device.Tablet &&
                    windowSize.width > Root.Device.Mobile && {
                        flexDirection: "row",
                    }),
            }}
            scroll
        >
            <Layouts.Row
                fix
                responsive="mobile"
                gap={props?.responsive ? 1 : 4}
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
                            Total Locked
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {format(props?.info?.tl, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                            Total Locked Change
                        </Elements.Text>
                        <Elements.Text
                            height={1}
                            align="right"
                            style={{ minWidth: "max-content" }}
                            color={sign(props?.info?.tl_change) === "+" ? "green" : sign(props?.info?.tl_change) === "-" && "red"}
                        >
                            {sign(props?.info?.tl_change)} {format(props?.info?.tl_change, "currency", { sign: false })}
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
                            Total Value Locked
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            $ {format(props?.info?.tvl, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                            Total Value Locked Change
                        </Elements.Text>
                        <Elements.Text
                            height={1}
                            align="right"
                            style={{ minWidth: "max-content" }}
                            color={sign(props?.info?.tvl_change) === "+" ? "green" : sign(props?.info?.tvl_change) === "-" && "red"}
                        >
                            {sign(props?.info?.tvl_change)}$ {format(props?.info?.tvl_change, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
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
                            Total Deposit
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {format(props?.info?.deposit, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                            Deposit (24H)
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={sign(props?.info?.deposit_24h) === "+" && "red"}>
                            {format(props?.info?.deposit_24h, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
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
                            Total Withdraw
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {format(props?.info?.withdraw, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                            Withdraw (24H)
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={sign(props?.info?.withdraw_24h) === "+" && "red"}>
                            {format(props?.info?.withdraw_24h, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
                        </Elements.Text>
                    </Layouts.Row>
                </Layouts.Col>
            </Layouts.Row>
            <Layouts.Divider margin={1} vertical={windowSize.width <= 840 && windowSize.width > Root.Device.Mobile} />
            <Layouts.Row
                fix
                responsive="mobile"
                gap={props?.responsive ? 1 : 4}
                style={{
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
                            Weight
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {format(props?.info?.weight, "currency", { unit: 9, limit: 12, fix: 3 })} %
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
                            Weight Change
                        </Elements.Text>
                        <Elements.Text
                            height={1}
                            align="right"
                            style={{ minWidth: "max-content" }}
                            color={sign(props?.info?.weight_change) === "+" ? "green" : sign(props?.info?.weight_change) === "-" && "red"}
                        >
                            {sign(props?.info?.weight_change)} {format(props?.info?.weight_change, "currency", { unit: 9, limit: 12, fix: 3, sign: false })} %
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
                            {props?.asset?.symbol} per MECA
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {format(props?.info?.token_per, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                            MECA per {props?.asset?.symbol}
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {format(props?.info?.per_token, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                            Exchange Rate
                        </Elements.Text>
                        <Elements.Text
                            height={1}
                            align="right"
                            style={{ minWidth: "max-content" }}
                            color={sign(props?.info?.exchange_rate) === "+" ? "green" : sign(props?.info?.exchange_rate) === "-" && "red"}
                        >
                            {sign(props?.info?.exchange_rate)} {format(props?.info?.exchange_rate, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
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
                            Exchange Rate Change
                        </Elements.Text>
                        <Elements.Text
                            height={1}
                            align="right"
                            style={{ minWidth: "max-content" }}
                            color={sign(props?.info?.exchange_rate_change) === "+" ? "green" : sign(props?.info?.exchange_rate_change) === "-" && "red"}
                        >
                            {sign(props?.info?.exchange_rate_change)}{" "}
                            {format(props?.info?.exchange_rate_change, "currency", { unit: 9, limit: 12, fix: 3, sign: false })} %
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
                            Mint
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={sign(props?.info?.earn) === "+" && "green"}>
                            {format(props?.info?.earn, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
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
                            Burn
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={sign(props?.info?.earn) === "+" && "red"}>
                            {format(props?.info?.burn, "currency", { unit: 9, limit: 12, fix: 3 })}
                        </Elements.Text>
                    </Layouts.Row>
                </Layouts.Col>
            </Layouts.Row>
        </Layouts.Contents.InnerContent>
    );
}
