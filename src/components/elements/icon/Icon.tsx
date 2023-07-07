import dynamic from "next/dynamic";
import { ComponentType, memo, ReactNode } from "react";
import Style from "./Icon.styled";

export interface Icon {
    icon: string;
    color?: string;
    scale?: number;
    title?: string;
}

export function Icon(props: Icon) {
    const color = props?.color || "white";
    const scale = props?.scale || 1;
    const title = props?.title || "";

    const Icons = props?.icon && props?.icon !== "" ? dynamic(() => import(`/src/assets/icons/${props?.icon}.svg`)) : <></>;

    return (
        <Style title={title} $color={color} $scale={scale}>
            <Icons />
        </Style>
    );
}

export default memo(Icon);
