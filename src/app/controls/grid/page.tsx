"use client";
import { Controls, Layouts } from "components";
import { GridContainer } from "components/layouts/contents";
import { useState } from "react";

export default function Grid() {
    const [tab, setTab] = useState("red");

    return (
        <Layouts.Content>
            <Layouts.Box>
                <Layouts.Contents.InnerContent>
                    <Layouts.Row gap={0} only>
                        <Controls.Tab active={tab === "red"} onClick={() => setTab("red")}>
                            Red
                        </Controls.Tab>
                        <Controls.Tab active={tab === "green"} onClick={() => setTab("green")}>
                            Green
                        </Controls.Tab>
                        <Controls.Tab active={tab === "yellow"} onClick={() => setTab("yellow")}>
                            Yellow
                        </Controls.Tab>
                    </Layouts.Row>
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
                        // contents={[
                        //     {
                        //         area: "area1",
                        //         children: "Red",
                        //         responsive: [
                        //             {
                        //                 device: "mobile",
                        //                 area: "up",
                        //             },
                        //         ],
                        //     },
                        //     {
                        //         area: "area2",
                        //         props: {
                        //             active: tab === "green",
                        //             style: { background: "green" },
                        //             children: <>Green</>,
                        //         },
                        //         responsive: [
                        //             {
                        //                 device: "mobile",
                        //                 area: "up",
                        //             },
                        //         ],
                        //     },
                        //     {
                        //         area: "area3",
                        //         props: {
                        //             active: tab === "yellow",
                        //             style: { background: "yellow" },
                        //             children: <>Yellow</>,
                        //         },
                        //         responsive: [
                        //             {
                        //                 device: "mobile",
                        //                 area: "up",
                        //             },
                        //         ],
                        //     },
                        //     {
                        //         area: "area4",
                        //         children: <div style={{ background: "blue" }}></div>,
                        //         responsive: [
                        //             {
                        //                 device: "mobile",
                        //                 area: "down",
                        //             },
                        //         ],
                        //     },
                        // ]}
                        // format={(props: any) => <Layouts.Contents.SlideContent {...props} />}
                        // format={<Layouts.Contents.SlideContent />}
                        // format={<></>}
                        // contents={[
                        //     {
                        //         area: "area1",
                        //         children: {
                        //             props: {
                        //                 active: tab === "red",
                        //                 style: { minHeight: 128 },
                        //             },
                        //             children: (
                        //                 <>
                        //                     {/* <Layouts.Contents.SlideContent active={tab === "red"} style={{ background: "red" }}> */}
                        //                     "Red",
                        //                     {/* </Layouts.Contents.SlideContent> */}
                        //                 </>
                        //             ),
                        //         },
                        //         responsive: [
                        //             {
                        //                 device: "tablet",
                        //                 area: "up",
                        //             },
                        //         ],
                        //     },
                        //     {
                        //         area: "area2",
                        //         children: {
                        //             props: {
                        //                 active: tab === "green",
                        //             },
                        //             children: (
                        //                 <>
                        //                     {/* <Layouts.Contents.SlideContent active={tab === "green"} style={{ background: "green" }}> */}
                        //                     "Green",
                        //                     {/* </Layouts.Contents.SlideContent> */}
                        //                 </>
                        //             ),
                        //         },
                        //         responsive: [
                        //             {
                        //                 device: "tablet",
                        //                 area: "up",
                        //             },
                        //         ],
                        //     },
                        //     {
                        //         area: "area3",
                        //         children: {
                        //             props: {
                        //                 active: tab === "yellow",
                        //             },
                        //             children: (
                        //                 <>
                        //                     {/* <Layouts.Contents.SlideContent active={tab === "yellow"} style={{ background: "yellow" }}> */}
                        //                     "Yellow",
                        //                     {/* </Layouts.Contents.SlideContent> */}
                        //                 </>
                        //             ),
                        //         },
                        //         responsive: [
                        //             {
                        //                 device: "tablet",
                        //                 area: "up",
                        //             },
                        //         ],
                        //     },
                        //     {
                        //         area: "area4",
                        //         children: {
                        //             props: {
                        //                 active: true,
                        //             },
                        //             children: <div style={{ background: "blue", height: 288 }}></div>,
                        //         },
                        //         responsive: [
                        //             {
                        //                 device: "tablet",
                        //                 area: "down",
                        //             },
                        //         ],
                        //     },
                        // ]}
                        contents={[
                            {
                                area: "area1",
                                props: { active: tab === "red", style: { background: "red" } },
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
                                    <Layouts.Contents.SlideContent active={tab === "green"} style={{ background: "green" }}>
                                        "Green"
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
                                        "Yellow"
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
                                children: {
                                    props: {
                                        active: true,
                                    },
                                    children: <div style={{ background: "blue", height: 288 }}></div>,
                                },
                                responsive: [
                                    {
                                        device: "tablet",
                                        area: "down",
                                    },
                                ],
                            },
                        ]}
                    />
                    {/* <GridContainer direction="col" width={{ min: 32 }} height={16}>
                        <div style={{ background: "red", display: "flex" }}></div>
                        <div style={{ background: "green", display: "flex" }}></div>
                        <div style={{ background: "yellow", display: "flex" }}></div>
                        <div style={{ background: "blue", display: "flex" }}></div>
                    </GridContainer> */}
                    {/* <GridContainer direction="row" width={32} height={{ min: 16 }}>
                        <div style={{ background: "red", display: "flex" }}></div>
                        <div style={{ background: "green", display: "flex" }}></div>
                        <div style={{ background: "yellow", display: "flex" }}></div>
                        <div style={{ background: "blue", display: "flex" }}></div>
                    </GridContainer> */}
                </Layouts.Contents.InnerContent>
            </Layouts.Box>
        </Layouts.Content>
    );
}
