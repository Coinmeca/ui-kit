"use client";
import { Containers, Controls, Elements, Frames, Layouts } from "components";
import type { Frame } from "components/frames/Frame";
import { useState } from "react";

export interface Exchange {
    frames?: Frame;
    children?: any;
}

export default function Layout(props: Exchange) {
    const formatter = (data: any) => {
        return (
            data?.length > 0 &&
            data?.map((data: any) => ({
                children: [
                    [
                        {
                            style: { width: "max-content" },
                            children: [
                                <Elements.Avatar
                                    // length={8}
                                    size={3}
                                    img={data?.logo}
                                    // name={'0x16e39d21f7f3ab3dafabd12fc07f4fd4928fb47163e79bb879d0928ac34e817e'}
                                />,
                                [`${data?.symbol}`, `${data?.market}`],
                            ],
                        },
                    ],
                    [
                        { align: "right", children: `$${data?.price}` },
                        { align: "right", children: `+${data?.change}` },
                    ],
                    [{ align: "right", children: data.volume }],
                ],
                onClick: (props: any) => alert(props.children),
            }))
        );
    };

    const markets = [
        {
            value: "All Markets",
        },
        {
            value: "USDT",
            img: "/src/assets/coins/eth.png",
        },
        {
            value: "ETH",
            img: "/src/assets/coins/eth.png",
        },
        {
            value: "USDC",
            img: "/src/assets/coins/eth.png",
        },
    ];

    const marketlist = [
        {
            logo: "/src/assets/coins/eth.png",
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: "/src/assets/coins/eth.png",
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
    ];

    let menu = false;
    const [mobileMenu, setMobileMenu] = useState("");
    const [sidebarTab, setSidebarTab] = useState("exchange");

    // package component
    const header = {
        color: "red",
        logo: {
            src: "/src/assets/coinmeca.svg",
            width: 128,
            height: 48,
        },
        menu: {
            active: mobileMenu === "menu",
            children: [
                {
                    name: "Tab",
                    path: "/example/tab",
                },
                {
                    name: "Slide",
                    path: "/example/slide",
                },
                {
                    name: "Table",
                    path: "/example/table",
                },
                {
                    name: "Basic",
                    path: "/example/Basic",
                },
            ],
        },
        option: {
            active: true,
            children: (
                <>
                    <Controls.Tab onClick={() => (mobileMenu === "notify" ? setMobileMenu("") : setMobileMenu("notify"))} active={mobileMenu === "notify"} iconLeft={{ icon: "bell", count: 1 }} toggle fit />
                    <Controls.Tab onClick={() => (mobileMenu === "sidebar" ? setMobileMenu("") : setMobileMenu("sidebar"))} active={mobileMenu === "sidebar"} iconLeft={"sidebar"} toggle fit />
                    <Controls.Tab onClick={() => (mobileMenu === "setting" ? setMobileMenu("") : setMobileMenu("setting"))} active={mobileMenu === "setting"} iconLeft={"gear"} toggle fit />
                </>
            ),
        },
        side: {
            active: mobileMenu === "setting",
            children: (
                <>
                    <Layouts.Row fit>
                        <Controls.Dropdown
                            options={[
                                {
                                    key: 1,
                                    value: "English",
                                },
                                {
                                    key: 2,
                                    value: "Korean",
                                },
                                {
                                    key: 3,
                                    value: "Spanish",
                                },
                                {
                                    key: 4,
                                    value: "Japanese",
                                },
                            ]}
                            fit
                        />
                        <Controls.Dropdown
                            options={[
                                {
                                    key: 1,
                                    value: "English",
                                },
                                {
                                    key: 2,
                                    value: "Korean",
                                },
                                {
                                    key: 3,
                                    value: "Spanish",
                                },
                                {
                                    key: 4,
                                    value: "Japanese",
                                },
                            ]}
                            fit
                        />
                    </Layouts.Row>
                    {/* <Controls.Button fit>Connect</Controls.Button> */}
                    <Controls.Button iconRight={"chevron-down-bold"} fit>
                        <Elements.Avatar length={8} size={3} display={4} name={"0x16e39d21f7f3ab3dafabd12fc07f4fd4928fb47163e79bb879d0928ac34e817e"} />
                    </Controls.Button>
                </>
            ),
        },
    };

    const notis = [
        {
            id: 12234231,
            date: new Date(),
            title: "Notification",
            message: "message",
        },
        {
            id: 12234231,
            date: new Date(),
            title: "Notification",
            message: "message",
        },
    ];

    // package component
    const sidebars = {
        active: true,
        lower: {
            active: mobileMenu === "sidebar",
            children: [
                {
                    active: mobileMenu === "sidebar",
                    children: (
                        <>
                            <Layouts.Row fit style={{ padding: "0.5em 1em" }} gap={0}>
                                <Controls.Tab active={sidebarTab === "exchange"} onClick={() => setSidebarTab("exchange")}>
                                    Exchange
                                </Controls.Tab>
                                <Controls.Tab active={sidebarTab === "alert"} onClick={() => setSidebarTab("alert")}>
                                    Alert
                                </Controls.Tab>
                                <Controls.Tab active={sidebarTab === "asset"} onClick={() => setSidebarTab("asset")}>
                                    Assets
                                </Controls.Tab>
                            </Layouts.Row>
                            <Controls.Input icon="search" dropdown={{ options: markets }} />
                            <Layouts.Contents.InnerContent>
                                <Layouts.Contents.SlideContainer
                                    contents={[
                                        {
                                            active: sidebarTab === "exchange",
                                            children: <Containers.Sidebars.Market list={formatter(marketlist)} />,
                                        },
                                        {
                                            active: sidebarTab === "alert",
                                            children: <Containers.Sidebars.Market list={formatter(marketlist)} />,
                                        },
                                        {
                                            active: sidebarTab === "asset",
                                            children: <Containers.Sidebars.Market list={formatter(marketlist)} />,
                                        },
                                    ]}
                                />
                            </Layouts.Contents.InnerContent>
                        </>
                    ),
                },
            ],
        },
        upper: {
            active: mobileMenu === "notify" /* || menuMobile === 'something' || menuMobile === 'else' */,
            children: [
                {
                    active: mobileMenu === "notify",
                    children: <Containers.Sidebars.Notification />,
                },
            ],
        },
    };

    return (
        <Frames.Frame header={header} sidebar={sidebars} align={"right"} background={{ img: { src: 2 } }} side={56}>
            {props?.children}
        </Frames.Frame>
    );
}
