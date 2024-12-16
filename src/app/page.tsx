"use client";
import { Controls, Elements, Layouts } from "components";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MECA from "assets/graphics/meca.png";

export default function Home() {
    const router = useRouter();
    const handleClick = () => {
        router.push("/samples");
    };
    return (
        <>
            <Layouts.Panel active={true}>
                <Layouts.BG
                    video={{
                        poster: "",
                        src: "https://coinmeca.net/img/video/1.mp4",
                        controls: false,
                        muted: true,
                        autoPlay: true,
                        preload: "auto",
                        loop: true,
                    }}
                    filter={"black"}
                />
                <Layouts.Panel active={true} style={{ flexDirection: "column" }}>
                    <Layouts.Panel active={true}>
                        <Layouts.Col align="center" fit>
                            <Image src={MECA} width="256" height="256" alt="" />
                            <Layouts.Col>
                                <Elements.Text type={"h2"}>Coinmeca UI</Elements.Text>
                                <Layouts.Row gap={1} responsive="mobile">
                                    <Controls.Button
                                        onClick={() => {
                                            console.log("examples");
                                            router.push("/examples");
                                        }}>
                                        View Examples
                                    </Controls.Button>
                                    <Controls.Button onClick={handleClick}>View Samples</Controls.Button>
                                </Layouts.Row>
                            </Layouts.Col>
                        </Layouts.Col>
                    </Layouts.Panel>
                    <Elements.Text opacity={0.6} style={{ padding: "4em" }}>
                        ⓒ coinmeca. All rights reserved.
                    </Elements.Text>
                </Layouts.Panel>
            </Layouts.Panel>
        </>
    );
}
