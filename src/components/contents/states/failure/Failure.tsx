"use client";
import State from "components/contents/states/State";
import type { State as Props } from "components/contents/states/State";

export default function Failure(props: Props) {
    const img = props?.img?.src || require("/src/assets/icons/animation/icon_failure.gif");

    return <State {...props} img={{ src: img }} />;
}
