"use client";
import { Elements, Layouts } from "components";
import { Farm } from "types/web3";
import { Format, Sign } from "lib/utils";
import useWindowSize from "hooks/useWindowSize";
import { Root } from "lib/style";

export interface Info {
    farm: Farm;
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
                            Total Staking
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {Format(props?.info?.tl, "currency", true)}
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
                            Total Staking Change
                        </Elements.Text>
                        <Elements.Text
                            height={1}
                            align="right"
                            style={{ minWidth: "max-content" }}
                            color={Sign(props?.info?.tl_change) === "+" ? "green" : Sign(props?.info?.tl_change) === "-" && "red"}
                        >
                            {Sign(props?.info?.tl_change)} {Format(props?.info?.tl_change, "currency", true)}
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
                            $ {Format(props?.info?.tvl, "currency", true)}
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
                            color={Sign(props?.info?.tvl_change) === "+" ? "green" : Sign(props?.info?.tvl_change) === "-" && "red"}
                        >
                            {Sign(props?.info?.tvl_change)}$ {Format(props?.info?.tvl_change, "currency", true)}
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
                            Total Interest
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {Format(props?.info?.deposit, "currency", true)}
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
                            Total Interest Change
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={Sign(props?.info?.deposit_24h) === "+" && "red"}>
                            {Format(props?.info?.deposit_24h, "currency", true)}
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
                            APY
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {Format(props?.info?.withdraw, "currency", true)} %
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
                            Your ROR (Rate Of Return)
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={Sign(props?.info?.withdraw_24h) === "+" && "red"}>
                            {Format(props?.info?.withdraw_24h, "currency", true)}
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
                            Staking (24H)
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {Format(props?.info?.weight, "currency", true)}
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
                            Staking Change (24H)
                        </Elements.Text>
                        <Elements.Text
                            height={1}
                            align="right"
                            style={{ minWidth: "max-content" }}
                            color={Sign(props?.info?.weight_change) === "+" ? "green" : Sign(props?.info?.weight_change) === "-" && "red"}
                        >
                            {Sign(props?.info?.weight_change)} {Format(props?.info?.weight_change, "currency", true)}
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
                            Unstaking (24H)
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            ${Format(props?.info?.token_per, "currency", true)}
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
                            Unstaking Change (24H)
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            -{Format(props?.info?.per_token, "currency", true)}
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
                            Interest (24H)
                        </Elements.Text>
                        <Elements.Text
                            height={1}
                            align="right"
                            style={{ minWidth: "max-content" }}
                            color={Sign(props?.info?.exchange_rate) === "+" ? "green" : Sign(props?.info?.exchange_rate) === "-" && "red"}
                        >
                            {Sign(props?.info?.exchange_rate)} {Format(props?.info?.exchange_rate, "currency", true)}
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
                            Interest Change (24H)
                        </Elements.Text>
                        <Elements.Text
                            height={1}
                            align="right"
                            style={{ minWidth: "max-content" }}
                            color={Sign(props?.info?.exchange_rate_change) === "+" ? "green" : Sign(props?.info?.exchange_rate_change) === "-" && "red"}
                        >
                            {Sign(props?.info?.exchange_rate_change)} {Format(props?.info?.exchange_rate_change, "currency", true)} %
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
                            Your Staking
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={Sign(props?.info?.earn) === "+" && "green"}>
                            {Format(props?.info?.earn, "currency", true)}
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
                            Your Claimable
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={Sign(props?.info?.earn) === "+" && "red"}>
                            {Format(props?.info?.burn, "currency", true)}
                        </Elements.Text>
                    </Layouts.Row>
                </Layouts.Col>
            </Layouts.Row>
        </Layouts.Contents.InnerContent>
    );
}
