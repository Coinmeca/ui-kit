import TabContent from "./TabContent";
import type { TabContent as Content } from "./TabContent";
import Style from "./TabContainer.styled";

export interface TabContainer {
    contents?: Content[];
}

export default function TabContainer(props: TabContainer) {
    return (
        <Style>
            {props?.contents &&
                (props?.contents?.length > 0 ? (
                    props?.contents.map((content, i) => (
                        <TabContent key={i} active={content.active}>
                            {content.children}
                        </TabContent>
                    ))
                ) : (
                    <TabContent>There is no content.</TabContent>
                ))}
        </Style>
    );
}
