import dynamic from "next/dynamic";
import { memo } from "react";
import Style, { Count } from "./Icon.styled";

export interface Icon {
    icon: string;
    color?: string;
    change?: boolean;
    style?: object;
    scale?: number;
    count?: number;
    title?: string;
}

function Icon(props: Icon) {
    const color = props?.color || "white";
    const scale = props?.scale || 1;
    const title = props?.title || "";
    const count = props?.count && props?.count > 9999 ? 9999 : props?.count;

    const Icons: any = dynamic(() => import(`../../../assets/icons/${(props?.icon !== "" && props?.icon) || "empty"}.svg`));

    return (
        <Style title={title} $scale={scale} $color={color} $change={props?.change} style={props?.style}>
            <Icons />
            {count && count > 0 && <Count $color={color}>{count}</Count>}
        </Style>
    );
}

export default memo(Icon);
