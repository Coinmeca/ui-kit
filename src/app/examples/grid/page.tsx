"use client";
import { Controls, Layouts } from "components";
import { useState } from "react";
import DummyGrid from "./grid";

export default function Page() {
    const { tab, setTab, Grid1, Grid2, Grid3, Grid4, Grid5, Grid6 } =
        DummyGrid();
    const [grid, setGrid] = useState(1);

    return (
        <Layouts.Page>
            <Layouts.Box fit>
                <Layouts.Row gap={0}>
                    <Controls.Tab
                        active={grid === 1}
                        onClick={() => setGrid(1)}
                    >
                        Format(Function)
                    </Controls.Tab>
                    <Controls.Tab
                        active={grid === 2}
                        onClick={() => setGrid(2)}
                    >
                        Format(Component)
                    </Controls.Tab>
                    <Controls.Tab
                        active={grid === 3}
                        onClick={() => setGrid(3)}
                    >
                        No Format
                    </Controls.Tab>
                    <Controls.Tab
                        active={grid === 4}
                        onClick={() => setGrid(4)}
                    >
                        As Children(Row)
                    </Controls.Tab>
                    <Controls.Tab
                        active={grid === 5}
                        onClick={() => setGrid(5)}
                    >
                        As Children(Col)
                    </Controls.Tab>
                    <Controls.Tab
                        active={grid === 6}
                        onClick={() => setGrid(6)}
                    >
                        For Sample
                    </Controls.Tab>
                </Layouts.Row>
                <Layouts.Contents.TabContainer
                    contents={[
                        {
                            active: grid === 1,
                            children: (
                                <Layouts.Contents.InnerContent>
                                    <Layouts.Row gap={0} fix>
                                        <Controls.Tab
                                            active={tab === "red"}
                                            onClick={() => setTab("red")}
                                        >
                                            Red
                                        </Controls.Tab>
                                        <Controls.Tab
                                            active={tab === "green"}
                                            onClick={() => setTab("green")}
                                        >
                                            Green
                                        </Controls.Tab>
                                        <Controls.Tab
                                            active={tab === "yellow"}
                                            onClick={() => setTab("yellow")}
                                        >
                                            Yellow
                                        </Controls.Tab>
                                    </Layouts.Row>
                                    {Grid1}
                                </Layouts.Contents.InnerContent>
                            ),
                        },
                        {
                            active: grid === 2,
                            children: (
                                <Layouts.Contents.InnerContent>
                                    <Layouts.Row gap={0} fix>
                                        <Controls.Tab
                                            active={tab === "red"}
                                            onClick={() => setTab("red")}
                                        >
                                            Red
                                        </Controls.Tab>
                                        <Controls.Tab
                                            active={tab === "green"}
                                            onClick={() => setTab("green")}
                                        >
                                            Green
                                        </Controls.Tab>
                                        <Controls.Tab
                                            active={tab === "yellow"}
                                            onClick={() => setTab("yellow")}
                                        >
                                            Yellow
                                        </Controls.Tab>
                                    </Layouts.Row>
                                    {Grid2}
                                </Layouts.Contents.InnerContent>
                            ),
                        },
                        {
                            active: grid === 3,
                            children: (
                                <Layouts.Contents.InnerContent>
                                    <Layouts.Row gap={0} fix>
                                        <Controls.Tab
                                            active={tab === "red"}
                                            onClick={() => setTab("red")}
                                        >
                                            Red
                                        </Controls.Tab>
                                        <Controls.Tab
                                            active={tab === "green"}
                                            onClick={() => setTab("green")}
                                        >
                                            Green
                                        </Controls.Tab>
                                        <Controls.Tab
                                            active={tab === "yellow"}
                                            onClick={() => setTab("yellow")}
                                        >
                                            Yellow
                                        </Controls.Tab>
                                    </Layouts.Row>
                                    {Grid3}
                                </Layouts.Contents.InnerContent>
                            ),
                        },
                        {
                            active: grid === 4,
                            children: (
                                <Layouts.Contents.InnerContent>
                                    {Grid4}
                                </Layouts.Contents.InnerContent>
                            ),
                        },
                        {
                            active: grid === 5,
                            children: (
                                <Layouts.Contents.InnerContent>
                                    {Grid5}
                                </Layouts.Contents.InnerContent>
                            ),
                        },
                        {
                            active: grid === 6,
                            children: (
                                <Layouts.Contents.InnerContent>
                                    <Layouts.Row gap={0} fix>
                                        <Controls.Tab
                                            active={tab === "red"}
                                            onClick={() => setTab("red")}
                                        >
                                            Red
                                        </Controls.Tab>
                                        <Controls.Tab
                                            active={tab === "green"}
                                            onClick={() => setTab("green")}
                                        >
                                            Green
                                        </Controls.Tab>
                                        <Controls.Tab
                                            active={tab === "yellow"}
                                            onClick={() => setTab("yellow")}
                                        >
                                            Yellow
                                        </Controls.Tab>
                                    </Layouts.Row>
                                    {Grid6}
                                </Layouts.Contents.InnerContent>
                            ),
                        },
                    ]}
                />
            </Layouts.Box>
        </Layouts.Page>
    );
}
