import dynamic from "next/dynamic";
import React from "react";

interface Props {
    icon: string;
    color?: string;
    scale?: number;
    alt?: string;
}

export default function Icon(props: Props) {
    const icon = props.icon || "";
    const scale = props.scale || 1;
    const color = props.color || "white";
    const size = 24;

    const Icons = dynamic(() => import(`./svgs/${icon}.svg`));

    return (
        <i className={`icon-${icon}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: `${size * scale}px`, height: `${size * scale}px`, fontSize: `${size}px`, fill: `${color}` }}>
            <Icons />
            {/* <style jsx>
                {`
                    [class^="icon-"]:before,
                    [class*=" icon-"]:before {
                        fill: white;
                    }
                `}
            </style> */}
        </i>
    );
}
