"use client";
import { Elements, Layouts, Controls } from "components";
import { useState } from "react";
import useToast from "hooks/useToast";
import { usePathname } from "next/navigation";
import { Sidebars } from "containers";

export default function Data() {
    const [value, setValue] = useState<number>(0);
    const [tab, setTab] = useState<string>("icon");
    const [active, setActive] = useState(false);
    const [mobileMenu, setMobileMenu] = useState("");
    // const [mobileMenu, setMobileMenu] = useState("market");
    const [sidebarTab, setSidebarTab] = useState("exchange");

    const notilist = [
        {
            id: 12234231,
            date: "12:06:27 07-11-23",
            title: "Notification",
            message: "This is a Notification",
        },
        {
            id: 12234231,
            date: "12:06:27 07-11-23",
            title: "Alert",
            message: "This is a Notification",
        },
        {
            id: 12234231,
            date: "12:06:27 07-11-23",
            title: "Alert",
            message: "This is a Notification",
        },
        {
            id: 12234231,
            date: "12:06:27 07-11-23",
            title: "Notification",
            message: "This is a Notification",
        },
        {
            id: 12234231,
            date: "12:06:27 07-11-23",
            title: "Alert",
            message: "This is a Notification",
        },
        {
            id: 12234231,
            date: "12:06:27 07-11-23",
            title: "Alert",
            message: "This is a Notification",
        },
        {
            id: 12234231,
            date: "12:06:27 07-11-23",
            title: "Notification",
            message: "This is a Notification",
        },
        {
            id: 12234231,
            date: "12:06:27 07-11-23",
            title: "Alert",
            message: "This is a Notification",
        },
        {
            id: 12234231,
            date: "12:06:27 07-11-23",
            title: "Alert",
            message: "This is a Notification",
        },
        {
            id: 12234231,
            date: "12:06:27 07-11-23",
            title: "Notification",
            message: "This is a Notification",
        },
        {
            id: 12234231,
            date: "12:06:27 07-11-23",
            title: "Alert",
            message: "This is a Notification",
        },
        {
            id: 12234231,
            date: "12:06:27 07-11-23",
            title: "Alert",
            message: "This is a Notification",
        },
    ];

    const { AddNotify, setNotis } = useToast(notilist);
    // setNotis(notilist);

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
            logo: require("/src/assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETh/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("/src/assets/coins/arb.png"),
            symbol: "ARB",
            market: "ARB/USDT",
            price: "4,678.05",
            change: "-23.12",
            volume: "73170731",
        },
        {
            logo: require("/src/assets/coins/matic.png"),
            symbol: "MATIC",
            market: "MATIC/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("/src/assets/coins/dai.png"),
            symbol: "DAI",
            market: "DAI/USDT",
            price: "4,678.05",
            change: "-23.12",
            volume: "73170731",
        },
        {
            logo: require("/src/assets/coins/usdc.png"),
            symbol: "USDC",
            market: "USDC/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("/src/assets/coins/weth.png"),
            symbol: "WETH",
            market: "WETH/USDT",
            price: "4,678.05",
            change: "0.0",
            volume: "73170731",
        },
        {
            logo: require("/src/assets/coins/uni.png"),
            symbol: "UNI",
            market: "UNI/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("/src/assets/coins/avax.png"),
            symbol: "AVAX",
            market: "AVAX/USDT",
            price: "4,678.05",
            change: "-23.12",
            volume: "73170731",
        },
        {
            logo: require("/src/assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/DAI",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
    ];

    const sidebarMarketListFormatter = (data: any) => {
        return (
            data?.length > 0 &&
            data?.map((data: any) => ({
                children: [
                    [
                        {
                            style: { width: "max-content" },
                            children: [
                                <>
                                    <Elements.Avatar
                                        // length={8}
                                        size={3}
                                        img={data?.logo}
                                        // name={'0x16e39d21f7f3ab3dafabd12fc07f4fd4928fb47163e79bb879d0928ac34e817e'}
                                    />
                                </>,
                                [
                                    <>
                                        <Elements.Text type="strong" height={1}>
                                            {data?.symbol}
                                        </Elements.Text>
                                    </>,
                                    <>
                                        <Elements.Text type="p" height={1} style={{ opacity: 0.45 }}>
                                            {data?.market}
                                        </Elements.Text>
                                    </>,
                                ],
                            ],
                        },
                    ],
                    {
                        align: "right",
                        change: parseFloat(data?.change) > 0 ? "var(--green)" : parseFloat(data?.change) < 0 && "var(--red)",
                        children: [
                            <>
                                <Elements.Text type="strong" height={1}>
                                    $ {data?.price}
                                </Elements.Text>
                            </>,
                            <>
                                <Elements.Text type="strong" height={1} change>
                                    {parseFloat(data?.change) > 0 && "+"}
                                    {data?.change} %
                                </Elements.Text>
                            </>,
                        ],
                    },
                    [{ align: "right", children: data.volume }],
                ],
                onClick: (props: any) => alert(props.children),
            }))
        );
    };

    const path = usePathname();

    const colorMap: any = {
        "/samples": "green",
        "/samples/asset": "red",
        "/samples/exchange": "orange",
        "/samples/treasury": "blue",
    };

    const languages = [
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
    ];

    const chains = [
        {
            key: 1,
            img: require("/src/assets/coins/eth.png").default.src,
            value: "Ethereum",
        },
        {
            key: 2,
            img: require("/src/assets/coins/arb.png").default.src,
            value: "Arbitrum",
        },
        {
            key: 3,
            img: require("/src/assets/coins/op.png").default.src,
            value: "Optimism",
        },
        {
            key: 4,
            img: require("/src/assets/coins/avax.png").default.src,
            value: "Avalanche",
        },
    ];

    const header = {
        color: colorMap[path],
        logo: {
            src: "/src/assets/coinmeca.svg",
            width: 128,
            height: 48,
        },
        menu: {
            active: mobileMenu === "menu",
            children: [
                {
                    name: "Asset",
                    path: "/samples/asset",
                },
                {
                    name: "Exchange",
                    path: "/samples/exchange",
                },
                {
                    name: "Treasury",
                    path: "/samples/treasury",
                },
            ],
        },
        option: {
            active: true,
            children: (
                <>
                    <Controls.Tab onClick={() => (mobileMenu === "notify" ? setMobileMenu("") : setMobileMenu("notify"))} active={mobileMenu === "notify"} iconLeft={{ icon: "bell", count: 24 }} toggle fit onBlur={() => setMobileMenu("")} />
                    <Controls.Tab onClick={() => (mobileMenu === "market" ? setMobileMenu("") : setMobileMenu("market"))} active={mobileMenu === "market"} iconLeft={"sidebar"} show={"tablet"} toggle fit onBlur={() => setMobileMenu("")} />
                    <Controls.Tab onClick={() => (mobileMenu === "setting" ? setMobileMenu("") : setMobileMenu("setting"))} active={mobileMenu === "setting"} iconLeft={"gear"} show={"tablet"} toggle fit />
                </>
            ),
        },
        side: {
            active: mobileMenu === "setting",
            children: (
                <>
                    <Layouts.Row fit>
                        <Controls.Dropdown option={languages[0]} options={languages} fit />
                        <Controls.Dropdown option={chains[0]} options={chains} fit />
                    </Layouts.Row>
                    {/* <Controls.Button fit>Connect</Controls.Button> */}
                    <Controls.Button iconRight={"chevron-down-bold"} fit>
                        <Elements.Avatar length={8} size={3} display={4} name={"0x16e39d21f7f3ab3dafabd12fc07f4fd4928fb47163e79bb879d0928ac34e817e"} />
                    </Controls.Button>
                </>
            ),
        },
    };

    const sidebars = {
        active: true,
        lower: {
            active: mobileMenu === "market",
            children: [
                {
                    active: true,
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
                            <Controls.Input left={{ children: <Elements.Icon icon={"search"} /> }} right={{ children: <Controls.Dropdown options={markets} /> }} />
                            <Layouts.Contents.InnerContent>
                                <Layouts.Contents.SlideContainer
                                    contents={[
                                        {
                                            active: sidebarTab === "exchange",
                                            children: <Sidebars.Market list={sidebarMarketListFormatter(marketlist)} />,
                                        },
                                        {
                                            active: sidebarTab === "alert",
                                            children: <Sidebars.Market list={sidebarMarketListFormatter(marketlist)} />,
                                        },
                                        {
                                            active: sidebarTab === "asset",
                                            children: <Sidebars.Market list={sidebarMarketListFormatter(marketlist)} />,
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
                    children: <Sidebars.Notification list={notilist} />,
                },
            ],
        },
    };

    return { value, setValue, tab, setTab, active, setActive, markets, marketlist, notilist, header, sidebars };
}
