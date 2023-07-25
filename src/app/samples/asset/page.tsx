"use client";
import { useState } from "react";
import { Root } from "lib/style";
import { Controls, Elements, Layouts } from "components";
import { Capitalize, Format } from "lib/utils";
import Data from "./data";
import { Modal, Modals } from "containers";
import useWindowSize from "hooks/useWindowSize";
import usePortal from "hooks/usePortal";

export default function Page() {
    const { windowSize } = useWindowSize();

    const [page, setPage] = useState(false);
    const { market, orderbook, info, orderbookView } = Data();

    const [mobile, setMobile] = useState("orderbook");
    const [marketTab, setMarketTab] = useState("orderbook");
    const [option, setOption] = useState<"market" | "limit">("market");
    const [tab, setTab] = useState<string>(option);
    const [view, setView] = useState(0);

    // const handleModal = () => {
    //     // portal(<Modals.Alert title={"This is a Modal."} message={"This is a modal content test message."} onClose={close} />);
    //     // portal(<Modal title={"This is a Modal."} message={"This is a modal content test message."} onClose={close} close />);
    //     handleDialogue();
    // };

    const [handleModal, closeDialogue] = usePortal(
        <Modal title={"This is a Modal."} message={"This is a modal content test message."} onClose={() => closeDialogue()} close />
    );

    const [state, setState] = useState<boolean | null>(null);
    const [handleProcessModal, closeProcessModal] = usePortal(
        <Modals.Process
            state={state}
            title={"This is a Modal."}
            content={
                <>
                    <Layouts.Contents.InnerContent>
                        <Elements.Text align="center" opacity={0.6}>
                            Here is the message for process modal.
                        </Elements.Text>
                    </Layouts.Contents.InnerContent>
                    <Layouts.Row fix gap={3}>
                        <Controls.Button
                            onClick={() => {
                                console.log(123);
                                setState(false);
                                console.log(state);
                            }}
                        >
                            Go to Left
                        </Controls.Button>
                        <Controls.Button onClick={() => setState(true)}>Go to Right</Controls.Button>
                    </Layouts.Row>
                </>
            }
            onClose={() => closeProcessModal()}
            close
        />
    );
    console.log("state", state);

    return (
        <Layouts.Page>
            <Layouts.Box fit>
                <Layouts.Contents.SlideContainer
                    contents={[
                        {
                            active: page === false,
                            children: (
                                <>
                                    <Layouts.Row fix style={{ alignItems: "center" }}>
                                        <Layouts.Row fix style={{ alignItems: "center" }} gap={2} fit>
                                            <Layouts.Row responsive={"mobile"} gap={1} fit>
                                                <Elements.Text
                                                    size={2.5}
                                                    height={1}
                                                    style={{ marginRight: "1em" }}
                                                    responsive={{ device: "mobile", size: 1.75 }}
                                                >
                                                    All Assets
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </Layouts.Row>
                                        <Layouts.Row fix align="right">
                                            <Layouts.Row fix fit gap={1} style={{ alignItems: "center" }}>
                                                <Elements.Text size={2.5} height={1} responsive={{ device: "mobile", size: 1.75 }} change>
                                                    $ {Format("1,567,851,378.516", "currency", true)}
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </Layouts.Row>
                                    </Layouts.Row>
                                    <Layouts.Divider style={{ marginTop: "1em" }} />
                                    {/* <Layouts.Col show={"mobile"} gap={0}>
                                        <Layouts.Row gap={1} fix>
                                            <Controls.Tab active={mobile === "info"} onClick={()=> setMobile("info")}>
                                                Info
                                            </Controls.Tab>
                                            <Controls.Tab active={mobile === "orderbook"} onClick={()=> setMobile("orderbook")}>
                                                Orderbook
                                            </Controls.Tab>
                                            <Controls.Tab active={mobile === "chart"} onClick={()=> setMobile("chart")}>
                                                Chart
                                            </Controls.Tab>
                                        </Layouts.Row>
                                        <Layouts.Divider />
                                    </Layouts.Col> */}
                                    <Layouts.Contents.GridContainer
                                        fullsize
                                        area={`'info info' 'book list' 'book list'`}
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
                                                            style={{
                                                                marginTop: "0.5em",
                                                                alignItems: "center",
                                                                ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                            }}
                                                        >
                                                            <Layouts.Col gap={0.5}>
                                                                <Layouts.Row
                                                                    fix
                                                                    gap={1}
                                                                    style={{
                                                                        alignItems: "center",
                                                                        padding: "0.5em",
                                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                                    }}
                                                                >
                                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                                        Volume ({market?.base?.symbol?.toUpperCase()})
                                                                    </Elements.Text>
                                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                                        {Format(info?.volume_base, "currency", true)}
                                                                    </Elements.Text>
                                                                </Layouts.Row>
                                                                <Layouts.Row
                                                                    fix
                                                                    gap={1}
                                                                    style={{
                                                                        alignItems: "center",
                                                                        padding: "0.5em",
                                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                                    }}
                                                                >
                                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                                        Volume ({market?.quote?.symbol?.toUpperCase()})
                                                                    </Elements.Text>
                                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                                        {Format(info?.volume_quote, "currency", true)}
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
                                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                                    }}
                                                                >
                                                                    <Elements.Text opacity={0.6} style={{ minWidth: "max-content" }}>
                                                                        Highest
                                                                    </Elements.Text>
                                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"green"}>
                                                                        {Format(info?.high, "currency", true)}
                                                                    </Elements.Text>
                                                                </Layouts.Row>
                                                                <Layouts.Row
                                                                    fix
                                                                    gap={1}
                                                                    style={{
                                                                        alignItems: "center",
                                                                        padding: "0.5em",
                                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                                    }}
                                                                >
                                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                                        Lowest
                                                                    </Elements.Text>
                                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"red"}>
                                                                        {Format(info?.low, "currency", true)}
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
                                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                                    }}
                                                                >
                                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                                        Change
                                                                    </Elements.Text>
                                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} change>
                                                                        {Format(info?.volume_base, "currency", true)}
                                                                    </Elements.Text>
                                                                </Layouts.Row>
                                                                <Layouts.Row
                                                                    fix
                                                                    gap={1}
                                                                    style={{
                                                                        alignItems: "center",
                                                                        padding: "0.5em",
                                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                                    }}
                                                                >
                                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                                        Change Rate
                                                                    </Elements.Text>
                                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} change>
                                                                        {Format(info?.volume_base, "currency", true)}
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
                                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                                    }}
                                                                >
                                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                                        Balance
                                                                    </Elements.Text>
                                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                                        {Format(info?.volume_base, "currency", true)}
                                                                    </Elements.Text>
                                                                </Layouts.Row>
                                                                <Layouts.Row
                                                                    fix
                                                                    gap={1}
                                                                    style={{
                                                                        alignItems: "center",
                                                                        padding: "0.5em",
                                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                                    }}
                                                                >
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
                                                    <Layouts.Contents.SlideContent
                                                        active={windowSize.width > Root.Device.Mobile ? true : mobile === "orderbook"}
                                                    >
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
                                                                    children: <>Fiat</>,
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
                                                area: "list",
                                                children: (
                                                    <Layouts.Contents.InnerContent>
                                                        <Layouts.Menu
                                                            menu={[
                                                                [
                                                                    [
                                                                        <>
                                                                            <Controls.Tab disabled>Assets</Controls.Tab>
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
                                                                            <Controls.Button onClick={() => setPage(true)}>Go to</Controls.Button>
                                                                            <Controls.Button onClick={handleModal}>Show modal</Controls.Button>
                                                                            <Controls.Button onClick={handleProcessModal}>Show process modal</Controls.Button>
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
                                </>
                            ),
                        },
                        {
                            active: page === true,
                            children: (
                                <>
                                    <Layouts.Row fix style={{ alignItems: "center" }}>
                                        <Layouts.Row fix style={{ alignItems: "center" }} gap={2} fit>
                                            <Controls.Button icon={"chevron-left"} onClick={() => setPage(false)} />
                                            <Elements.Avatar img={market.logo} scale={1.3334} />
                                            <Layouts.Row responsive={"mobile"} gap={1} fit>
                                                <Elements.Text
                                                    size={2.5}
                                                    height={1}
                                                    style={{ marginRight: "1em" }}
                                                    responsive={{ device: "mobile", size: 1.5 }}
                                                >
                                                    {"ETH".toUpperCase()}
                                                </Elements.Text>
                                                <Elements.Text size={2.5} height={1} responsive={{ device: "mobile", size: 1.5 }}>
                                                    {Capitalize("Ethereum" || "")}
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </Layouts.Row>
                                        <Layouts.Row fix align="right">
                                            <Layouts.Row fix fit gap={1} style={{ alignItems: "center" }}>
                                                <Elements.Text size={2.5} height={1} responsive={{ device: "mobile", size: 2 }} change>
                                                    $ {Format("1,567,851,378.516", "currency", true)}
                                                </Elements.Text>
                                            </Layouts.Row>
                                        </Layouts.Row>
                                    </Layouts.Row>
                                    <Layouts.Divider style={{ marginTop: "1em" }} />
                                    {/* <Layouts.Col show={"mobile"} gap={0}>
                                        <Layouts.Row gap={1} fix>
                                            <Controls.Tab active={mobile === "info"} onClick={()=> setMobile("info")}>
                                                Info
                                            </Controls.Tab>
                                            <Controls.Tab active={mobile === "orderbook"} onClick={()=> setMobile("orderbook")}>
                                                Orderbook
                                            </Controls.Tab>
                                            <Controls.Tab active={mobile === "chart"} onClick={()=> setMobile("chart")}>
                                                Chart
                                            </Controls.Tab>
                                        </Layouts.Row>
                                        <Layouts.Divider />
                                    </Layouts.Col> */}
                                    <Layouts.Contents.GridContainer
                                        fullsize
                                        area={`'info info' 'book list' 'book list'`}
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
                                                            style={{
                                                                marginTop: "0.5em",
                                                                alignItems: "center",
                                                                ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                            }}
                                                        >
                                                            <Layouts.Col gap={0.5}>
                                                                <Layouts.Row
                                                                    fix
                                                                    gap={1}
                                                                    style={{
                                                                        alignItems: "center",
                                                                        padding: "0.5em",
                                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                                    }}
                                                                >
                                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                                        Volume ({market?.base?.symbol?.toUpperCase()})
                                                                    </Elements.Text>
                                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                                        {Format(info?.volume_base, "currency", true)}
                                                                    </Elements.Text>
                                                                </Layouts.Row>
                                                                <Layouts.Row
                                                                    fix
                                                                    gap={1}
                                                                    style={{
                                                                        alignItems: "center",
                                                                        padding: "0.5em",
                                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                                    }}
                                                                >
                                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                                        Volume ({market?.quote?.symbol?.toUpperCase()})
                                                                    </Elements.Text>
                                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                                        {Format(info?.volume_quote, "currency", true)}
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
                                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                                    }}
                                                                >
                                                                    <Elements.Text opacity={0.6} style={{ minWidth: "max-content" }}>
                                                                        Highest
                                                                    </Elements.Text>
                                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"green"}>
                                                                        {Format(info?.high, "currency", true)}
                                                                    </Elements.Text>
                                                                </Layouts.Row>
                                                                <Layouts.Row
                                                                    fix
                                                                    gap={1}
                                                                    style={{
                                                                        alignItems: "center",
                                                                        padding: "0.5em",
                                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                                    }}
                                                                >
                                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                                        Lowest
                                                                    </Elements.Text>
                                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} color={"red"}>
                                                                        {Format(info?.low, "currency", true)}
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
                                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                                    }}
                                                                >
                                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                                        Change
                                                                    </Elements.Text>
                                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} change>
                                                                        {Format(info?.volume_base, "currency", true)}
                                                                    </Elements.Text>
                                                                </Layouts.Row>
                                                                <Layouts.Row
                                                                    fix
                                                                    gap={1}
                                                                    style={{
                                                                        alignItems: "center",
                                                                        padding: "0.5em",
                                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                                    }}
                                                                >
                                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                                        Change Rate
                                                                    </Elements.Text>
                                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }} change>
                                                                        {Format(info?.volume_base, "currency", true)}
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
                                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                                    }}
                                                                >
                                                                    <Elements.Text height={1} opacity={0.6} style={{ minWidth: "max-content" }}>
                                                                        Balance
                                                                    </Elements.Text>
                                                                    <Elements.Text height={1} align="right" style={{ minWidth: "max-content" }}>
                                                                        {Format(info?.volume_base, "currency", true)}
                                                                    </Elements.Text>
                                                                </Layouts.Row>
                                                                <Layouts.Row
                                                                    fix
                                                                    gap={1}
                                                                    style={{
                                                                        alignItems: "center",
                                                                        padding: "0.5em",
                                                                        ...(windowSize.width <= Root.Device.Mobile && { height: "100%" }),
                                                                    }}
                                                                >
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
                                                    <Layouts.Contents.SlideContent
                                                        active={windowSize.width > Root.Device.Mobile ? true : mobile === "orderbook"}
                                                    >
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
                                                                    children: <>Fiat</>,
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
                                                area: "list",
                                                children: (
                                                    <Layouts.Contents.InnerContent>
                                                        <Layouts.Menu
                                                            menu={[
                                                                [
                                                                    [
                                                                        <>
                                                                            <Controls.Tab disabled>Assets</Controls.Tab>
                                                                        </>,
                                                                    ],
                                                                ],
                                                            ]}
                                                        />
                                                        <Layouts.Contents.TabContainer
                                                            contents={[
                                                                {
                                                                    active: true,
                                                                    children: <Layouts.Contents.InnerContent>history</Layouts.Contents.InnerContent>,
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
                                </>
                            ),
                        },
                    ]}
                />
            </Layouts.Box>
        </Layouts.Page>
    );
}
