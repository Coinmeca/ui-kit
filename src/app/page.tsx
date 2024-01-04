"use client";
import { Controls, Elements, Layouts } from "components";
import Image from "next/image";
import MECA from "assets/graphics/meca.png";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <Layouts.Panel>
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
            <Layouts.Col align="center" fit>
                <Image src={MECA} width="256" height="256" alt="" />
                <Layouts.Col>
                    <Elements.Text type={"h2"}>Coinmeca UI</Elements.Text>
                    <Layouts.Row gap={1} responsive="mobile">
                        <Controls.Button onClick={() => router.push("/examples")}>View Examples</Controls.Button>
                        <Controls.Button onClick={() => router.push("/samples")}>View Samples</Controls.Button>
                    </Layouts.Row>
                </Layouts.Col>
            </Layouts.Col>
        </Layouts.Panel>
    );
}
