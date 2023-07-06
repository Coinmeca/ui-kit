import Image from "next/image";
import Style from "./Avatar.styled";

interface Avatar{
    scale?: number;
    size?: number;
    img?: string;
    name?: string;
    display?: number;
    length?: number;
}

export default function Avatar(props: Avatar) {
    const x = props?.name?.substring(0, 1) === '0x';
    const name = x ? props?.name?.substring(3) : props?.name?.substring(2);
    const scale = props?.scale || 1;
    const size = props?.size || 3;
    const display = props?.display || 6;
    const length = props?.length || props?.name?.length;

    return (
        <>
            {((props?.img && props?.img !== "") || (props?.name && props?.name !== "")) && (
                <Style $scale={scale} $size={size}>
                    {(name || (props?.img && props?.img !== "")) && (
                        <div>
                            {name && name !== "" && (<span>{name?.substring(0,1)}</span>)}
                            {props?.img && props?.img !== "" && (
                                <Image src={props?.img} fill alt={''} />
                            )}
                        </div>
                    )}
                    {name && name !== "" && (
                        <span>
                            {x ? '' : '0x'}{name?.length > length! ? `${name?.substring(0, display) + '...' + name?.substring(name?.length - display)}` : name}
                        </span>
                    )}
                </Style> 
            )}
        </>
    )
}