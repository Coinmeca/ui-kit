"use client";
import State from "components/contents/states/State";
import type { State as Props } from "components/contents/states/State";
import image from "../../../../assets/animation/success.gif";

export default function Success(props: Props) {
    const img = props?.img?.src || image;

    return <State {...props} img={{ src: img }} />;
}
