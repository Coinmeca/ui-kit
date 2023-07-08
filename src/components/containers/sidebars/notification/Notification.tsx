"use client";
import useToast from "app/hooks/useToast";
import { Layouts } from "components";
import Notify from "./Notify";
import Style from "./Notification.styled";
import { useEffect, useState } from "react";

export default function Notification() {
    const { notis } = useToast();
    const [notifications, setNotications] = useState(notis);

    useEffect(() => {
        setNotications(notis);
        console.log(notis);
    }, [notis]);

    useEffect(() => {
        setNotications(notis);
        console.log(notifications);
    }, [notifications]);

    return (
        <Style>
            <Layouts.Contents.InnerContent>{notifications && notifications?.length > 0 && notifications?.map((v: any, k: number) => <Notify key={k} {...v} />)}</Layouts.Contents.InnerContent>
        </Style>
    );
}
