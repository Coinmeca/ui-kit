import dynamic from "next/dynamic";
import { ComponentType, memo, ReactNode } from "react";
import Style, { Count } from "./Icon.styled";

export interface Icon {
    icon: string;
    color?: string;
    scale?: number;
    count?: number;
    title?: string;
}

export function Icon(props: Icon) {
    const color = props?.color || "white";
    const scale = props?.scale || 1;
    const title = props?.title || "";
    const count = props?.count && props?.count > 9999 && 9999;

    const Icons = props?.icon && props?.icon !== "" ? dynamic(() => import(`/src/assets/icons/${props?.icon}.svg`)) : <></>;

    return (
        <Style title={title} $color={color} $scale={scale}>
            <Icons />
            {props?.count && props?.count > 0 && <Count $color={color}>{props?.count}</Count>}
        </Style>
    );
}

export default memo(Icon);
