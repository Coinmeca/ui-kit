"use client";
import State from "components/contents/states/State";
import type { State as Props } from "components/contents/states/State";

export default function Warn(props: Props) {
    const img = props?.img?.src || require("../../../../assets/animation/warn.gif");

    return <State {...props} img={{ src: img }} />;
}
