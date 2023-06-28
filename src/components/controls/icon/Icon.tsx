import dynamic from "next/dynamic";
import { memo } from "react";
import { Style } from "./Icon.styled";

interface Icon {
    icon: string;
    color?: string;
    scale?: number;
    title?: string;
}

export const Icon = memo((props: Icon) => {
    const color = props?.color || "white";
    const scale = props?.scale || 1;
    const title = props?.title || "";

    const Icons = dynamic(() => import(`./svgs/${props?.icon || "x"}.svg`));

    return (
        <Style title={title} $color={color} $scale={scale}>
            <Icons />
        </Style>
    );
});

export default Icon;
