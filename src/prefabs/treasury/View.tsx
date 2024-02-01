"use client";
import { useState } from "react";
import { Charts, Controls, Elements, Layouts } from "components";
import { Format } from "lib/utils";
import { Asset, Farm } from "types/web3";
import { Vault, Farms } from ".";

export interface View {
    assets?: Asset[];
    farms?: Farm[];
    page?: "vault" | "farm";
    charts?: {
        value?: any;
        volume?: any;
    };
    responsive?: boolean;
    onPage?: Function;
    onSelect?: Function;
}

export default function View(props: View) {
    const handlePage = (page: "vault" | "farm") => {
        if (typeof props?.onPage === "function") props?.onPage(page);
    };

    const [keyword, setKeyword] = useState<string>();
    const [tvl, setTvl] = useState<any>();

    return (
        <>
            <Layouts.Cover height={32} background={{ filter: "black" }} style={{ scrollSnapAlign: "start" }}>
                <Controls.Slide
                    timer={0}
                    slideNo={props?.page === "vault" ? 0 : 1}
                    align={{ vertical: "top", horizon: "left" }}
                    slides={[
                        {
                            background: {
                                img: { src: 4 },
                                children: <Charts.ChartJS type={"line"} data={props?.charts?.value} onHover={(v: any) => setTvl(v)} />,
                            },
                            style: { pointerEvents: "none" },
                            children: (
                                <Layouts.Col gap={0}>
                                    <Elements.Text type={"strong"}>Total Value Locked</Elements.Text>
                                    <Elements.Text type={"h4"}>$ {tvl?.formattedValue || "-"}</Elements.Text>
                                    <div>
                                        <Elements.Text opacity={0.6}>{tvl?.label?.split(" ")[0]}</Elements.Text>
                                    </div>
                                </Layouts.Col>
                            ),
                        },
                        {
                            background: {
                                filter: "black",
                                img: { src: 8 },
                            },
                            style: { pointerEvents: "none" },
                            children: (
                                <Layouts.Col gap={0}>
                                    <Elements.Text type={"strong"}>Total Volume</Elements.Text>
                                    <Elements.Text type={"h4"}>$ {Format(156785461234, "currency", { unit: 9, limit: 12, fix: 3 })}</Elements.Text>
                                </Layouts.Col>
                            ),
                        },
                    ]}
                />
            </Layouts.Cover>
            <Layouts.Box padding={[2, "", "", ""]} fit>
                <Layouts.Contents.InnerContent>
                    <Layouts.Row gap={0} responsive={"mobile"}>
                        <Layouts.Menu
                            menu={[
                                {
                                    style: {
                                        padding: !props?.responsive && "1em 0",
                                    },
                                    children: [
                                        [
                                            <>
                                                <Controls.Tab active={props?.page === "vault"} onClick={() => handlePage("vault")}>
                                                    Vault
                                                </Controls.Tab>
                                            </>,
                                            <>
                                                <Controls.Tab active={props?.page === "farm"} onClick={() => handlePage("farm")}>
                                                    Farm
                                                </Controls.Tab>
                                            </>,
                                        ],
                                        [
                                            <Controls.Tab
                                                key="listing"
                                                iconLeft={"plus"}
                                                style={{
                                                    ...(!props?.responsive && {
                                                        marginRight: "1em",
                                                    }),
                                                }}
                                            >
                                                {props?.page === "vault" ? "Listing" : "Create"}
                                            </Controls.Tab>,
                                        ],
                                    ],
                                },
                            ]}
                        />
                        <Layouts.Menu
                            style={{
                                maxWidth: !props?.responsive ?? "max-content",
                            }}
                            menu={[
                                {
                                    style: { padding: "1em 0" },
                                    children: (
                                        <>
                                            <Controls.Input
                                                style={{ width: "100%" }}
                                                left={{
                                                    children: <Elements.Icon icon={"search"} />,
                                                }}
                                                onChange={(e: any, v: string) => setKeyword(v)}
                                                placeholder={"Search asset"}
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
                                active: props?.page === "vault",
                                children: (
                                    <Vault.Containers.Assets
                                        assets={props?.assets}
                                        filter={keyword}
                                        onSelect={props?.onSelect}
                                        responsive={props?.responsive}
                                    />
                                ),
                            },
                            {
                                active: props?.page === "farm",
                                children: (
                                    <Farms.Containers.Farms farms={props?.farms} filter={keyword} onSelect={props?.onSelect} responsive={props?.responsive} />
                                ),
                            },
                        ]}
                    />
                </Layouts.Contents.InnerContent>
            </Layouts.Box>
        </>
    );
}
