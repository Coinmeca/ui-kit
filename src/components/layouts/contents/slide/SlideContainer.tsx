import SlideContent from "./SlideContent";
import type { SlideContent as Content } from "./SlideContent";
import Style from "./SlideContainer.styled";

export interface SlideContainer {
    contents?: Content[];
}

export default function SlideContainer(props: SlideContainer) {
    return (
        <Style>
            {props?.contents &&
                (props?.contents?.length > 0 ? (
                    props?.contents.map((content, i) => (
                        <SlideContent key={i} active={content.active}>
                            {content.children}
                        </SlideContent>
                    ))
                ) : (
                    <SlideContent>There is no content.</SlideContent>
                ))}
        </Style>
    );
}
