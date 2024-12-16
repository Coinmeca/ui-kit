"use client";

import TabContent from "./TabContent";
import { type TabContent as Content } from "./TabContent";
import Style from "./TabContainer.styled";

export interface TabContainer {
    contents?: Content[];
    style?: object;
    scroll?: boolean;
}

export default function TabContainer(props: TabContainer) {
    return (
        <Style $scroll={props?.scroll} style={props?.style}>
            {props?.contents &&
                (props?.contents?.length > 0 ? (
                    props?.contents.map((content, i) => (
                        <TabContent key={i} {...content}>
                            {content.children}
                        </TabContent>
                    ))
                ) : (
                    <TabContent>There is no content.</TabContent>
                ))}
        </Style>
    );
}
