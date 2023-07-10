"use client";
import { useEffect, useState } from "react";
import useToast from "hooks/useToast";
import { Layouts } from "components";
import Notify from "./Notify";
import Style from "./Notification.styled";

export default function Notification() {
    const { notis, setNotis } = useToast();

    useEffect(() => {
        console.log(notis);
    }, [notis]);

    return (
        <Style>
            <Layouts.Contents.InnerContent>{notis && notis?.length > 0 && notis?.map((v: any, k: number) => <Notify key={k} {...v} />)}</Layouts.Contents.InnerContent>
        </Style>
    );
}
