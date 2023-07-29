"use client";
import { Controls, Elements, Layouts } from "components";
import { Format } from "lib/utils";
import { Asset } from "types/web3";
import { Vault } from ".";

export interface View {
    assets?: Asset[];
    page?: "vault" | "farm";
    responsive?: boolean;
    onPage?: Function;
    onSelect?: Function;
}

export default function View(props: View) {
    const handlePage = (page: "vault" | "farm") => {
        if (typeof props?.onPage === "function") props?.onPage(page);
    };

    return (
        <>
            <Layouts.Cover height={32} style={{ scrollSnapAlign: "start" }}>
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
                                <Layouts.Col gap={0}>
                                    <Elements.Text weight={"normal"} responsive={{ device: "mobile", size: 4 }}>
                                        {Format(Date.now(), "date")}
                                    </Elements.Text>
                                    <Elements.Text type={"h6"}>Total Value Locked</Elements.Text>
                                </Layouts.Col>
                            ),
                        },
                        {
                            background: {
                                img: { src: 4 },
                            },
                            children: (
                                <Layouts.Col gap={0}>
                                    <Elements.Text weight={"normal"} responsive={{ device: "mobile", size: 4 }}>
                                        {Format(Date.now(), "date")}
                                    </Elements.Text>
                                    <Elements.Text type={"h6"}>Total Volume</Elements.Text>
                                </Layouts.Col>
                            ),
                        },
                    ]}
                />
            </Layouts.Cover>
            <Layouts.Box fit style={{ scrollSnapAlign: "start" }}>
                <Layouts.Contents.InnerContent>
                    <Layouts.Row gap={0} responsive={"mobile"}>
                        <Layouts.Menu
                            menu={[
                                {
                                    style: { padding: !props?.responsive && "1em 0" },
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
                                            <Controls.Tab key="listing" iconLeft={"plus"} style={{ ...(!props?.responsive && { marginRight: "1em" }) }}>
                                                {props?.page === "vault" ? "Listing" : "Create"}
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
                                active: props?.page === "vault",
                                children: <Vault.Containers.Assets assets={props?.assets} onSelect={props?.onSelect} responsive={props?.responsive} />,
                            },
                            {
                                active: props?.page === "farm",
                                children: <>{/* <Layouts.List list={assetListFormatter(props?.assets)} /> */}</>,
                            },
                        ]}
                    />
                </Layouts.Contents.InnerContent>
            </Layouts.Box>
        </>
    );
}
