import { type CSSProperties } from "react";
import SlideContent from "./SlideContent";
import { type SlideContent as Content } from "./SlideContent";
import Style from "./SlideContainer.styled";

export interface SlideContainer {
    contents?: Content[];
    style?: CSSProperties;
}

export default function SlideContainer(props: SlideContainer) {
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
