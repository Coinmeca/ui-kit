"use client";
import { Elements, Layouts } from "components";
import { useWindowSize } from "hooks";
import { Root } from "lib/style";
import { format, sign } from "lib/utils";

export interface Info {
    info?: AssetsInfo;
    responsive?: boolean;
}

export interface AssetsInfo {
    total_buy?: number | string;
    total_sell?: number | string;
    total_return?: number | string;
    total_return_rate?: number | string;
    avg_buy?: number | string;
    avg_sell?: number | string;
    avg_return?: number | string;
    avg_return_rate?: number | string;
    total_lending?: number | string;
    total_lending_interest?: number | string;
    total_open_interest?: number | string;
    total_open_interest_rate?: number | string;
    avg_open_interest?: number | string;
    avg_open_interest_rate?: number | string;
}

export default function Info(props: Info) {
    const { windowSize } = useWindowSize();

    return (
        <Layouts.Contents.InnerContent
            style={{
                ...(windowSize.width <= Root.Device.Tablet &&
                    windowSize.width > 560 && {
                        flexDirection: "row",
                    }),
            }}
            scroll
        >
            <Layouts.Row
                fix
                responsive="tablet"
                gap={props?.responsive ? 1 : 4}
                style={{
                    flex: 1,
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
                            Total Buy
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            $ {format(props?.info?.total_buy, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                            Total Sell
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {format(props?.info?.total_sell, "currency", { unit: 9, limit: 12, fix: 3 })}
                        </Elements.Text>
                    </Layouts.Row>
                </Layouts.Col>
                <Layouts.Col gap={0.5}>
                    <Layouts.Row
                        fix
                        gap={1}
                        style={{
                            width: "-webkit-fill-available",
                            alignItems: "center",
                            padding: "0.5em",
                            ...(props?.responsive && { height: "100%" }),
                        }}
                    >
                        <Elements.Text opacity={0.6} style={{ minWidth: "max-content" }}>
                            Total Return
                        </Elements.Text>
                        <Elements.Text
                            height={1}
                            align="right"
                            style={{ minWidth: "max-content" }}
                            color={sign(props?.info?.total_return) === "+" ? "green" : sign(props?.info?.total_return) === "-" && "red"}
                        >
                            {sign(props?.info?.total_return)}$ {format(props?.info?.total_return, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
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
                            Total Return Rate
                        </Elements.Text>
                        <Elements.Text
                            height={1}
                            align="right"
                            style={{ minWidth: "max-content" }}
                            color={sign(props?.info?.total_return_rate) === "+" ? "green" : sign(props?.info?.total_return_rate) === "-" && "red"}
                        >
                            {sign(props?.info?.total_return_rate)}${" "}
                            {format(props?.info?.total_return_rate, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
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
                            Avg Buy
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            $ {format(props?.info?.avg_buy, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                            Avg Sell
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            $ {format(props?.info?.avg_sell, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                            Avg Return
                        </Elements.Text>
                        <Elements.Text
                            height={1}
                            align="right"
                            style={{ minWidth: "max-content" }}
                            color={sign(props?.info?.avg_return) === "+" ? "green" : sign(props?.info?.avg_return) === "-" && "red"}
                        >
                            {sign(props?.info?.avg_return)}$ {format(props?.info?.avg_return, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
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
                            Avg Return Rate
                        </Elements.Text>
                        <Elements.Text
                            height={1}
                            align="right"
                            style={{ minWidth: "max-content" }}
                            color={sign(props?.info?.avg_return_rate) === "+" ? "green" : sign(props?.info?.avg_return_rate) === "-" && "red"}
                        >
                            {sign(props?.info?.avg_return_rate)} {format(props?.info?.avg_return_rate, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}{" "}
                            %
                        </Elements.Text>
                    </Layouts.Row>
                </Layouts.Col>
            </Layouts.Row>
            {/* <Layouts.Divider margin={1} vertical={windowSize.width <= Root.Device.Tablet && windowSize.width > 560} />
            <Layouts.Row
                fix
                responsive="tablet"
                gap={props?.responsive ? 1 : 4}
                style={{
                    flex: 1,
                    alignItems: "center",
                    ...(props?.responsive && { height: "100%" }),
                }}
            >
                <Layouts.Col gap={0.5} style={{ opacity: 0.15 }}>
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
                            Total Lending Balance
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            $ {format(props?.info?.total_lending, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                            Total Lending Interest
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {format(props?.info?.total_lending_interest, "currency", { unit: 9, limit: 12, fix: 3 })} %
                        </Elements.Text>
                    </Layouts.Row>
                </Layouts.Col>
                <Layouts.Col gap={0.5} style={{ opacity: 0.15 }}>
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
                            -
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {format(0, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                            -
                        </Elements.Text>
                        <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                            {format(0, "currency", { unit: 9, limit: 12, fix: 3 })}
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
                            Total Open Interest
                        </Elements.Text>
                        <Elements.Text
                            height={1}
                            align="right"
                            style={{ minWidth: "max-content" }}
                            color={sign(props?.info?.total_open_interest) === "+" ? "green" : sign(props?.info?.total_open_interest) === "-" && "red"}
                        >
                            {sign(props?.info?.total_open_interest)}{" "}
                            {format(props?.info?.total_open_interest, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
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
                            Total Open Interest Rate
                        </Elements.Text>
                        <Elements.Text
                            height={1}
                            align="right"
                            style={{ minWidth: "max-content" }}
                            color={sign(props?.info?.total_open_interest_rate) === "+" ? "green" : sign(props?.info?.total_open_interest_rate) === "-" && "red"}
                        >
                            {sign(props?.info?.total_open_interest_rate)}{" "}
                            {format(props?.info?.total_open_interest_rate, "currency", { unit: 9, limit: 12, fix: 3, sign: false })} %
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
                            Avg Open Interest
                        </Elements.Text>
                        <Elements.Text
                            height={1}
                            align="right"
                            style={{ minWidth: "max-content" }}
                            color={sign(props?.info?.avg_open_interest) === "+" ? "green" : sign(props?.info?.avg_open_interest) === "-" && "red"}
                        >
                            {sign(props?.info?.avg_open_interest)}${" "}
                            {format(props?.info?.avg_open_interest, "currency", { unit: 9, limit: 12, fix: 3, sign: false })}
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
                            Avg Open Interest Rate
                        </Elements.Text>
                        <Elements.Text
                            height={1}
                            align="right"
                            style={{ minWidth: "max-content" }}
                            color={sign(props?.info?.avg_open_interest_rate) === "+" ? "green" : sign(props?.info?.avg_open_interest_rate) === "-" && "red"}
                        >
                            {sign(props?.info?.avg_open_interest_rate)}{" "}
                            {format(props?.info?.avg_open_interest_rate, "currency", { unit: 9, limit: 12, fix: 3, sign: false })} %
                        </Elements.Text>
                    </Layouts.Row>
                </Layouts.Col>
            </Layouts.Row> */}
        </Layouts.Contents.InnerContent>
    );
}
