"use client";
import { Elements, Layouts } from "components";
import useWindowSize from "hooks/useWindowSize";
import { Root } from "lib/style";
import { format, sign } from "lib/utils";
import { Farm } from "types/web3";

export interface Info {
    farm: Farm;
    info?: FarmInfo;
    responsive?: boolean;
}

export interface FarmInfo {
    total_staking: number;
    total_staking_change: number;
    tvl: number;
    tvl_change: number;
    total_interest: number;
    total_interest_change: number;
    apr: number;
    staking_24h: number;
    staking_24h_change: number;
    unstaking_24h: number;
    unstaking_24h_change: number;
    interest_24h: number;
    interest_change_24h: number;
    ror: number;
    staking: number;
    claimable: number;
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
                            {format(props?.info?.total_staking, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                            color={sign(props?.info?.total_staking_change) === "+" ? "green" : sign(props?.info?.total_staking_change) === "-" && "red"}
                        >
                            {sign(props?.info?.total_staking_change)}{" "}
                            {format(props?.info?.total_staking_change, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
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
                            Total Interest
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {format(props?.info?.total_interest, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"green"}>
                            {format(props?.info?.total_interest_change, "currency", { unit: 9, limit: 12, fix: 3 })} %
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
                            Your ROI
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {format(props?.info?.apr, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                            Your ROR
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {format(props?.info?.ror, "currency", { unit: 9, limit: 12, fix: 3 })} %
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
                            {format(props?.info?.staking_24h, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"green"}>
                            {sign(props?.info?.staking_24h_change)}{" "}
                            {format(props?.info?.staking_24h_change, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
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
                            {format(props?.info?.unstaking_24h, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"red"}>
                            -{format(props?.info?.unstaking_24h_change, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {format(props?.info?.interest_24h, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"green"}>
                            {format(props?.info?.interest_change_24h, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {format(props?.info?.staking, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {format(props?.info?.claimable, "currency", { unit: 9, limit: 12, fix: 3 })}
                        </Elements.Text>
                    </Layouts.Row>
                </Layouts.Col>
            </Layouts.Row>
        </Layouts.Contents.InnerContent>
    );
}
