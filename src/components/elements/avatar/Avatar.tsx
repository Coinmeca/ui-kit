"use client";
import { useMemo } from "react";
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
    stroke?: number;
    align?: "left" | "right";
    fill?: string | boolean;
    style?: object;
    ellipsis?: string;
}

export default function Avatar(props: Avatar) {
    const name = props?.name;
    const scale = props?.scale || 1;
    const size = props?.size || 3;
    const color = props?.color || "white";
    const character = props?.character || 1;
    const display = props?.display;
    const hideName = props?.hideName || false;
    const fill = props?.fill || false;
    const align = props?.align || "left";
    const ellipsis = props?.ellipsis || "...";

    const avatar = () => {
        return (
            (name || (props?.img && props?.img !== "")) && (
                <div>
                    {props?.img && props?.img !== "" ? (
                        <Image src={props?.img} fill sizes="100%" alt={""} title={props?.title} />
                    ) : (
                        ((typeof character === "string" && character !== "") || (name && name !== "")) && (
                            <span>
                                <span>
                                    {typeof character === "number"
                                        ? name?.startsWith("0x")
                                            ? name?.substring(2, 2 + character)
                                            : name?.substring(0, character)
                                        : character}
                                </span>
                            </span>
                        )
                    )}
                </div>
            )
        );
    };

    return (
        <>
            {((props?.img && props?.img !== "") || (props?.name && props?.name !== "")) && (
                <Style $color={color} $scale={scale} $size={size} $fill={fill} $stroke={props?.stroke} style={props?.style}>
                    {align === "left" && avatar()}
                    {!hideName && name && name !== "" && (
                        <span>
                            {display && display < name?.length
                                ? `${
                                      (name?.startsWith("0x") ? name?.substring(0, 2 + display) : name?.substring(0, display)) +
                                      ellipsis +
                                      name?.substring(name?.length - display)
                                  }`
                                : name}
                        </span>
                    )}
                    {align === "right" && avatar()}
                </Style>
            )}
        </>
    );
}
