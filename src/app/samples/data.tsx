"use client";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Elements, Layouts, Controls } from "components";
import { Modals, Sidebars } from "containers";
import { useMobile, useNotification, usePortal, useTheme } from "hooks";
import { Filter } from "lib/utils";

export default function Data() {
    const [value, setValue] = useState<number>(0);
    const [tab, setTab] = useState<string>("icon");
    const [active, setActive] = useState(false);
    const [mobileMenu, setMobileMenu] = useState("");
    // const [mobileMenu, setMobileMenu] = useState("market");
    const [sidebarTab, setSidebarTab] = useState("exchange");

    const { isMobile } = useMobile();
    const { notis, toasts, count, addToast, addNotify, setNotis, resetCount } = useNotification();

    const { theme } = useTheme();
    console.log(theme);

    const notilist = [
        {
            id: 12234231,
            date: "12:06:27 07-11-23",
            title: "Notification",
            message: "This is a Notification",
        },
        {
            id: 12234232,
            date: "12:06:27 07-11-23",
            title: "Alert",
            message: "This is a Notification",
        },
        {
            id: 12234233,
            date: "12:06:27 07-11-23",
            title: "Alert",
            message: "This is a Notification",
        },
        {
            id: 12234234,
            date: "12:06:27 07-11-23",
            title: "Notification",
            message: "This is a Notification",
        },
        {
            id: 12234235,
            date: "12:06:27 07-11-23",
            title: "Alert",
            message: "This is a Notification",
        },
        {
            id: 12234236,
            date: "12:06:27 07-11-23",
            title: "Alert",
            message: "This is a Notification",
        },
        {
            id: 12234237,
            date: "12:06:27 07-11-23",
            title: "Notification",
            message: "This is a Notification",
        },
        {
            id: 12234238,
            date: "12:06:27 07-11-23",
            title: "Alert",
            message: "This is a Notification",
        },
        {
            id: 12234239,
            date: "12:06:27 07-11-23",
            title: "Alert",
            message: "This is a Notification",
        },
        {
            id: 12234240,
            date: "12:06:27 07-11-23",
            title: "Notification",
            message: "This is a Notification",
        },
        {
            id: 12234241,
            date: "12:06:27 07-11-23",
            title: "Alert",
            message: "This is a Notification",
        },
        {
            id: 12234242,
            date: "12:06:27 07-11-23",
            title: "Alert",
            message: "This is a Notification",
        },
    ];

    useEffect(() => {
        setNotis(notilist);
    }, []);

    const markets = [
        {
            name: "All Markets",
        },
        {
            name: "USDT",
            img: require("../../assets/coins/usdt.png"),
        },
        {
            name: "ETH",
            img: require("../../assets/coins/eth.png"),
        },
        {
            name: "USDC",
            img: require("../../assets/coins/usdc.png"),
        },
        {
            name: "DAI",
            img: require("../../assets/coins/dai.png"),
        },
    ];

    const marketlist = [
        {
            logo: require("../../assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "7345617015678731",
        },
        {
            logo: require("../../assets/coins/arb.png"),
            symbol: "ARB",
            market: "ARB/USDT",
            price: "4,678.05",
            change: "-23.12",
            volume: "73170731489",
        },
        {
            logo: require("../../assets/coins/matic.png"),
            symbol: "MATIC",
            market: "MATIC/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "7317073148912",
        },
        {
            logo: require("../../assets/coins/dai.png"),
            symbol: "DAI",
            market: "DAI/USDT",
            price: "4,678.05",
            change: "-23.12",
            volume: "73170731",
        },
        {
            logo: require("../../assets/coins/usdc.png"),
            symbol: "USDC",
            market: "USDC/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("../../assets/coins/weth.png"),
            symbol: "WETH",
            market: "WETH/USDT",
            price: "4,678.05",
            change: "0.0",
            volume: "73170731",
        },
        {
            logo: require("../../assets/coins/uni.png"),
            symbol: "UNI",
            market: "UNI/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("../../assets/coins/avax.png"),
            symbol: "AVAX",
            market: "AVAX/USDT",
            price: "4,678.05",
            change: "-23.12",
            volume: "73170731",
        },
        {
            logo: require("../../assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/DAI",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
    ];

    const assetlist = [
        {
            logo: require("../../assets/coins/eth.png"),
            address: "0x1234",
            symbol: "ETH",
            name: "Ethereum",
            balance: 13.2156786156,
            using: 0,
            value: 20,
        },
        {
            logo: require("../../assets/coins/weth.png"),
            address: "0x2345",
            symbol: "WETH",
            name: "Wrapped Ethereum",
            balance: 42.1897845689,
            using: 0,
            value: 20,
        },
        {
            logo: require("../../assets/coins/meca.png"),
            address: "0x3456",
            symbol: "MECA",
            name: "Coinmeca",
            balance: 16.156781564,
            using: 0,
            value: 20,
        },
        {
            logo: require("../../assets/coins/usdt.png"),
            address: "0x4567",
            symbol: "USDT",
            name: "USD Tether",
            balance: 16.156781564,
            using: 0,
            value: 20,
        },
        {
            logo: require("../../assets/coins/arb.png"),
            address: "0x5678",
            symbol: "ARB",
            name: "Arbitrum",
            balance: 3261.156781564,
            using: 0,
        },
        {
            logo: require("../../assets/coins/avax.png"),
            address: "0x6789",
            symbol: "AVAX",
            name: "Avalanche",
            balance: 264.2156785612,
            using: 0,
            value: 20,
        },
    ];

    const path = usePathname();

    const colorMap: any = {
        "/samples": "var(--rainbow)",
        "/samples/asset": "red",
        "/samples/exchange": "orange",
        "/samples/treasury": "blue",
        "/samples/vault": "blue",
    };

    const languages = [
        {
            key: 1,
            value: "English",
        },
        {
            key: 2,
            value: "한국어",
        },
        {
            key: 3,
            value: "Español",
        },
        {
            key: 3,
            value: "Franch",
        },
        {
            key: 4,
            value: "日本語",
        },
        {
            key: 4,
            value: "中文",
        },
    ];

    const chains = [
        {
            key: 1,
            img: require("../../assets/coins/eth.png"),
            value: "Ethereum",
        },
        {
            key: 2,
            img: require("../../assets/coins/arb.png"),
            value: "Arbitrum",
        },
        {
            key: 3,
            img: require("../../assets/coins/op.png"),
            value: "Optimism",
        },
        {
            key: 4,
            img: require("../../assets/coins/avax.png"),
            value: "Avalanche",
        },
    ];

    const chainList = {
        runkeby: {
            id: 421611,
            name: "Arbitrum Rinkeby",
            rpc: [
                // "Safe" URLs
                "https://rinkeby.arbitrum.io/rpc",
            ],
            // logo: "https://l2beat.com/icons/arbitrum.png",
            logo: "/../../assets/coins/eth.png",
        },
        testnet: {
            id: 421613,
            name: "Arbitrum Testnet",
            rpc: [
                // "Safe" URLs
                "https://goerli-rollup.arbitrum.io/rpc",
            ],
            explorer: ["https://goerli.arbiscan.io/"],
            // logo: "https://l2beat.com/icons/arbitrum.png",
            logo: "/../../assets/coins/eth.png",
        },
    };

    const walletList = {
        MetaMask: {
            name: "MetaMask",
            url: "https://metamask.io/",
            // logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/120px-MetaMask_Fox.svg.png",
            logo: "/../../assets/coins/eth.png",
            adapter(url?: any) {
                // return new MetaMaskWalletAdapter();
                return alert("MetaMask");
            },
        },
        "Coinbase Wallet": {
            name: "Coinbase Wallet",
            url: "https://www.coinbase.com/wallet",
            // logo: "https://avatars.githubusercontent.com/u/18060234?s=280&v=4",
            logo: "/../../assets/coins/eth.png",
            adapter(url?: any) {
                // return new CoinbaseWalletAdapter();
                return alert("Coinbase Wallet");
            },
        },
    };

    const handleChain = (chain: any) => {
        fetchWalletList(chain);
    };

    const fetchWalletList = (chain?: any): any[] => {
        console.log(chain);
        // return walletList.filter((w: any) => w?.chain);
        return Object.values(walletList);
    };

    const Connect = () => (
        <Modals.Connect width={48} chains={chainList} wallets={fetchWalletList()} onClose={closeConnect} onChain={(c: any) => handleChain(c)} close />
    );
    const [handleConnect, closeConnect] = usePortal(<Connect />);

    const header = {
        color: colorMap[path],
        logo: {
            src: require("../../assets/coinmeca.svg"),
            width: 128,
            height: 48,
        },
        menu: {
            active: mobileMenu === "menu",
            children: [
                {
                    name: "Asset",
                    href: "/samples/asset",
                    onClick: () => setMobileMenu(""),
                },
                {
                    name: "Exchange",
                    href: "/samples/exchange",
                    onClick: () => setMobileMenu(""),
                },
                {
                    name: "Treasury",
                    href: "/samples/treasury",
                    onClick: () => setMobileMenu(""),
                },
            ],
        },
        option: {
            active: true,
            children: (
                <>
                    <Controls.Tab
                        onClick={() => (mobileMenu === "market" ? setMobileMenu("") : setMobileMenu("market"))}
                        active={mobileMenu === "market"}
                        iconLeft={"sidebar"}
                        hide={"desktop"}
                        toggle
                        fit
                        // onBlur={() => setMobileMenu("")}
                    />
                    <Controls.Tab
                        onClick={() => {
                            if (mobileMenu === "notify") {
                                setMobileMenu("");
                                resetCount();
                                // setRead(true);
                            } else {
                                // setRead(false);
                                setMobileMenu("notify");
                            }
                        }}
                        active={mobileMenu === "notify"}
                        iconLeft={{ icon: "bell", count: mobileMenu === "notify" ? 0 : count }}
                        toggle
                        fit
                        // onBlur={() => setMobileMenu("")}
                    />
                    <Controls.Tab
                        onClick={() => (mobileMenu === "setting" ? setMobileMenu("") : setMobileMenu("setting"))}
                        active={mobileMenu === "setting"}
                        iconLeft={"gear"}
                        show={"tablet"}
                        toggle
                        fit
                    />
                </>
            ),
        },
        side: {
            active: mobileMenu === "setting",
            children: (
                <>
                    <Layouts.Row fit>
                        <Controls.Dropdown option={languages[0]} options={languages} responsive={isMobile} fit />
                        <Controls.Dropdown option={chains[0]} options={chains} responsive={isMobile} fit />
                    </Layouts.Row>
                    {/* <Controls.Button fit>Connect</Controls.Button> */}
                    <Controls.Dropdown
                        keyName={"children"}
                        option={{
                            title: "0x16e39d21f7f3ab3dafabd12fc07f4fd4928fb47163e79bb879d0928ac34e817e",
                            children: (
                                <Elements.Avatar
                                    color={colorMap[`${path}`]}
                                    length={8}
                                    scale={0.6667}
                                    display={4}
                                    name={"0x16e39d21f7f3ab3dafabd12fc07f4fd4928fb47163e79bb879d0928ac34e817e"}
                                />
                            ),
                        }}
                        options={["Disconnect"]}
                        onClickItem={(e: any, v: any, k: number) => handleUserOption(k)}
                        responsive={isMobile}
                        fix
                    />
                </>
            ),
        },
    };

    const handleUserOption = (k: number) => {
        if (k === 0) alert("disconnect");
    };

    const [keyword, setKeyword] = useState<string>();
    const [selectedMarket, setSelectedMarket] = useState<number>(0);

    const sidebars = {
        active: true,
        lower: {
            onBlur: () => setMobileMenu(""),
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
                                {/* <Controls.Tab active={sidebarTab === "alert"} onClick={() => setSidebarTab("alert")}>
                                    Alert
                                </Controls.Tab> */}
                                <Controls.Tab active={sidebarTab === "asset"} onClick={() => setSidebarTab("asset")}>
                                    Assets
                                </Controls.Tab>
                            </Layouts.Row>
                            <Controls.Input
                                placeholder={"Search by name or symbol..."}
                                value={keyword}
                                onChange={(e: any, v: string, k: number) => setKeyword(v)}
                                left={{
                                    children: <Elements.Icon icon={"search"} />,
                                }}
                                right={{
                                    children: (
                                        <Controls.Dropdown
                                            keyName={"name"}
                                            option={markets[selectedMarket]}
                                            options={markets}
                                            onClickItem={(e: any, v: any, k: number) => setSelectedMarket(k)}
                                            style={{
                                                transition: ".3s ease",
                                                ...(sidebarTab !== "exchange" && { maxWidth: 0, opacity: 0, pointerEvents: "none" }),
                                            }}
                                        />
                                    ),
                                }}
                            />
                            <Layouts.Contents.InnerContent>
                                <Layouts.Contents.SlideContainer
                                    contents={[
                                        {
                                            active: sidebarTab === "exchange",
                                            style: { overflow: "hidden" },
                                            children: (
                                                <Sidebars.Market
                                                    list={Filter(marketlist, selectedMarket === 0 ? undefined : `/${markets[selectedMarket]?.name}`)}
                                                    filter={keyword}
                                                />
                                            ),
                                        },
                                        // {
                                        //     active: sidebarTab === "alert",
                                        //     children: <Sidebars.Market list={marketlist} filter={keyword} />,
                                        // },
                                        {
                                            active: sidebarTab === "asset",
                                            style: { overflow: "hidden" },
                                            children: <Sidebars.Asset list={assetlist} filter={keyword} />,
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
                    children: <Sidebars.Notification list={notis} count={count} />,
                },
            ],
        },
    };

    const toast = {
        active: toasts.length > 0 && mobileMenu !== "notify",
        list: toasts,
    };

    return {
        value,
        setValue,
        tab,
        setTab,
        active,
        setActive,
        markets,
        marketlist,
        assetlist,
        notilist,
        header,
        sidebars,
        toast,
    };
}
