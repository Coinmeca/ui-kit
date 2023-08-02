"use client";
import State from "components/contents/states/State";
import type { State as Props } from "components/contents/states/State";

export default function Failure(props: Props) {
    const img = props?.img?.src || require("/assets/animation/failure.gif");

    return <State {...props} img={{ src: img }} />;
}
