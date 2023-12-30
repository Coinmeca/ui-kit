"use client";
import Image from "next/image";
import { Controls, Elements, Layouts } from "components";
import { type SlideContent } from "components/controls/slide/Slide";
import { createGlobalStyle, styled } from "styled-components";
import { useWindowSize } from "hooks";
import { Root } from "lib/style";

import Part0 from "assets/graphics/part0.png";
import Part1 from "assets/graphics/part1.png";
import Part2 from "assets/graphics/part2.png";

import Imac1 from "assets/main/imac_trading.png";
import Imac2 from "assets/main/imac_analysis.png";

import Btn1 from "assets/main/btn1.png";
import Btn2 from "assets/main/btn2.png";
import Btn3 from "assets/main/btn3.png";
import Btn4 from "assets/main/btn4.png";

import * as Row from "components/layouts/row/Row.styled";
import { createRef, useRef } from "react";

export default function Main() {
    const { windowSize } = useWindowSize();

    const filter = {
        color: "black",
        opacity: 0.6,
    };

    const story = [
        {
            head: "DEX that you never have experience till now",
            body: "Orderbook trading makes it possible to order with much lower slippage, and also give a more comfortable trading experience with various order options.",
        },
        {
            head: "Much cheaper, and more transparent",
            body: "Coinmeca serves fully on-chain orderbook that the transparency of all transactions, and also with best optimized features for much cheaper gas fees.",
        },
        {
            head: "More powerful token utility.",
            body: "Tokenomics, which is designed based on Token utility with various utilities such as payment, fees, collateral, and governance, further strengthens its value as a currency.",
        },
    ];

    const slides: SlideContent[] = [
        {
            background: {
                img: {
                    src: 10,
                },
                filter,
            },
            children: (
                <Layouts.Col align="center" gap={8} style={{ maxWidth: "96em" }}>
                    <Layouts.Col align="center" gap={4}>
                        <Elements.Text type={"h2"} style={{ wordBreak: "break-word" }}>
                            {story[0].head}
                        </Elements.Text>
                        <Elements.Text type={"h6"} style={{ wordBreak: "break-word" }}>
                            {story[0].body}
                        </Elements.Text>
                    </Layouts.Col>
                    <Controls.Button scale={1.25} fit>
                        Get Started to Exchange
                    </Controls.Button>
                </Layouts.Col>
            ),
        },
        {
            background: {
                // img: {
                //     src: 3,
                // },
                video: {
                    poster: "",
                    src: "https://coinmeca.net/img/video/1.mp4",
                    controls: false,
                    muted: true,
                    autoPlay: true,
                    preload: "auto",
                    loop: true,
                },
                filter,
            },
            children: (
                <Layouts.Col align="center" gap={8} style={{ maxWidth: "96em" }}>
                    <Layouts.Col align="center" gap={4}>
                        <Elements.Text type={"h2"} style={{ wordBreak: "break-word" }}>
                            {story[1].head}
                        </Elements.Text>
                        <Elements.Text type={"h6"} style={{ wordBreak: "break-word" }}>
                            {story[1].body}
                        </Elements.Text>
                    </Layouts.Col>
                    <Controls.Button scale={1.25} fit>
                        Get Started to Exchange
                    </Controls.Button>
                </Layouts.Col>
            ),
        },
        {
            background: {
                img: {
                    src: 4,
                },
                filter,
            },
            children: (
                <Layouts.Col align="center" gap={8} style={{ maxWidth: "96em" }}>
                    <Layouts.Col align="center" gap={4}>
                        <Elements.Text type={"h2"} style={{ wordBreak: "break-word" }}>
                            {story[2].head}
                        </Elements.Text>
                        <Elements.Text type={"h6"} style={{ wordBreak: "break-word" }}>
                            {story[2].body}
                        </Elements.Text>
                    </Layouts.Col>
                    <Controls.Button scale={1.25} fit>
                        Get Started to Exchange
                    </Controls.Button>
                </Layouts.Col>
            ),
        },
    ];

    const ref = createRef();

    return (
        <Style>
            <Layouts.Cover style={{ scrollSnapAlign: "start" }} fullsize>
                <Controls.Slide timer={5000} align={{ vertical: "center", horizon: "center" }} nav={"bottom"} slides={slides} />
            </Layouts.Cover>
            <NoScrollSnap />
            <Layouts.Page>
                <Layouts.Box padding={0} style={{ overflow: "hidden" }}>
                    <Layouts.Col gap={0}>
                        <section className="section s1">
                            <Layouts.Col gap={0} align={"center"}>
                                <Image className="part p1" src={Part0} alt="" />
                                <Layouts.Row gap={8}>
                                    <div />
                                    <Layouts.Col gap={2} align={"left"}>
                                        <Elements.Text type={"h2"} style={{ wordBreak: "break-word" }}>
                                            coinmeca
                                        </Elements.Text>
                                        <Elements.Text type={"p"} opacity={0.6} style={{ wordBreak: "break-word" }}>
                                            {
                                                "Coinmeca imagines more than just a DEX. We strive to provide integrated and fully decentralized financial services based on DEX as an on-chain hub."
                                            }
                                        </Elements.Text>
                                    </Layouts.Col>
                                </Layouts.Row>
                                <div className="video">
                                    <iframe
                                        title="Coinmeca"
                                        src="https://player.vimeo.com/video/311623434?title=0&amp;byline=0&amp;portrait=0"
                                        frameBorder="0"
                                        allow="autoplay; fullscreen"
                                        allowFullScreen={true}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </div>
                            </Layouts.Col>
                        </section>
                        <section className="section s2">
                            <Layouts.Row
                                gap={windowSize.width > Root.Device.Mobile ? 8 : 4}
                                align={"center"}
                                responsive={"mobile"}
                                reverse={windowSize.width > Root.Device.Mobile ? false : true}
                            >
                                <div className="content">
                                    <div>
                                        <Layouts.Col gap={4} align={windowSize.width > Root.Device.Mobile ? "left" : "center"}>
                                            <Layouts.Col gap={2}>
                                                <Elements.Text type={"h5"} style={{ wordBreak: "break-word" }}>
                                                    Automated Liquidity Distributor
                                                </Elements.Text>
                                                <Elements.Text type={"p"} opacity={0.6} align={"left"} style={{ wordBreak: "break-word" }}>
                                                    {
                                                        "The ALD algorithm is designed to automatically distribute liquidity across the order book. The order book provides a visual representation of the liquidity distribution. Users can make liquidity even more abundant by stacking amounts through orders on top of this base liquidity, giving them the possibility to try different trading strategies while further minimizing slippage."
                                                    }
                                                </Elements.Text>
                                            </Layouts.Col>
                                            <Controls.Button type={"solid"} color={"black"} fit={windowSize.width > Root.Device.Mobile ? true : false}>
                                                VIEW MORE
                                            </Controls.Button>
                                        </Layouts.Col>
                                    </div>
                                </div>
                                <div className="area a1">
                                    <div />
                                    <Image className="part p2" src={Part1} alt="" />
                                    <Image src={Imac1} alt="" />
                                </div>
                            </Layouts.Row>
                        </section>
                        <section className="section s3">
                            <Layouts.Row gap={windowSize.width > Root.Device.Mobile ? 8 : 4} align={"center"} responsive={"mobile"} reverse>
                                <div className="content">
                                    <div>
                                        <Layouts.Col gap={4} align={windowSize.width > Root.Device.Mobile ? "left" : "center"}>
                                            <Layouts.Col gap={2}>
                                                <Elements.Text type={"h5"} style={{ wordBreak: "break-word" }}>
                                                    Order NFT
                                                </Elements.Text>
                                                <Elements.Text type={"p"} opacity={0.6} align={"left"} style={{ wordBreak: "break-word" }}>
                                                    {
                                                        "The limit order is transformed into a tokenized form. Tokenized orders can be transferred to others, and can take advantage of good positions based on predictions through an order book that processes orders in the order they are executed. This type of trading is not just limited to spot trading but also enables options trading. Also, if your orders have been filled and can be billed, they could be used as collateral."
                                                    }
                                                </Elements.Text>
                                            </Layouts.Col>
                                            <Controls.Button type={"solid"} color={"black"} fit={windowSize.width > Root.Device.Mobile ? true : false}>
                                                VIEW MORE
                                            </Controls.Button>
                                        </Layouts.Col>
                                    </div>
                                </div>
                                <div className="area a2">
                                    <div />
                                    <Image className="part p3" src={Part2} alt={""} />
                                    <Image src={Imac2} alt={""} />
                                </div>
                            </Layouts.Row>
                        </section>
                    </Layouts.Col>
                </Layouts.Box>
                <Layouts.Cover
                    height={48}
                    background={{
                        background: "black",
                        filter: { color: "black", opacity: 0.6 },
                        img: { src: require("../../assets/banners/inbox/1.png"), style: { objectFit: "none" } },
                    }}
                    style={{ scrollSnapAlign: "initial" }}
                >
                    <Layouts.Row align={"center"} style={{ position: "relative", zIndex: 2 }} fill>
                        <Layouts.Col align={"center"} fit>
                            <Elements.Text type={"h2"} style={{ wordBreak: "break-word" }}>
                                coinmeca
                            </Elements.Text>
                            <Elements.Text type={"p"} opacity={0.6} style={{ wordBreak: "break-word" }}>
                                Get new experience of crypto finance life on coinmeca.
                            </Elements.Text>
                        </Layouts.Col>
                    </Layouts.Row>
                </Layouts.Cover>
                <Layouts.Box padding={0}>
                    <section className="section s4">
                        <Layouts.Col align={"center"} gap={windowSize.width > Root.Device.Tablet ? 8 : 4}>
                            <Layouts.Col align={"center"}>
                                <Elements.Text type={"h3"} style={{ wordBreak: "break-word" }}>
                                    Faster and Easier
                                </Elements.Text>
                                <Elements.Text type={"p"} style={{ wordBreak: "break-word" }}>
                                    {"Optimizaed experience for you. Get more information or connect with people by joining the community."}
                                </Elements.Text>
                            </Layouts.Col>
                            <Layouts.Col
                                gap={4}
                                align={"center"}
                                style={{ width: windowSize.width > Root.Device.Tablet ? "80%" : "100%", transition: ".3s ease" }}
                            >
                                <Layouts.Row gap={2} responsive={"mobile"}>
                                    <a style={{ background: `url(${Btn1?.src}) 0% 0% / cover` }} href={"https://docs.coinmeca.net"} target={"_blank"}>
                                        <Layouts.Col gap={2} align={"right"} style={{ justifyContent: "space-between!important" }} fill>
                                            <Elements.Text size={2} weight={"bold"}>
                                                Cryptocurrency
                                                <br />
                                                Trading Guide
                                            </Elements.Text>
                                            <Layouts.Row align={"right"}>
                                                <Elements.Icon icon={"chevron-right-bold"} scale={1.25} />
                                            </Layouts.Row>
                                        </Layouts.Col>
                                    </a>
                                    <a style={{ background: `url(${Btn2?.src}) 0% 0% / cover` }} href={"https://docs.coinmeca.net"} target={"_blank"}>
                                        <Layouts.Col gap={2} align={"right"} style={{ justifyContent: "space-between!important" }} fill>
                                            <Elements.Text size={2} weight={"bold"}>
                                                Cryptocurrency
                                                <br />
                                                Deposit / Withdraw
                                                <br />
                                                Guide
                                            </Elements.Text>
                                            <Layouts.Row align={"right"}>
                                                <Elements.Icon icon={"chevron-right-bold"} scale={1.25} />
                                            </Layouts.Row>
                                        </Layouts.Col>
                                    </a>
                                </Layouts.Row>
                                <Layouts.Row gap={2} responsive={"mobile"}>
                                    <a style={{ background: `url(${Btn3?.src}) 0% 0% / cover` }} href={"https://twitter.com/coinmeca"} target={"_blank"}>
                                        <Layouts.Col gap={2} align={"right"} style={{ justifyContent: "space-between!important" }} fill>
                                            <Elements.Text size={2} weight={"bold"}>
                                                Check Recent
                                                <br />
                                                Announcements
                                            </Elements.Text>
                                            <Layouts.Row align={"right"}>
                                                <Elements.Icon icon={"chevron-right-bold"} scale={1.25} />
                                            </Layouts.Row>
                                        </Layouts.Col>
                                    </a>
                                    <a style={{ background: `url(${Btn4?.src}) 0% 0% / cover` }} href={"https://discord.gg/m5Duwc9J"} target={"_blank"}>
                                        <Layouts.Col gap={2} align={"right"} style={{ justifyContent: "space-between!important" }} fill>
                                            <Elements.Text size={2} weight={"bold"}>
                                                Join
                                                <br />
                                                Our Community
                                            </Elements.Text>
                                            <Layouts.Row align={"right"}>
                                                <Elements.Icon icon={"chevron-right-bold"} scale={1.25} />
                                            </Layouts.Row>
                                        </Layouts.Col>
                                    </a>
                                </Layouts.Row>
                            </Layouts.Col>
                        </Layouts.Col>
                    </section>
                    <Layouts.Cover
                        background={{
                            background: "rgba(var(--white),0.045)",
                            img: { src: require("../../assets/main/mobile_screens.png") },
                        }}
                        style={{ height: `calc(100vh - 6em)`, scrollSnapAlign: "end" }}
                        fullsize
                    >
                        <Layouts.Contents.InnerContent padding={8}>
                            <Layouts.Col style={{ maxWidth: "70em" }}>
                                <Layouts.Col gap={4}>
                                    <Elements.Text type={"h3"} style={{ wordBreak: "break-word" }}>
                                        Anytime, Anywhere
                                    </Elements.Text>
                                    <Elements.Text type={"p"} style={{ wordBreak: "break-word" }}>
                                        You can access it anywhere and whenever you want. Coinmeca will unfold out an amazing decentralized trading system out
                                        to your hand, also an optimized user interface for the user with responsive design.
                                    </Elements.Text>
                                </Layouts.Col>
                                <Layouts.Row align={"left"}>
                                    <Controls.Button iconLeft={"exchange"} fit>
                                        {"Get started to trade"}
                                    </Controls.Button>
                                    {/* <Controls.Button iconLeft={"bank"} fit>
                                        Apple Store
                                    </Controls.Button> */}
                                </Layouts.Row>
                            </Layouts.Col>
                        </Layouts.Contents.InnerContent>
                    </Layouts.Cover>
                </Layouts.Box>
            </Layouts.Page>
        </Style>
    );
}

