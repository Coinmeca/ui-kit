"use client";
import Image from "next/image";
import { Controls, Elements, Layouts } from "components";
import { SlideContent } from "components/controls/slide/Slide";
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

    const slides: SlideContent[] = [
        {
            background: {
                img: {
                    src: 3,
                },
                filter,
            },
            children: (
                <Layouts.Col align="center" gap={8}>
                    <Layouts.Col align="center" gap={4}>
                        <Elements.Text type={"h2"}>Much Faster and Much Easier Coin Exchange</Elements.Text>
                        <Elements.Text type={"h6"}>Start with your new experience a decentralized coin trading system on Coinmeca.</Elements.Text>
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
                    src: 10,
                },
                // video: {
                //     poster: "",
                //     src: "https://firebasestorage.googleapis.com/v0/b/coinmeca-3e733.appspot.com/o/cm_bg.mp4?alt=media&token=fca0814a-8000-4af7-b4ca-f372e686bff7",
                //     controls: false,
                //     muted: true,
                //     autoPlay: true,
                //     preload: "auto",
                //     loop: true,
                // },
                filter,
            },
            children: (
                <Layouts.Col align="center" gap={8}>
                    <Layouts.Col align="center" gap={4}>
                        <Elements.Text type={"h2"}>Meet Brand New Finance</Elements.Text>
                        <Elements.Text type={"h6"}>Start your crypto financial life on Coinmeca. Receive it, Pay it, Trade it.</Elements.Text>
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
                <Layouts.Col align="center" gap={8}>
                    <Layouts.Col align="center" gap={4}>
                        <Elements.Text type={"h2"}>Make Profits with Trading</Elements.Text>
                        <Elements.Text type={"h6"}>{"Let's get earned Coinmeca Token free according your service usage."}</Elements.Text>
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
                <Controls.Slide timer={3000} align={{ vertical: "center", horizon: "center" }} nav={"bottom"} slides={slides} />
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
                                        <Elements.Text type={"h2"}>coinmeca</Elements.Text>
                                        <Elements.Text type={"p"} height={2} opacity={0.6}>
                                            Let us experience this together, more than faster, easier trading and you can meet your variety to exchange now.
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
                                gap={windowSize.width > Root.Device.Mobile ? 8 : 12}
                                align={"center"}
                                responsive={"mobile"}
                                reverse={windowSize.width > Root.Device.Mobile ? false : true}
                            >
                                <div className="content">
                                    <div>
                                        <Layouts.Col gap={4} align={windowSize.width > Root.Device.Mobile ? "left" : "center"}>
                                            <Layouts.Col gap={2}>
                                                <Elements.Text type={"h5"}>Fast Trading</Elements.Text>
                                                <Elements.Text type={"p"} opacity={0.6}>
                                                    The Convenient layout makes trading fast and easy. It is also possible to process the buy and sell
                                                    simultaneously on one screen.
                                                </Elements.Text>
                                            </Layouts.Col>
                                            <Controls.Button type={"solid"} color={"black"} fit>
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
                            <Layouts.Row gap={windowSize.width > Root.Device.Mobile ? 8 : 12} align={"center"} responsive={"mobile"} reverse>
                                <div className="content">
                                    <div>
                                        <Layouts.Col gap={4} align={windowSize.width > Root.Device.Mobile ? "left" : "center"}>
                                            <Layouts.Col gap={2}>
                                                <Elements.Text type={"h5"}>Asset Analyze</Elements.Text>
                                                <Elements.Text type={"p"} opacity={0.6}>
                                                    We analyze your assets in various ways by referring to your transaction records. You can be offered
                                                    information about your asset management and profit. Check it out now.
                                                </Elements.Text>
                                            </Layouts.Col>
                                            <Controls.Button type={"solid"} color={"black"} fit>
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
                        img: { src: require("../../assets/banners/inbox/1.png") },
                    }}
                    style={{ scrollSnapAlign: "initial" }}
                >
                    <Layouts.Row align={"center"} style={{ position: "relative", zIndex: 2 }} fill>
                        <Layouts.Col align={"center"} fit>
                            <Elements.Text type={"h2"}>coinmeca</Elements.Text>
                            <Elements.Text type={"p"} opacity={0.6}>
                                Get new experience of crypto finance life on coinmeca.
                            </Elements.Text>
                        </Layouts.Col>
                    </Layouts.Row>
                </Layouts.Cover>
                <Layouts.Box padding={0}>
                    <section className="section s4">
                        <Layouts.Col align={"center"} gap={windowSize.width > Root.Device.Tablet ? 16 : 8}>
                            <Layouts.Col align={"center"}>
                                <Elements.Text type={"h3"}>Faster and Easier</Elements.Text>
                                <Elements.Text type={"p"}>Optimized User Interface for you. Let experience now.</Elements.Text>
                            </Layouts.Col>
                            <Layouts.Col align={"center"} style={{ width: windowSize.width > Root.Device.Tablet ? "80%" : "100%", transition: ".3s ease" }}>
                                <Layouts.Row responsive="tablet">
                                    <a style={{ background: `url(${Btn1?.src}) 0% 0% / cover` }}>
                                        <Layouts.Col gap={0} align={"right"} style={{ justifyContent: "space-between!important", alignItems: "end" }} fill>
                                            <Elements.Text size={2} weight={"bold"}>
                                                Cryptocurrency
                                                <br />
                                                Trading Guide
                                            </Elements.Text>
                                            <Elements.Icon icon={"chevron-right-bold"} scale={1.25} />
                                        </Layouts.Col>
                                    </a>
                                    <a style={{ background: `url(${Btn2?.src}) 0% 0% / cover` }}>
                                        <Layouts.Col gap={0} align={"right"} style={{ justifyContent: "space-between!important", alignItems: "end" }} fill>
                                            <Elements.Text size={2} weight={"bold"}>
                                                Cryptocurrency
                                                <br />
                                                Deposit / Withdraw
                                                <br />
                                                Guide
                                            </Elements.Text>
                                            <Elements.Icon icon={"chevron-right-bold"} scale={1.25} />
                                        </Layouts.Col>
                                    </a>
                                </Layouts.Row>
                                <Layouts.Row responsive="tablet">
                                    <a style={{ background: `url(${Btn3?.src}) 0% 0% / cover` }}>
                                        <Layouts.Col gap={0} align={"right"} style={{ justifyContent: "space-between!important", alignItems: "end" }} fill>
                                            <Elements.Text size={2} weight={"bold"}>
                                                Check Recent
                                                <br />
                                                Announcements
                                            </Elements.Text>
                                            <Elements.Icon icon={"chevron-right-bold"} scale={1.25} />
                                        </Layouts.Col>
                                    </a>
                                    <a style={{ background: `url(${Btn4?.src}) 0% 0% / cover` }}>
                                        <Layouts.Col gap={0} align={"right"} style={{ justifyContent: "space-between!important", alignItems: "end" }} fill>
                                            <Elements.Text size={2} weight={"bold"}>
                                                Join to
                                                <br />
                                                coinmeca
                                            </Elements.Text>
                                            <Elements.Icon icon={"chevron-right-bold"} scale={1.25} />
                                        </Layouts.Col>
                                    </a>
                                </Layouts.Row>
                            </Layouts.Col>
                        </Layouts.Col>
                    </section>
                    <Layouts.Cover
                        background={{
                            background: "rgba(var(--black),0.15)",
                            img: { src: require("../../assets/main/mobile_screens.png") },
                        }}
                        style={{ height: `calc(100vh - 6em)`, scrollSnapAlign: "end" }}
                        fullsize
                    >
                        <Layouts.Contents.InnerContent padding={windowSize.width > Root.Device.Tablet ? 16 : [8, 4]}>
                            <Layouts.Col style={{ maxWidth: "70em" }}>
                                <Layouts.Col gap={4}>
                                    <Elements.Text type={"h3"}>Anytime, Anywhere</Elements.Text>
                                    <Elements.Text type={"p"}>
                                        You can access it anywhere and whenever you want. Coinmeca will unfold out an amazing trading system out to your hand,
                                        also an optimized user interface for the user.
                                    </Elements.Text>
                                </Layouts.Col>
                                <Layouts.Row align={"left"}>
                                    <Controls.Button iconLeft={"bank"} fit>
                                        Google Play
                                    </Controls.Button>
                                    <Controls.Button iconLeft={"bank"} fit>
                                        Apple Store
                                    </Controls.Button>
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
                    padding: 4em;
                    width: calc(100% - 8em);
                    aspect-ratio: 2 / 1;
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
                    margin-bottom: 10em;
                }
            }

            &.p2 {
                top: -90%;
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
                width: calc(100% + 8em);
                margin-left: -4em;
                margin-bottom: 8em;
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
                margin-bottom: 2em;
            }

            &.s3 {
                margin-bottom: 4em;
            }

            &.s4 {
                a {
                    aspect-ratio: 2 / 0.75;
                }
            }

            .content > * {
                max-width: initial;
            }

            .part {
                position: absolute;
                z-index: 0;

                &.p1 {
                    top: 22.5em;
                }

                &.p2 {
                    top: -95%;
                    /* right: -25%; */
                }
            }

            .area {
                margin-bottom: 4em;

                img:last-child {
                    width: 150%;
                }
            }
        }
    }
`;
