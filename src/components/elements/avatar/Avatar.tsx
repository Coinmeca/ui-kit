"use client";
import { type CSSProperties } from "react";
import Image from "next/image";
import Style from "./Avatar.styled";

export interface Avatar {
    scale?: number;
    size?: number;
    img?: string;
    title?: string;
    name?: string;
    hideName?: boolean;
    color?: string;
    character?: number | string;
    display?: number;
    length?: number;
    style?: object;
}

export default function Avatar(props: Avatar) {
    const name = props?.name;
    const scale = props?.scale || 1;
    const size = props?.size || 3;
    const color = props?.color || "white";
    const character = props?.character || 1;
    const display = props?.display || 6;
    const length = props?.length || props?.name?.length;
    const hideName = props?.hideName || false;

    return (
        <>
            {((props?.img && props?.img !== "") || (props?.name && props?.name !== "")) && (
                <Style $color={color} $scale={scale} $size={size} style={props?.style}>
                    {(name || (props?.img && props?.img !== "")) && (
                        <div>
                            {props?.img && props?.img !== "" ? (
                                <Image src={props?.img} fill sizes="100%" alt={""} title={props?.title} />
                            ) : (
                                name &&
                                name !== "" && (
                                    <span>
                                        <span>
                                            {typeof character === "string"
                                                ? character
                                                : name?.startsWith("0x")
                                                ? name?.substring(2, 2 + character)
                                                : name?.substring(0, character)}
                                        </span>
                                    </span>
                                )
                            )}
                        </div>
                    )}
                    {!hideName && name && name !== "" && (
                        <span>{name?.length > length! ? `${(name?.startsWith("0x")
                            ? name?.substring(0, 2 + display)
                            : name?.substring(0, display)) + "..." + name?.substring(name?.length - display)}` : name}</span>
                    )}
                </Style>
            )}
        </>
    );
}