const NoScrollSnap = createGlobalStyle`
    main {
        scroll-snap-type: initial !important;
    }
`;

const Style = styled.main`
    @keyframes shake_right {
        0% {
            transform: translateX(0);
        }
        50% {
            transform: translateX(-15%);
        }
        100% {
            transform: translateX(0);
        }
    }

    & {
        iframe {
            position: relative;
            z-index: 10;
        }

        img {
            width: 100%;
            height: auto;
            transition: 0.3s ease;
        }

        .section {
            position: relative;
            padding: 16em 8em;

            .video {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                margin: 0;
                aspect-ratio: 16 / 9;
                margin-top: 5%;
                transition: 0.3s ease;
            }

            .content {
                display: flex;
                align-items: center;
                justify-content: center;

                & > * {
                    max-width: 50em;
                }
            }

            &.s2 {
                margin-top: -8em;
            }

            &.s3 {
                margin-bottom: 8em;
            }

            &.s4 {
                a {
                    display: flex;
                    align-items: end;
                    justify-content: stretch;
                    padding: 3em;
                    width: calc(100% - 6em);
                    aspect-ratio: 2 / 0.75;
                    cursor: pointer;

                    & * {
                        color: white;
                        fill: white;
                    }

                    &:hover {
                        i {
                            animation: shake_right 0.3s ease 2;
                        }
                    }
                }
            }
        }

        .part {
            position: absolute;
            z-index: 0;

            &.p1 {
                top: 15em;
                right: 0;

                & + * {
                    margin-bottom: 8em;
                }
            }

            &.p2 {
                top: -110%;
                right: -25%;
            }

            &.p3 {
                width: 110%;
                top: -25%;
                left: -15%;
            }
        }

        .area {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            aspect-ratio: 1 / 0.75;

            &.a1 {
                & > *:first-child {
                    left: 0;
                }
            }

            &.a2 {
                & > *:first-child {
                    right: 0;
                }
            }

            & > * {
                &:first-child {
                    position: absolute;
                    width: 150%;
                    height: 100%;
                    background: rgba(var(--white), var(--o0045));
                }

                &:not(:first-child) {
                    position: absolute;
                }
            }

            img:last-child {
                width: 150%;
            }
        }
    }

    @media all and (max-width: ${Root.Device.Tablet}px) {
        .section {
            position: relative;
            padding: 8em 4em;

            .video {
                width: 100vw;
                /* margin-left: -4em; */
                margin-bottom: 4em;
            }
        }
    }

    @media all and (max-width: ${Root.Device.Mobile}px) {
        .section {
            padding: 4em;
            padding-top: 8em;

            &.s1 {
                ${Row.default} {
                    & > div:first-child {
                        display: none;
                    }
                }
            }

            &.s2 {
                margin-bottom: 4em;
            }

            &.s3 {
                padding-top: 4em;
                margin-bottom: 4em;
            }

            &.s4 {
                a {
                    aspect-ratio: 2 / 1;
                }
            }

            .content > * {
                max-width: initial;
            }

            .part {
                position: absolute;
                z-index: 0;

                &.p1 {
                    top: 36%;

                    & + * {
                        margin-bottom: 4em;
                    }
                }

                &.p2 {
                    top: -95%;
                    /* right: -25%; */
                }
            }

            .area {
                margin-bottom: 10%;

                img:last-child {
                    width: 150%;
                }
            }
        }
    }
`;
