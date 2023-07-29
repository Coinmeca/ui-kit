"use client";
import { Controls, Elements, Layouts } from "components";
import { AnimatePresence, motion } from "framer-motion";
import { Root } from "lib/style";
import { Format, Sign } from "lib/utils";
import { useState } from "react";
import { Asset } from "types/web3";
import { Vault } from ".";

export interface View {
    assets?: Asset[];
    page?: "vault" | "farm";
    responsive?: boolean;
    onSelect?: Function;
}

export default function View(props: View) {
    const [tab, setTab] = useState(props?.page);

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
                                img: { src: 4 },
                            },
                            children: (
                                <Layouts.Col gap={1}>
                                    <Elements.Text type={"h4"}>Much Faster and Much Easier Coin Exchange</Elements.Text>
                                    <Elements.Text weight={"normal"} responsive={{ device: "mobile", size: 4 }}>
                                        Start with your new experience coin trading system on Coinmeca.
                                    </Elements.Text>
                                </Layouts.Col>
                            ),
                        },
                        {
                            background: {
                                img: { src: 4 },
                            },
                            children: (
                                <Layouts.Col gap={1}>
                                    <Elements.Text type={"h4"}>Meet Brand New Finance</Elements.Text>
                                    <Elements.Text weight={"normal"}>Start your crypto financial life on Coinmeca. Receive it, Pay it, Trade it.</Elements.Text>
                                </Layouts.Col>
                            ),
                        },
                    ]}
                />
            </Layouts.Cover>
            <Layouts.Box fit>
                <Layouts.Contents.InnerContent>
                    <Layouts.Row gap={0} responsive={"mobile"}>
                        <Layouts.Menu
                            menu={[
                                {
                                    style: { padding: !props?.responsive && "1em 0" },
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
                                            <Controls.Tab key="listing" iconLeft={"plus"} style={{ ...(!props?.responsive && { marginRight: "1em" }) }}>
                                                {tab === "vault" ? "Listing" : "Create"}
                                            </Controls.Tab>,
                                        ],
                                    ],
                                },
                            ]}
                        />
                        <Layouts.Menu
                            style={{ maxWidth: !props?.responsive && "max-content" }}
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
                                children: <Vault.Containers.Assets assets={props?.assets} onSelect={props?.onSelect} responsive={props?.responsive} />,
                            },
                            {
                                active: tab === "farm",
                                children: <>{/* <Layouts.List list={assetListFormatter(props?.assets)} /> */}</>,
                            },
                        ]}
                    />
                </Layouts.Contents.InnerContent>
            </Layouts.Box>
        </>
    );
}
