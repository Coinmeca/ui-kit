"use client";
import { Controls, Elements, Layouts } from "components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Token } from "types/web3";

export interface View {
    assets?: Token[];
    page?: "vault" | "farm";
    responsive?: boolean;
    onSelect?: Function;
}

export default function View(props: View) {
    const [tab, setTab] = useState(props?.page);

    const assetListFormatter = (data: Token[] | undefined) => {
        return (
            data &&
            typeof data !== "string" &&
            data?.length > 0 &&
            data?.map((data: Token) => ({
                onClick: () => {
                    if (typeof props?.onSelect === "function") props?.onSelect(data);
                },
                style: { padding: props?.responsive && "2em" },
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
                                            style={{ marginRight: props?.responsive && "1em" }}
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
                                            <Layouts.Row gap={1}>
                                                <Elements.Text align={"right"}>{data?.using}</Elements.Text>
                                                <Elements.Text align={"left"} opacity={0.6} style={{ maxWidth: "6em" }}>
                                                    {data?.symbol}
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

    return (
        <>
            <Layouts.Cover height={32}>
                <Controls.Slide
                    timer={0}
                    slideNo={props?.page === "vault" ? 0 : 1}
                    align={{ vertical: "top", horizon: "left" }}
                    slides={[
                        {
                            background: {
                                img: {
                                    src: 4,
                                },
                            },
                            children: (
                                <Layouts.Col align={"left"} gap={1}>
                                    <Elements.Text type={"h4"}>Much Faster and Much Easier Coin Exchange</Elements.Text>
                                    <Elements.Text weight={"normal"} responsive={{ device: "mobile", size: 4 }}>
                                        Start with your new experience coin trading system on Coinmeca.
                                    </Elements.Text>
                                </Layouts.Col>
                            ),
                        },
                        {
                            background: {
                                img: {
                                    src: 4,
                                },
                            },
                            children: (
                                <Layouts.Col align={"left"} gap={1}>
                                    <Elements.Text type={"h4"}>Meet Brand New Finance</Elements.Text>
                                    <Elements.Text weight={"normal"}>Start your crypto financial life on Coinmeca. Receive it, Pay it, Trade it.</Elements.Text>
                                </Layouts.Col>
                            ),
                        },
                    ]}
                />
            </Layouts.Cover>
            <Layouts.Box fit>
                <Layouts.Col gap={0}>
                    <Layouts.Row gap={0} responsive={"mobile"}>
                        <Layouts.Menu
                            menu={[
                                {
                                    style: { padding: props?.responsive && "1em 0" },
                                    children: [
                                        [
                                            <>
                                                <Controls.Tab active={tab === "vault"} onClick={() => setTab("vault")}>
                                                    Vault
                                                </Controls.Tab>
                                            </>,
                                            <>
                                                <Controls.Tab active={tab === "farm"} onClick={() => setTab("farm")}>
                                                    Farm
                                                </Controls.Tab>
                                            </>,
                                        ],
                                        [
                                            <AnimatePresence mode="popLayout">
                                                {tab === "vault" ? (
                                                    <Controls.Tab
                                                        key="listing"
                                                        iconLeft={"plus"}
                                                        as={motion.div}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                    >
                                                        Listing
                                                    </Controls.Tab>
                                                ) : (
                                                    <Controls.Tab
                                                        key="create"
                                                        iconLeft={"plus"}
                                                        as={motion.div}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                    >
                                                        Create
                                                    </Controls.Tab>
                                                )}
                                            </AnimatePresence>,
                                        ],
                                    ],
                                },
                            ]}
                        />
                        <Layouts.Menu
                            style={{ maxWidth: props?.responsive && "max-content" }}
                            menu={[
                                {
                                    style: { padding: "1em 0" },
                                    children: (
                                        <>
                                            <Controls.Input
                                                style={{ width: "100%" }}
                                                left={{ children: <Elements.Icon icon={"search"} /> }}
                                                placeholder={"Search"}
                                            />
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </Layouts.Row>
                    <Layouts.Contents.TabContainer
                        contents={[
                            {
                                active: tab === "vault",
                                children: <Layouts.List list={assetListFormatter(props?.assets)} />,
                            },
                            {
                                active: tab === "farm",
                                children: (
                                    <>
                                        <Layouts.List list={assetListFormatter(props?.assets)} />
                                    </>
                                ),
                            },
                        ]}
                    />
                </Layouts.Col>
            </Layouts.Box>
        </>
    );
}
