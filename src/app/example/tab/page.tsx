"use client";
import { Controls, Layouts } from "components";
import Dummy from "../dummy";

export default function Tab() {
    const { slides2, tab, setTab, tabs } = Dummy();

    return (
        <Layouts.Content>
            <Layouts.Cover>
                <Controls.Slide slides={slides2} padding={0} timer={3000} align={"left"} nav={"top"} style={{ zIndex: 4 }} />
            </Layouts.Cover>
            <Layouts.Box>
                <Layouts.Contents.InnerContent>
                    Exchange
                    <Layouts.Row>
                        <Controls.Tab active={tab === "icon"} onClick={() => setTab("icon")}>
                            Icon
                        </Controls.Tab>
                        <Controls.Tab active={tab === "button"} onClick={() => setTab("button")}>
                            Button
                        </Controls.Tab>
                        <Controls.Tab active={tab === "dropdown"} onClick={() => setTab("dropdown")}>
                            Dropdown
                        </Controls.Tab>
                        <Controls.Tab active={tab === "input"} onClick={() => setTab("input")}>
                            Input
                        </Controls.Tab>
                        <Controls.Tab active={tab === "range"} onClick={() => setTab("range")}>
                            Range
                        </Controls.Tab>
                    </Layouts.Row>
                    <Layouts.Divider />
                    <Layouts.Contents.TabContainer contents={tabs} />
                </Layouts.Contents.InnerContent>
            </Layouts.Box>
        </Layouts.Content>
    );
}
