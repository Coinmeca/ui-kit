import dynamic from "next/dynamic";
import { useMemo } from "react";
import Style from "./Icon.styled";

export interface Icon {
    icon: string;
    color?: string;
    scale?: number;
    title?: string;
}

export default function Icon(props: Icon) {
    const color = props?.color || "white";
    const scale = props?.scale || 1;
    const title = props?.title || "";

    const Icons = useMemo(() => <>{props?.icon && props?.icon !== "" && dynamic(() => import(`/src/app/assets/icons/${props?.icon}.svg`))}</>, [props?.icon]);

    return (
        <Style title={title} $color={color} $scale={scale}>
            {/* <Icons /> */}
        </Style>
    );
}
