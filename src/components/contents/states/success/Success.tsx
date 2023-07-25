"use client";
import State from "components/contents/states/State";
import type { State as Props } from "components/contents/states/State";

export default function Success(props: Props) {
    const img = props?.img?.src || require("/src/assets/animation/success.gif");

    return <State {...props} img={{ src: img }} />;
}
