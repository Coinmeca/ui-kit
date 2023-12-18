import Image from "next/image";
import { Controls, Elements, Layouts } from "components";
import "./page.scss";

export default function Main() {
    const slides = [
        {
            background: { src: 5 },
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
                video: {
                    poster: "",
                    src: "https://firebasestorage.googleapis.com/v0/b/coinmeca-3e733.appspot.com/o/cm_bg.mp4?alt=media&token=fca0814a-8000-4af7-b4ca-f372e686bff7",
                    controls: false,
                    muted: true,
                    autoPlay: true,
                    preload: "auto",
                    loop: true,
                },
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
            background: { src: 4 },
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

    return (
        <Layouts.Page>
            <Layouts.Cover style={{ scrollSnapAlign: "start" }} fullsize>
                <Controls.Slide timer={3000} align={{ vertical: "center", horizon: "center" }} nav={"bottom"} slides={slides} />
            </Layouts.Cover>
            <Layouts.Box>
                <Layouts.Col gap={16}>
                    <Layouts.Col gap={8} align={"center"}>
                        <Image src="/../../assets/graphics/part0.pngg" width={640} height={240} alt="" />
                        <Layouts.Row gap={8}>
                            <div />
                            <div>
                                <Layouts.Col gap={2} align={"left"}>
                                    <Elements.Text type={"h3"}>coinmeca</Elements.Text>
                                    <Elements.Text type={"p"} opacity={0.6}>
                                        Let us experience this together, more than faster, easier trading and you can meet your variety to exchange now.
                                    </Elements.Text>
                                </Layouts.Col>
                            </div>
                        </Layouts.Row>
                        <div style={{ aspectRatio: "16 / 9" }}>
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
                    <Layouts.Row gap={8} align={"center"} responsive={"mobile"}>
                        <Layouts.Col gap={4} align={"left"}>
                            <Layouts.Col gap={2}>
                                <Elements.Text type={"h5"}>Fast Trading</Elements.Text>
                                <Elements.Text type={"p"} opacity={0.6}>
                                    The Convenient layout makes trading fast and easy. It is also possible to process the buy and sell simultaneously on one
                                    screen.
                                </Elements.Text>
                            </Layouts.Col>
                            <Controls.Button type={"solid"} color={"black"} fit>
                                VIEW MORE
                            </Controls.Button>
                        </Layouts.Col>
                        <div style={{ aspectRatio: "1 / 1", background: "rgba(var(--white), var(--o0045))" }}>
                            <div />
                            <img src="/assets/main/part1.png" alt="" />
                            <img src="/assets/main/imac_trading.png" alt="" />
                        </div>
                    </Layouts.Row>
                    <Layouts.Row gap={8} align={"center"} responsive={"mobile"} reverse>
                        <Layouts.Col gap={4} align={"left"}>
                            <Layouts.Col gap={2}>
                                <Elements.Text type={"h5"}>Asset Analyze</Elements.Text>
                                <Elements.Text type={"p"} opacity={0.6}>
                                    We analyze your assets in various ways by referring to your transaction records. You can be offered information about your
                                    asset management and profit. Check it out now.
                                </Elements.Text>
                            </Layouts.Col>
                            <Controls.Button type={"solid"} color={"black"} fit>
                                VIEW MORE
                            </Controls.Button>
                        </Layouts.Col>
                        <div style={{ aspectRatio: "1 / 1", background: "rgba(var(--white), var(--o0045))" }}>
                            <div />
                            <img src={"/assets/main/part2.png"} alt={""} />
                            <img src={"/assets/main/imac_analysis.png"} alt={""} />
                        </div>
                    </Layouts.Row>
                </Layouts.Col>
            </Layouts.Box>
            <Layouts.Cover
                height={32}
                background={{ background: "black", filter: { color: "black", opacity: 0.6 }, img: { src: "/assets/banner/inbox/1.png" } }}
                style={{ scrollSnapAlign: "initial" }}
            >
                <Layouts.Row align={"center"} fill>
                    <Layouts.Col align={"center"} fit>
                        <Elements.Text type={"h5"}>coinmeca</Elements.Text>
                        <Elements.Text type={"p"} opacity={0.6}>
                            Get new experience of crypto finance life on coinmeca.
                        </Elements.Text>
                    </Layouts.Col>
                </Layouts.Row>
            </Layouts.Cover>
            <div className="banner" style={{ background: "black" }}>
                <div style={{ background: "url() center / cover no-repeat" }} />
                <div className="filter" />
            </div>
            <Layouts.Box>
                <Layouts.Col>
                    <Layouts.Col align={"center"}>
                        <Elements.Text type={"h3"}>Faster and Easier</Elements.Text>
                        <Elements.Text type={"p"}>Optimized User Interface for you. Let experience now.</Elements.Text>
                    </Layouts.Col>
                    <Layouts.Col>
                        <Layouts.Row>
                            <button className="button align_right" style={{ background: "url(/assets/main/btn1.png) 0% 0% / cover" }}>
                                <div>
                                    <div className="title">
                                        Cryptocurrency
                                        <br />
                                        Trading Guide
                                    </div>
                                    <div className="icon icon_next white" />
                                </div>
                            </button>
                            <button className="button" style={{ background: `url('assets/main/btn2.png') 0% 0% / cover` }}>
                                <div>
                                    <div className="title">
                                        Cryptocurrency
                                        <br />
                                        Deposit / Withdraw
                                        <br />
                                        Guide
                                    </div>
                                    <div className="icon icon_next white" />
                                </div>
                            </button>
                        </Layouts.Row>
                        <Layouts.Row>
                            <button className="button" style={{ background: `url('assets/main/btn3.png') 0% 0% / cover` }}>
                                <div>
                                    <div className="title">
                                        Check Recent
                                        <br />
                                        Announcements
                                    </div>
                                    <div className="icon icon_next white" />
                                </div>
                            </button>
                            <button className="button" style={{ background: `url('assets/main/btn4.png') 0% 0% / cover` }}>
                                <div>
                                    <div className="title">
                                        Join to
                                        <br />
                                        coinmeca
                                    </div>
                                    <div className="icon icon_next white" />
                                </div>
                            </button>
                        </Layouts.Row>
                    </Layouts.Col>
                </Layouts.Col>
            </Layouts.Box>
            <Layouts.Cover
                height={32}
                background={{
                    background: "/../../assets/main/mobile_screens.png",
                    filter: "black",
                }}
                style={{ scrollSnapAlign: "end" }}
                fullsize
            >
                <Layouts.Contents.InnerContent padding={8}>
                    <Layouts.Col>
                        <Layouts.Col gap={4}>
                            <Elements.Text type={"h3"}>Anytime, Anywhere</Elements.Text>
                            <Elements.Text type={"p"}>
                                You can access it anywhere and whenever you want. Coinmeca will unfold out an amazing trading system out to your hand, also an
                                optimized user interface for the user.
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
        </Layouts.Page>
    );
}
