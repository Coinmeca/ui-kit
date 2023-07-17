import Image from "next/image";
import Style from "./Avatar.styled";

export interface Avatar {
    scale?: number;
    size?: number;
    img?: string;
    name?: string;
    hideName?: boolean;
    color?: string;
    display?: number;
    length?: number;
}

export default function Avatar(props: Avatar) {
    const x = props?.name?.substring(0, 1) === "0x";
    const name = x ? props?.name?.substring(3) : props?.name?.substring(2);
    const scale = props?.scale || 1;
    const size = props?.size || 3;
    const color = props?.color || "white";
    const display = props?.display || 6;
    const length = props?.length || props?.name?.length;
    const hideName = props?.hideName || false;

    return (
        <>
            {((props?.img && props?.img !== "") || (props?.name && props?.name !== "")) && (
                <Style $color={color} $scale={scale} $size={size}>
                    {(name || (props?.img && props?.img !== "")) && (
                        <div>
                            {props?.img && props?.img !== "" ? (
                                <Image src={props?.img} fill sizes="100%" alt={""} />
                            ) : (
                                name &&
                                name !== "" && (
                                    <span>
                                        <span>{name?.substring(0, 2)}</span>
                                    </span>
                                )
                            )}
                        </div>
                    )}
                    {!hideName && name && name !== "" && (
                        <span>
                            {x ? "" : "0x"}
                            {name?.length > length! ? `${name?.substring(0, display) + "..." + name?.substring(name?.length - display)}` : name}
                        </span>
                    )}
                </Style>
            )}
        </>
    );
}
