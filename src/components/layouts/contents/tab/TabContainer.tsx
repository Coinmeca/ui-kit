import TabContent from "./TabContent";
import type { TabContent as Content } from "./TabContent";

export interface TabContainer {
    content?: Content[];
}

export default function TabContainer(props: TabContainer) {
    return <div>{props?.content && (props?.content?.length > 0 ? props?.content.map(() => <TabContent active={}></TabContent>) : <TabContent></TabContent>)}</div>;
}
