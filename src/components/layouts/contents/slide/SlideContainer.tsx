import SlideContent from "./SlideContent";
import type { SlideContent as Content } from "./SlideContent";
import Style from "./SlideContainer.styled";
import { memo } from "react";

export interface SlideContainer {
    contents?: Content[];
    style?: object;
}

function SlideContainer(props: SlideContainer) {
    return (
        <Style style={props?.style}>
            {props?.contents &&
                (props?.contents?.length > 0 ? (
                    props?.contents.map((content, i) => (
                        <SlideContent key={i} active={content.active} style={content?.style}>
                            {content.children}
                        </SlideContent>
                    ))
                ) : (
                    <SlideContent>There is no content.</SlideContent>
                ))}
        </Style>
    );
}

export default memo(SlideContainer);
