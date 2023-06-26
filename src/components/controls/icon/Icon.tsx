import dynamic from "next/dynamic";
import { Style } from "./Icon.styled";

interface Props {
    icon: string;
    color?: string;
    scale?: number;
    title?: string;
}

export default function Icon(props: Props) {
    const icon = props?.icon || "";
    const color = props?.color || "white";
    const scale = props?.scale || 1;
    const title = props?.title || "";

    const Icons = dynamic(() => import(`./svgs/${icon}.svg`));

    return (
        <Style title={title} $color={color} $scale={scale}>
            <Icons />
        </Style>
    );
}
