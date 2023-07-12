import { Elements, Layouts } from "components";
import { GridContainer } from "components/layouts/contents";
import { useState } from "react";

export default function DummyGrid() {
    const [tab, setTab] = useState("red");

    const Grid1 = (
        <GridContainer
            fullsize
            area={`'area1 area1' 'area2 area3' 'area2 area4'`}
            width={"384px 1fr"}
            height={"max-content 1fr max-content"}
            gap={3}
            responsive={[
                // Way to use for responsive style
                // {
                //     device: "laptop",
                //     gap: 2,
                // },
                {
                    device: "tablet",
                    area: `'up' 'down'`,
                    width: "1fr",
                    height: "1fr max-content",
                    gap: { col: 0, row: 2 },
                },
            ]}
            format={(props: any) => (
                <Layouts.Contents.SlideContent {...props}>
                    <Elements.Text type={"h6"}>{props?.title}</Elements.Text>
                    <Elements.Text type={"p"}>{props?.message}</Elements.Text>
                </Layouts.Contents.SlideContent>
            )}
            contents={[
                {
                    area: "area1",
                    // Props property only use for format
                    props: {
                        active: tab === "red",
                        style: { background: "rgba(var(--red), var(--o015))" },
                        title: "this is 1st title",
                        message: "this is 1st message, and Yellow won't work",
                    },
                    responsive: [
                        {
                            device: "tablet",
                            area: "up",
                        },
                    ],
                },
                {
                    area: "area2",
                    // Props property only use for format
                    props: {
                        active: tab === "green",
                        style: { background: "rgba(var(--green), var(--o015))" },
                        title: "this is 2nd title",
                        message: "this is 2nd message, and Yellow won't work",
                    },
                    children: <Layouts.Contents.SlideContent style={{ background: "green" }}>Green</Layouts.Contents.SlideContent>,
                    responsive: [
                        {
                            device: "tablet",
                            area: "up",
                        },
                    ],
                },
                // Wrong way to use
                {
                    area: "area3",
                    // Props property only use for format
                    props: {
                        style: { background: "rgba(var(--yellow), var(--o015))" },
                        title: "this is 3rd title",
                        message: "this is 3rd message",
                    },
                    children: (
                        <Layouts.Contents.SlideContent active={tab === "yellow"} style={{ background: "yellow" }}>
                            Yellow
                        </Layouts.Contents.SlideContent>
                    ),
                    responsive: [
                        {
                            device: "tablet",
                            area: "up",
                        },
                    ],
                },
                {
                    area: "area4",
                    // Props property only use for format
                    props: {
                        active: true,
                        style: { background: "rgba(var(--blue), var(--o015))" },
                        title: "Way to use Yellow is wrong.",
                        message: "Yellow won't work.",
                    },
                    children: <div style={{ background: "blue", height: 288 }}></div>,
                    responsive: [
                        {
                            device: "tablet",
                            area: "down",
                        },
                    ],
                },
            ]}
        />
    );

    const Grid2 = (
        <GridContainer
            fullsize
            area={`'area1 area1' 'area2 area3' 'area2 area4'`}
            width={"384px 1fr"}
            height={"max-content 1fr max-content"}
            gap={3}
            responsive={[
                {
                    device: "tablet",
                    area: `'up' 'down'`,
                    width: "1fr",
                    height: "1fr max-content",
                    gap: { col: 0, row: 2 },
                },
            ]}
            format={<Layouts.Contents.SlideContent />}
            contents={[
                {
                    area: "area1",
                    props: {
                        active: tab === "red",
                    },
                    children: <>Green won't work</>,
                    responsive: [
                        {
                            device: "tablet",
                            area: "up",
                        },
                    ],
                },
                // Wrong way to use
                {
                    area: "area2",
                    // Props property only use for format
                    props: {
                        active: tab === "green",
                    },
                    children: <span style={{ background: "green" }}>Green</span>,
                    responsive: [
                        {
                            device: "tablet",
                            area: "up",
                        },
                    ],
                },
                {
                    area: "area3",
                    // Props property only use for format
                    props: {
                        active: tab === "yellow",
                    },
                    children: {
                        props: { active: tab === "yellow" },
                        children: <Layouts.Contents.SlideContent style={{ background: "yellow" }}>Green</Layouts.Contents.SlideContent>,
                    },
                    responsive: [
                        {
                            device: "tablet",
                            area: "up",
                        },
                    ],
                },
                {
                    area: "area4",
                    // Props property only use for format
                    props: {
                        active: true,
                    },
                    children: <div style={{ background: "blue", height: 288 }}>Green won't work with wrong way to use.</div>,
                    responsive: [
                        {
                            device: "tablet",
                            area: "down",
                        },
                    ],
                },
            ]}
        />
    );

    const Grid3 = (
        <GridContainer
            fullsize
            area={`'area1 area1' 'area2 area3' 'area2 area4'`}
            width={"384px 1fr"}
            height={"max-content 1fr max-content"}
            gap={3}
            responsive={[
                // {
                //     device: "laptop",
                //     gap: 2,
                // },
                {
                    device: "tablet",
                    area: `'up' 'down'`,
                    width: "1fr",
                    height: "1fr max-content",
                    gap: { col: 0, row: 2 },
                },
            ]}
            contents={[
                {
                    area: "area1",
                    children: <>"Red"</>,
                    responsive: [
                        {
                            device: "tablet",
                            area: "up",
                        },
                    ],
                },
                {
                    area: "area2",
                    children: (
                        // Props property have to positioned into the children when without format
                        <Layouts.Contents.SlideContent active={tab === "green"} style={{ background: "green" }}>
                            Green
                        </Layouts.Contents.SlideContent>
                    ),
                    responsive: [
                        {
                            device: "tablet",
                            area: "up",
                        },
                    ],
                },
                // Wrong way to use
                {
                    area: "area3",
                    children: {
                        // Props property only use for children (without format)
                        props: { active: tab === "yellow" },
                        children: <Layouts.Contents.SlideContent style={{ background: "yellow" }}>Yellow</Layouts.Contents.SlideContent>,
                    },
                    responsive: [
                        {
                            device: "tablet",
                            area: "up",
                        },
                    ],
                },
                {
                    area: "area4",
                    children: <div style={{ background: "blue", height: 288 }}></div>,
                    responsive: [
                        {
                            device: "tablet",
                            area: "down",
                        },
                    ],
                },
            ]}
        />
    );

    const Grid4 = (
        <GridContainer direction="row" width={{ min: 24 }} height={16} fullsize>
            <div style={{ gridArea: "initial", background: "red", display: "flex" }}></div>
            <div style={{ gridArea: "initial", background: "green", display: "flex" }}></div>
            <div style={{ gridArea: "initial", background: "yellow", display: "flex" }}></div>
            <div style={{ gridArea: "initial", background: "blue", display: "flex" }}></div>
        </GridContainer>
    );

    const Grid5 = (
        <GridContainer direction="col" width={32} height={{ min: 8, max: 16 }} fullsize>
            <div style={{ gridArea: "initial", background: "red", display: "flex" }}></div>
            <div style={{ gridArea: "initial", background: "green", display: "flex" }}></div>
            <div style={{ gridArea: "initial", background: "yellow", display: "flex" }}></div>
            <div style={{ gridArea: "initial", background: "blue", display: "flex" }}></div>
        </GridContainer>
    );

    // Sample for DEX
    const Grid6 = (
        <GridContainer
            fullsize
            area={`'area1 area1' 'area2 area3' 'area2 area4'`}
            width={"384px 1fr"}
            height={"max-content 1fr max-content"}
            gap={3}
            responsive={[
                // {
                //     device: "laptop",
                //     gap: 2,
                // },
                {
                    device: "tablet",
                    area: `'up' 'down'`,
                    width: "1fr",
                    height: "1fr max-content",
                    gap: { col: 0, row: 2 },
                },
            ]}
            contents={[
                {
                    area: "area1",
                    children: (
                        <Layouts.Contents.SlideContent active={tab === "red"} style={{ background: "red" }}>
                            "Red"
                        </Layouts.Contents.SlideContent>
                    ),
                    responsive: [
                        {
                            device: "tablet",
                            area: "up",
                        },
                    ],
                },
                {
                    area: "area2",
                    children: (
                        <Layouts.Contents.SlideContent active={tab === "green"} style={{ background: "green" }}>
                            Green
                        </Layouts.Contents.SlideContent>
                    ),
                    responsive: [
                        {
                            device: "tablet",
                            area: "up",
                        },
                    ],
                },
                {
                    area: "area3",
                    children: (
                        <Layouts.Contents.SlideContent active={tab === "yellow"} style={{ background: "yellow" }}>
                            Yellow
                        </Layouts.Contents.SlideContent>
                    ),
                    responsive: [
                        {
                            device: "tablet",
                            area: "up",
                        },
                    ],
                },
                {
                    area: "area4",
                    children: <div style={{ background: "purple", height: 288 }}></div>,
                    responsive: [
                        {
                            device: "tablet",
                            area: "down",
                        },
                    ],
                },
            ]}
        />
    );

    return { tab, setTab, Grid1, Grid2, Grid3, Grid4, Grid5, Grid6 };
}
