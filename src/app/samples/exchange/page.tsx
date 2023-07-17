"use client";
import { Controls, Elements, Layouts } from "components";
import { Avatar } from "components/elements";
import { GridContainer } from "components/layouts/contents";
import useWindowSize from "hooks/useWindowSize";
import { Root } from "lib/style";
import { Capitalize, Format } from "lib/utils";
import { Exchange } from "prefabs";
import { useState } from "react";
import Data from "./data";

export default function Page() {
    const windowSize = useWindowSize();
    const { market, orderbook, info, orderbookView } = Data();

    const [mobile, setMobile] = useState("orderbook");
    const [marketTab, setMarketTab] = useState("orderbook");
    const [option, setOption] = useState<"market" | "limit">("market");
    const [tab, setTab] = useState<string>(option);
    const [view, setView] = useState(0);

    const isMobile = () => {
        var check: boolean = false;
        (function (a) {
            if (
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|modele|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                    a
                ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                    a.substr(0, 4)
                )
            )
                check = true;
        })(navigator.userAgent || navigator.vendor /*|| window.opera*/);
        return check;
    };

    return (
        <Layouts.Page>
            {alert(isMobile())}
            <Layouts.Box fit change={parseFloat(market?.change) > 0 ? "var(--green)" : (parseFloat(market?.change) < 0 && "var(--red)") || undefined}>
                <Layouts.Contents.InnerContent>
                    <Layouts.Row fix style={{ alignItems: "center" }}>
                        <Layouts.Row fix style={{ alignItems: "center" }} gap={2} fit>
                            <Avatar img={market.logo} scale={1.3334} />
                            <Layouts.Row responsive={"mobile"} gap={1} fit>
                                <Elements.Text scale={2.5} height={1} style={{ marginRight: "1em" }} responsive={{ device: "mobile", scale: 1.5 }}>
                                    {market?.base?.symbol?.toUpperCase()}
                                </Elements.Text>
                                <Elements.Text scale={2.5} height={1} responsive={{ device: "mobile", scale: 1.5 }}>
                                    {Capitalize(market?.base?.name || "")}
                                </Elements.Text>
                            </Layouts.Row>
                        </Layouts.Row>
                        <Layouts.Row fix align="right">
                            <Layouts.Row fix fit gap={1} style={{ alignItems: "center" }}>
                                <Elements.Icon scale={1.5} icon={"caret-up"} change />
                                <Elements.Text scale={2.5} height={1} responsive={{ device: "mobile", scale: 2 }} change>
                                    $ {Format(market.price, "currency", true)}
                                </Elements.Text>
                            </Layouts.Row>
                        </Layouts.Row>
                    </Layouts.Row>
                    <Layouts.Divider style={{ marginTop: "1em" }} />
                    <Layouts.Col show={"mobile"} gap={0}>
                        <Layouts.Row gap={1} fix>
                            <Controls.Tab active={mobile === "info"} onClick={() => setMobile("info")}>
                                Info
                            </Controls.Tab>
                            <Controls.Tab active={mobile === "orderbook"} onClick={() => setMobile("orderbook")}>
                                Orderbook
                            </Controls.Tab>
                            <Controls.Tab active={mobile === "chart"} onClick={() => setMobile("chart")}>
                                Chart
                            </Controls.Tab>
                        </Layouts.Row>
                        <Layouts.Divider />
                    </Layouts.Col>
                    <GridContainer
                        fullsize
                        area={`'info info' 'book chart' 'book order'`}
                        width={`${windowSize.width < Root.Device.Tablet ? "0.75fr" : "320px"} 1fr`}
                        height={"max-content 1fr max-content"}
                        gap={3}
                        responsive={[
                            {
                                device: "mobile",
                                area: `'up' 'down'`,
                                width: "1fr",
                                height: "1fr max-content",
                                gap: { col: 0, row: 2 },
                            },
                        ]}
                        contents={[
                            {
                                area: "info",
                                children: (
                                    <Layouts.Contents.SlideContent active={windowSize.width > Root.Device.Mobile ? true : mobile === "info"}>
                                        <Layouts.Row
                                            fix
                                            responsive="mobile"
                                            gap={windowSize.width > Root.Device.Mobile ? 4 : 1}
                                            style={{ marginTop: "0.5em", alignItems: "center", ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }) }}
                                        >
                                            <Layouts.Col gap={0.5}>
                                                <Layouts.Row fix gap={1} style={{ alignItems: "center", padding: "0.5em", ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }) }}>
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Volume ({market?.base?.symbol?.toUpperCase()})
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(info?.volume_base, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                                <Layouts.Row fix gap={1} style={{ alignItems: "center", padding: "0.5em", ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }) }}>
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Volume ({market?.quote?.symbol?.toUpperCase()})
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(info?.volume_quote, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </Layouts.Col>
                                            <Layouts.Col gap={0.5}>
                                                <Layouts.Row fix gap={1} style={{ alignItems: "center", padding: "0.5em", ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }) }}>
                                                    <Elements.Text opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Highest
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"green"}>
                                                        {Format(info?.high, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                                <Layouts.Row fix gap={1} style={{ alignItems: "center", padding: "0.5em", ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }) }}>
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Lowest
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"red"}>
                                                        {Format(info?.low, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </Layouts.Col>
                                            <Layouts.Col gap={0.5}>
                                                <Layouts.Row fix gap={1} style={{ alignItems: "center", padding: "0.5em", ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }) }}>
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Change
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} change>
                                                        {Format(info?.volume_base, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                                <Layouts.Row fix gap={1} style={{ alignItems: "center", padding: "0.5em", ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }) }}>
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Change Rate
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} change>
                                                        {Format(info?.volume_base, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </Layouts.Col>
                                            <Layouts.Col gap={0.5}>
                                                <Layouts.Row fix gap={1} style={{ alignItems: "center", padding: "0.5em", ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }) }}>
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Balance
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(info?.volume_base, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                                <Layouts.Row fix gap={1} style={{ alignItems: "center", padding: "0.5em", ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }) }}>
                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                        Using
                                                    </Elements.Text>
                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                        {Format(info?.volume_base, "currency", true)}
                                                    </Elements.Text>
                                                </Layouts.Row>
                                            </Layouts.Col>
                                        </Layouts.Row>
                                    </Layouts.Contents.SlideContent>
                                ),
                                responsive: [
                                    {
                                        device: "mobile",
                                        area: "up",
                                    },
                                ],
                            },
                            {
                                area: "book",
                                children: (
                                    <Layouts.Contents.SlideContent active={windowSize.width > Root.Device.Mobile ? true : mobile === "orderbook"}>
                                        <Layouts.Menu
                                            menu={{
                                                style: { overflow: "initial" },
                                                children: [
                                                    [
                                                        <>
                                                            <Controls.Tab
                                                                active={marketTab === "orderbook"}
                                                                onClick={() => {
                                                                    setMarketTab("orderbook");
                                                                    // setMobile("orderbook");
                                                                }}
                                                            >
                                                                Orderbook
                                                            </Controls.Tab>
                                                        </>,
                                                        <>
                                                            <Controls.Tab
                                                                active={marketTab === "history"}
                                                                onClick={() => {
                                                                    setMarketTab("history");
                                                                    // setMobile("history");
                                                                }}
                                                            >
                                                                Trades
                                                            </Controls.Tab>
                                                        </>,
                                                    ],
                                                    <>
                                                        <Controls.Dropdown
                                                            option={orderbookView[view]}
                                                            options={orderbookView}
                                                            onClickItem={(e: any, k: any) => {
                                                                setView(k);
                                                            }}
                                                        />
                                                    </>,
                                                ],
                                            }}
                                            hide={"mobile"}
                                        />
                                        <Layouts.Contents.TabContainer
                                            contents={[
                                                {
                                                    active: marketTab === "orderbook" || mobile === "orderbook",
                                                    style: { padding: 0 },
                                                    children: <Exchange.Orderbook view={view} asks={orderbook.asks} bids={orderbook.bids} responsive={{ device: "mobile", vertical: false }} />,
                                                },
                                                {
                                                    active: marketTab === "history" || mobile === "history",
                                                    children: <></>,
                                                },
                                            ]}
                                        />
                                    </Layouts.Contents.SlideContent>
                                ),
                                responsive: [
                                    {
                                        device: "mobile",
                                        area: "up",
                                    },
                                ],
                            },
                            {
                                area: "chart",
                                children: (
                                    <Layouts.Contents.SlideContent active={windowSize.width > Root.Device.Mobile ? true : mobile === "chart"} style={{ background: "yellow" }}>
                                        Yellow
                                    </Layouts.Contents.SlideContent>
                                ),
                                responsive: [
                                    {
                                        device: "mobile",
                                        area: "up",
                                    },
                                ],
                            },
                            {
                                area: "order",
                                children: (
                                    <Layouts.Contents.InnerContent>
                                        <Layouts.Menu
                                            menu={[
                                                [
                                                    [
                                                        <>
                                                            <Controls.Tab
                                                                active={tab === "market"}
                                                                onClick={() => {
                                                                    setTab("market");
                                                                    setOption("market");
                                                                }}
                                                            >
                                                                Market
                                                            </Controls.Tab>
                                                        </>,
                                                        <>
                                                            <Controls.Tab
                                                                active={tab === "limit"}
                                                                onClick={() => {
                                                                    setTab("limit");
                                                                    setOption("limit");
                                                                }}
                                                            >
                                                                Limit
                                                            </Controls.Tab>
                                                        </>,
                                                    ],
                                                    [
                                                        <>
                                                            <Controls.Tab
                                                                active={tab === "history"}
                                                                onClick={() => {
                                                                    setTab("history");
                                                                }}
                                                            >
                                                                History
                                                            </Controls.Tab>
                                                        </>,
                                                    ],
                                                ],
                                            ]}
                                        />
                                        <Layouts.Contents.TabContainer
                                            contents={[
                                                {
                                                    active: true,
                                                    children: (
                                                        <Layouts.Contents.InnerContent>
                                                            <Exchange.OrderControl base={market.base} quote={market.quote} price={market.price} option={option} responsive={Root.Device.Tablet} />
                                                        </Layouts.Contents.InnerContent>
                                                    ),
                                                },
                                            ]}
                                        />
                                    </Layouts.Contents.InnerContent>
                                ),
                                responsive: [
                                    {
                                        device: "mobile",
                                        area: "down",
                                    },
                                ],
                            },
                        ]}
                    />
                </Layouts.Contents.InnerContent>
            </Layouts.Box>
        </Layouts.Page>
    );
}
