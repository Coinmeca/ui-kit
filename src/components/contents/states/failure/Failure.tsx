"use client";
import State from "../State";
import type { State as Props } from "../State";

export default function Failure(props: Props) {
    const img =
        // (props?.img?.src && props?.img?.src !== "" ? require(props?.img?.src)?.default?.src : props?.img?.src) ||
        require("/src/assets/icons/animation/icon_failure.gif");

    return <State {...props} img={img} />;
}
