"use client";
import State from "components/contents/states/State";
import type { State as Props } from "components/contents/states/State";
import image from "../../../../assets/animation/loading.gif";

export default function Loading(props: Props) {
    const img = props?.img?.src || image;

    return <State {...props} img={{ src: img }} />;
}
