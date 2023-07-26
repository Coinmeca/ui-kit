"use client";
import { useState } from "react";
import { Elements, Layouts } from "components";
import { Modals } from "containers";
import { Format } from "lib/utils";
import { Token, History as Data } from "types/web3";
import usePortal from "hooks/usePortal";

import * as HistoryData from "app/samples/asset/history";

export interface History {
    assets?: Token[];
    history?: Data[];
    responsive?: boolean;
    noData?: any;
}

export default function History(props: History) {
    const responsive = props?.responsive;

    const [process, setProcess] = useState(null);
    const [handleDetail, closeDetail] = usePortal((props: any) => (
        <Modals.Process
            process={process}
            content={
                <>
                    {console.log("modal", props)}
                    {props?.amount}
                    {props?.quantity}
                    {props?.fees}
                </>
            }
            onClose={() => closeDetail()}
            close
        />
    ));

    const { category, state, history } = HistoryData.default();

    const historyFormatter = (data: Data[]) => {
        return (
            typeof data !== "string" &&
            data?.length > 0 &&
            data?.map((data: Data) => {
                // console.log(props?.assets?.find((a: Token) => console.log(a)));
                const pay: any = props?.assets?.find((a: Token) => a?.address === data?.pay)?.symbol;
                const item: any = props?.assets?.find((a: Token) => a?.address === data?.item)?.symbol;

                const d = new Date(data?.time * 1000);
                const date = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear().toString().substring(2, 4);
                const time = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);

                return {
                    onClick: () => handleDetail(null, data),
                    style: { flex: 1, padding: !responsive && "2em" },
                    children: [
                        {
                            style: { flex: 1, maxWidth: !responsive && "20%" },
                            children: [
                                {
                                    style: { flexDirection: responsive && "row-reverse" },
                                    children: [
                                        {
                                            style: { gap: "0.5em" },
                                            children: [
                                                <>
                                                    <Elements.Text
                                                        height={1.25}
                                                        weight={"normal"}
                                                        opacity={0.6}
                                                        style={{ ...(responsive && { width: "100%", textAlign: "right" }) }}
                                                    >
                                                        {date}
                                                    </Elements.Text>
                                                </>,
                                                <>
                                                    <Elements.Text
                                                        height={1.25}
                                                        weight={"normal"}
                                                        opacity={0.6}
                                                        style={{ ...(responsive && { width: "100%", textAlign: "right" }) }}
                                                    >
                                                        {time}
                                                    </Elements.Text>
                                                </>,
                                            ],
                                        },
                                        {
                                            style: { gap: "0.5em" },
                                            children: [
                                                <>
                                                    <Elements.Text height={1.25}>{category[data?.category]}</Elements.Text>
                                                </>,
                                                <>
                                                    <Elements.Text height={1.25} weight={"normal"} opacity={0.6}>
                                                        {state[data?.state]}
                                                    </Elements.Text>
                                                </>,
                                            ],
                                        },
                                    ],
                                },
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
                                                    <Elements.Text align={"right"}>{Format(data?.amount || 0, "currency", true)}</Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "4em" }} fit>
                                                        {pay}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </>,
                                            <>
                                                <Layouts.Row gap={1}>
                                                    <Elements.Text align={"right"}>{Format(data?.price || 0, "currency", true)}</Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "4em" }} fit>
                                                        {pay}
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
                                                    <Elements.Text align={"right"}>{Format(data?.quantity || 0, "currency", true)}</Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "4em" }} fit>
                                                        {item}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </>,
                                            <>
                                                <Layouts.Row gap={1} style={{ width: "100%" }}>
                                                    <Elements.Text align={"right"}>{Format(data?.fees || 0, "currency", true)}</Elements.Text>
                                                    <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "4em" }} fit>
                                                        {item}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </>,
                                        ],
                                    },
                                ],
                            ],
                        },
                    ],
                };
            })
        );
    };

    return <Layouts.List list={historyFormatter(history)} noData={props?.noData} />;
}
