"use client";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { Elements, Layouts, Controls } from "components";
import { Sidebars } from "containers";
import { Format } from "lib/utils";
import { NotificationContext } from "contexts/Notification";

export default function Dummy() {
    const [value, setValue] = useState<number>(0);
    const [tab, setTab] = useState<string>("icon");
    const [active, setActive] = useState(false);
    const [mobileMenu, setMobileMenu] = useState("");
    // const [mobileMenu, setMobileMenu] = useState("market");
    const [sidebarTab, setSidebarTab] = useState("exchange");

    const pastNotis = [
        {
            id: 12234231,
            date: "12:06:27 07-11-23",
            title: "Notification",
            message: "This is a Notification",
        },
        // {
        //     id: 12234231,
        //     date: "12:06:27 07-11-23",
        //     title: "Alert",
        //     message: "This is a Notification",
        // },
        // {
        //     id: 12234231,
        //     date: "12:06:27 07-11-23",
        //     title: "Alert",
        //     message: "This is a Notification",
        // },
        // {
        //     id: 12234231,
        //     date: "12:06:27 07-11-23",
        //     title: "Notification",
        //     message: "This is a Notification",
        // },
        // {
        //     id: 12234231,
        //     date: "12:06:27 07-11-23",
        //     title: "Alert",
        //     message: "This is a Notification",
        // },
        // {
        //     id: 12234231,
        //     date: "12:06:27 07-11-23",
        //     title: "Alert",
        //     message: "This is a Notification",
        // },
        // {
        //     id: 12234231,
        //     date: "12:06:27 07-11-23",
        //     title: "Notification",
        //     message: "This is a Notification",
        // },
        // {
        //     id: 12234231,
        //     date: "12:06:27 07-11-23",
        //     title: "Alert",
        //     message: "This is a Notification",
        // },
        // {
        //     id: 12234231,
        //     date: "12:06:27 07-11-23",
        //     title: "Alert",
        //     message: "This is a Notification",
        // },
        // {
        //     id: 12234231,
        //     date: "12:06:27 07-11-23",
        //     title: "Notification",
        //     message: "This is a Notification",
        // },
        // {
        //     id: 12234231,
        //     date: "12:06:27 07-11-23",
        //     title: "Alert",
        //     message: "This is a Notification",
        // },
        // {
        //     id: 12234231,
        //     date: "12:06:27 07-11-23",
        //     title: "Alert",
        //     message: "This is a Notification",
        // },
    ];

    const { notis, toasts, count, addToast, addNotify, setRead, resetCount } = useContext(NotificationContext);
    const sidebarMarketListFormatter = (data: any) => {
        return (
            data?.length > 0 &&
            data?.map((data: any) => ({
                children: [
                    [
                        {
                            style: { width: "max-content" },
                            children: [
                                <>
                                    <Elements.Avatar
                                        // length={8}
                                        size={3}
                                        img={data?.logo}
                                        // name={'0x16e39d21f7f3ab3dafabd12fc07f4fd4928fb47163e79bb879d0928ac34e817e'}
                                    />
                                </>,
                                [
                                    <>
                                        <Elements.Text type="strong" height={1}>
                                            {data?.symbol}
                                        </Elements.Text>
                                    </>,
                                    <>
                                        <Elements.Text type="p" height={1} style={{ opacity: 0.45 }}>
                                            {data?.market}
                                        </Elements.Text>
                                    </>,
                                ],
                            ],
                        },
                    ],
                    [
                        <>
                            <Elements.Text type="strong" height={1}>
                                {data?.price}
                            </Elements.Text>
                        </>,
                        <>
                            <Elements.Text type="strong" height={1}>
                                {data?.price}
                            </Elements.Text>
                        </>,
                    ],
                    [{ align: "right", children: data.volume }],
                ],
                onClick: (props: any) => alert(props.children),
            }))
        );
    };

    const dropdown = [
        {
            value: "BTC",
            img: "data:image/png;base64,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",
        },
        {
            value: "ETH-USDT-LP-v2",
            img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEX3kxr////3jAD3jwD2igD3khX3kQ73kAv3kAD//vz/+/b94sn5r2X+7t/5smz969r3lR/5tXL+9u34o0f7z6f+8eX81bP4qFX6u4D82rv6w4/5rV/7y6D6wYv++PH83sL70av4nz395tH4nDT7ypv3mSj4pUz6unz4nTj2hQD6wY35sGL4plGcxiKrAAAPJElEQVR4nNWd6XqrOAyGwcZAQkK2Zt9Ks7Qzc+7/+saQhc0yxhJNzvdvzjNNeGNk2bIkO27X6h1Gx8V5/z24JqfL2HGc8eWULOPVfreOhv3Ov951uvzw4focJ4IxxnkY+EI4DwnhB5xz5rFxMjkf510+RFeE8/VqlqIFBS6VhAi4/N/+7NddYXZBOP+Mx/KpfS1aWb7EvEwW0w6ehpqwF60unhy5FnTP4QyYd1pFPeInIiXsrwechTZ0T0rO+GBNOv8QEh5jzgIE3UMBY4Mj3WNREY5WIQneA5J/j4iejIZwMWOcDO8mzpIFybMREE43nLWZN03lM7YncCFowuGEfPhycRajX1Yk4Wjr0VmfSoG3/Hoh4XBLOLtA8tkSNY4Iwmnc8fg9Gb0Bwh6tCfv7Xxi/hwL2bb0KsCVchN3NLypxvvtVwtEPw6zNrMROdlOOFeHK68L/NUmwic2q3IIwEr/7gubiocV6tT3h5Pdf0KcEi1sPY1vCr/GrBvAm7kfdEm5eOIA3CW/fIeFhxl7Ml4olrYIdbQij8Pd8vE4+bzPhtCA8e69+Qx8S3qYLwsE7vKEPsa3xnGpKeEheO4dWxU8HWsJR+IpVjE5+aLinMiOMXu4k6hLMzDMaES7eZo4pyfukIvzwXs0CyDPZURkQnt8VUCIaeI1mws07eYmqWDNiI+FbA5ogNhG+OaBEPOMId+9rgw95HxjCz/cHlIj68w0tYfQ3AEpErevXEY6IbdBnvJuVA9Mt4DSEB9Rpbl3+Ndr/tDzfN5MINctwmLD3Q/woPJ3YD8f9zCMfSz+xIdxSb5eeK+V+tE+IGfmgPSG9I+TFo4f+iRYRdosQ4ZF8GvWvxc/v528IDSo4oQKEU/pZj5fWV9HzFRE/HsXsA842AGFCP+Gx0sHK/jGG4iLtcjPjaMpg1oZw38Fq1CvFjmYPHr7K/ltSJgw3xwKLcCVhF2uZihk+v4Gt83+MNj8oROXxm4qw15BPaCXIDL1SAHuAeVXF2JQw7iJwWI4bbZ5m+FP6atw3828zQnpHkX176SC+aoZ3YVfCqvBbnbBHvBy9yS/NdLk3LJih1A759ghhQviN+BYBZpZCZshKZrjFOqnyK6Em/EK8KOK0noQeU1FCZngpfXlo/913ebWNVI0Qs17MfsH5YnJhNUpW8oaJKP7FUwQb0vouo0r4gfmSp1FJSr9EaeANXbwZZp9YjWlUCPuo7/CKS8N0LD3u3yh/yQylhF/JnqoQrjCE4lT5+STl1k8rEgy9Id4MpXjlnL9MOEcZQlifyKSGn/HF89TeMCy5aKK4UPm9qBAOUAf1ZaMqalo6eO/KG94VTGDCEW41wwxzJKBFKYUZZp86BAmXqK+o+DZYK+8+y1aWyiRmKBVsIULkEKrNUKH54vuS7esrZki2Hi65/SLhFpcuA5uhQmlUkf/ThRk6lUEsEA6Rv6GpGT7VP5ZCK1RmKOUVsqYLhDFuCCu+rbV6Pt2epjid5oRTpDcSsy9URRbpKUnhfcoJN1gzEIwlq7V1CSFpUllhlZgTUti5SAslLUsIp7sfwuobXidcUL0kkjJcmaZklTVaMarUpHyL8SScUcaAOW+byXtX7/NCw5hHTR6EQ9oYsCivnNroeCJhfD7AgxC1bVKovOVtzYh/gGf04EFIHmBr7f+L+uD4NWpYJjySH1QYZg4C6sfoB2LHEiFyPaP6gjarVIXW2LrUIC4S9ujj+AyYaozr7KYn5EPdo+zO/QejwcqlPiWRLu+fcfxpmN27xCHe36IbIf1LGgCpAzueNsIItzsTSlyyxP01zQh7VLvrXBzI372HEXxJOTk2ru5wo8h7T0JMJB8QYIbFLVIgIRtKCnsX1Ilp9CTc0080ofqRK5GKgF30udqopdbN6WeExLktTj5VV1WLVAg21jKeUQdFD8Ip/ZEoZIaKSIVgiW4NO0b8+lkwIyUk2zjlgryh0hx8phlGzMPxxZ3wm9xXCCBNB4pUaGoKMWkTWbgmfRTUhKX+aNAbAn+gSUhH7HqyZYeDD0EpxIHcazhgCOf5RojHY/OMkH5fAXpD+I2DVnnyjxDzYLpwcwiCbHX56ofVxe3hvQhiNk3PEh3seYxKrc3QqR6nFIXIk0ojDQ5NGLGs9maoe00xUz1LCef0/h7yhlqD96B1OCaEJJ/E6WCiERZmqCNE7HzYURLSHWo9ZGOGcq0OEU4Qbyk/S0L6FY2NGToiAQBRM6HcATi0we5MQAmLfv0VqjInM2GyXeXv5qAW7+pPVSQIptIfn4HRxz5mJhROz8FlQakEmeGH7ptgZ4ELQLCDg0sSUomf1XOG1gw9sNUFbib0hg5mYasWVEmmC/Ey0AqRSy4WOfShUq5+0v7mCpUbCDZR/43UAZn6vXbI3SFkhm5W0nVKy/PKmIKFmj3+J24E+M4h31lA3vAxJtF5cPFu7aGDIO0Hnex0cVNUBUa6u3BW1A5fW9D5GMzRcffvdxxP9uej/hQOW9wSrJyY2OFD3tBS2AIsP3aod4fwPs9GqKTsVGLpzIiXNA1m2E54Zy1mDtKSazIxQ1P18CtKcXIuFFgFMULAhGAWvDhj/IcURWiG0wvFNE9OSGeGC5rWVGNqQiozHC2JVpPUhHI/pnzgXqtkvt5xSdYhlZrQB8xw5y3PkWE633AZEnZAvxDPpWCIJkhvsDit1iaUoyvhfufinOg+zIHN8BZrSdNPk71BstSCbBDFD/GaBtgbFiKlKWXceIMFWR9RuaZZUhJCZlgJ0aRZGE0juaJB9Je0ewvIDOv1VAG7fOjnV0yOQi65tyDdH0JmqIrLy609ELK6i6QLl9wfUubStIyUCh5om1hRvKh8QxqnMTTDXIJddVt8gnA83zlrQkKo972mrDHQ5bwTxHLZmjReWi8Vv0nXZEfo2q3hw2QscrD1XEUByWwNXwGHu5GF16nY3DnQjWFrM7zLg/OG0fMg7zs9oj5NjpUZZvKB7kAuvtxLjF0n72+AFuQNG8dBk9ePjNTIH88hzIC2M0NHG/pAPl3wLQnPVO7C1gzTPwUXN0h3LQ0HlYvhlxp0MeNFaU0MnGuQR2NZLoZ9onEwGG2uzyaI/hgYCANTUvewSoVMQZfTtNOQx9P4XP3jPuGMczYGxsHkF4QJkZMpz7K+rparv7y0+RDtNmvIlD4NLAn2iLgx9JcZoa1XrXWCUcvADIUAZxrcojItB3asjRnK7arKIGcLmoVdbA56Wr/mWK/gudktGkZmCL8NOF+WFkGmed526wbDEkoDMxQB/Ocoj5/1IkkJrVLjoJqRqky8ocagUcUuz1x9k9mu/liGBxRc2dys9Elwqol7QO3t2KPewiaHVrMfKGu6/h6rW7g9HkP3MuCWNFmDn6z0w6LgolUR7K2Fm6oFq+BQ/dBNmNzSQt2TRZ6xqasoUK731+yW9ccd69md4/5GH/1G9Rm9df3KCNu7Vcv7FufHj9Uyufic83CcxLumGw1x/r5Qf9i+0DlENWrpSxkdKKJe0ntetWUd8OWMa0Zjpj5qCIt1wBZTltxOzDZf1De9V4Tb/pZqua2idumZ53UTdTiWuCDNrdAZ21PBz8ayI0pcyle5pwKqrOQ2lvRvLLLdb6UvBrbfXUr550xLiWn369R6m1D0p/G55y9RHU1K+sIdN9T60xD1GPKQHU1y9ZEdc1i1xxBR6Yxn1wJLoSsuFFzvE0VTsl7pQoswS+wNKYpeXySFluXWzl/e9sOyIRb6ChhFvzaScuBqT1k5+Ywni9aX2+OvBFX23KMoWi/HbrIUchEwJpruRitrjb+yRNk3EbmQT1U2w97zOaETDaWGS3wDxWIQqUCILwiumuHj36G6YIW+thR5l8V+eIQ9aOHWzuWDxf8266F6lv3aXDyK08xgWfhQwj7C1dbOz0qOcuBx7nHmeeHy+7yIRtNDuhs+HIbRYgUWfrV/DqiPMHYQK97w+XuVg013x+uHcimb1j+FYcg9Lw3g4LBy+cUhLBMiM0+gDutlM8RPaE0qp/WUG8ngTs0BM6wUwJLXHVdVKQ8sE+J8InDRQcUMO7/YtHJkXmkGhMnQKfdkz72h0gy7U/Uilur9FoiW01CH9V82Q66/3wLzE0PesJz73bUZ1tZPtZZV9jdXAhcdVL0hEQmg+i0iNUJrt1/57HwIf9UM61kd9bZjthGbALj2x/tNM1TcS6ZorGZ73nOJP3MYyBvSd04rSihawCgIrQ98As6cB2VuhiX/27E3VCXjqprjIQKVIuCeSClf4g256jhZ2f4PN6OnJ5/5m/6L3lCdeKQkpOzYWt4bduoN1X371C0c6S4DFtfiKrFTb8jU7SWBJpUzsrdJsPHgGVPs0gyhm6sBQspbx1O75DfKDs1QcCBHC7rTmfo6WTnHOtsFfTvfp8CqDfBebpriuKLkWHYHCDdAhe9WH3Rxo2xX4nD+JkzYxc3VXck/wYdAGkLK2aZbgbeONxDK/cFfgqjNk9QRdnI/dweCexA3ErqLvwHR0zeu1xO6H++P6DUcbDUQduAWicWaziabCAkX4Z1I0+rclPC9EZsBDQjdzfvaomdwfG5ASNPcoAs1TTLGhO7nWyJq69xbErrRG65uhOGtYGaE7oim8Rah/NAw/cGQ0D1gb9AiFk9MM+hMCd3e9p28BoPbwFoTpl7jXYxRmHgJC0L3SJcugVIQtsnTbUPoTpN3eFPZrFUSaytC192//E0VBgs1DKEbidfOqXzcVCuFJXR78Qu9v2DfrfOOWxPKCSd81TByYVEKYEHo9r5fMoy+t2p+NhpC1/2iuLG3nQT7sWuNakeYtmT53VeV+/p4Ez2h21+xzpMMnwrY3rp4zJrQdecDskaxDXxejLggGkGYNvv9BcbA21rfYo4mzBi7fVclH7L3MpLQdYcx627O4WyCGj8SQrke3zPCzsa5fMY3mAva6QilFjPygeQsMevw0yQaQmmQq5DQewQsXKFfz7uoCKWOMSeBDBgbwM0iW4uQUK4C1hISlY4g0sSUxk7RrURKKNWL9idtsxYNXcC9yyqirgmnJkw1BZu1gEprwcfxZ+tKRQN1QZhqvt7/kU/Ng4bk/6yHC2PX1boLulRdEWaaH8+TZMzSoqYUVRS4/CBM73piThKfj1TTplKdEt7UH0br3b+reJmcLuPx2BlfTsmfwWq/W0TDQ8e9Q6T+B04AzGH5rtV5AAAAAElFTkSuQmCC",
        },
        {
            value: "BTC",
            img: "data:image/png;base64,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",
        },
    ];

    const tabs = [
        {
            name: "icon",
            active: tab === "icon",
            children: (
                <>
                    <Layouts.Row>
                        <Elements.Icon scale={0.5} icon={"swap"} title={"swap"} />
                        <Elements.Icon scale={1} icon={"account"} />
                        <Elements.Icon color={"#6080FF"} scale={2} icon={"bank"} />
                        <Elements.Icon color={"yellow"} scale={3} icon={"chevron-left"} />
                        <Elements.Icon color={"red"} scale={4} icon={"chart-area"} />
                        <Elements.Icon icon={""} />
                    </Layouts.Row>
                </>
            ),
        },
        {
            name: "button",
            active: tab === "button",
            children: (
                <Layouts.Col>
                    <Layouts.Row>
                        <Controls.Tab
                            onClick={
                                // () => setNotis(notilist)
                                // () => alert(1)
                                () =>
                                    addToast({
                                        title: "Notification",
                                        message: (
                                            <>
                                                <Elements.Text type={"p"}>Your Transaction had been submitted.</Elements.Text>
                                                <Elements.Text
                                                    type={"link"}
                                                    opacity={0.45}
                                                    href={"https://etherscan.io/tx/0x13306976466266cd92e938e95451e68e6ba5ac9af2c3832d63037efe72836ba1"}
                                                >
                                                    View Transaction on the scanner <Elements.Icon icon={"external-link"} />
                                                </Elements.Text>
                                            </>
                                        ),
                                        remain: true,
                                    })
                            }
                        >
                            Add Toast
                        </Controls.Tab>
                        <Controls.Tab iconLeft="sort-up-bold" active={active} onClick={() => setActive(!active)}>
                            Tab
                        </Controls.Tab>
                        <Controls.Tab>Tab</Controls.Tab>
                        <Controls.Tab>Tab</Controls.Tab>
                    </Layouts.Row>
                    <Layouts.Row>
                        <Controls.Button iconLeft="bank">Button</Controls.Button>
                        <Controls.Button color="blue" icon="money" fit />
                        <Controls.Button color="orange" iconLeft="swap" title="Let's swap">
                            Button
                        </Controls.Button>
                        <Controls.Button color="green" iconLeft="swap" iconRight="identity" onClick={() => alert("1")}>
                            Button
                        </Controls.Button>
                    </Layouts.Row>
                    <Controls.Button type="glass" color="black">
                        Button
                    </Controls.Button>
                    <Controls.Button type="line" color="red" iconLeft="money">
                        Make money
                    </Controls.Button>
                    <Controls.Button type="line" iconLeft="swap" disabled>
                        Button
                    </Controls.Button>
                    <Controls.Button type="glass" iconRight="swap" fit>
                        Button
                    </Controls.Button>
                    <Controls.Button type="solid" icon="swap" fit />
                </Layouts.Col>
            ),
        },
        {
            name: "dropdown",
            active: tab === "dropdown",
            children: (
                <Layouts.Col>
                    <Controls.Dropdown options={dropdown} />
                    <Controls.Dropdown options={dropdown} fit />
                </Layouts.Col>
            ),
        },
        {
            name: "input",
            active: tab === "input",
            children: (
                <Layouts.Col>
                    <Controls.Input />
                    <Controls.Input left={{ children: <Elements.Icon icon={"user"} /> }} />
                    <Controls.Input clearable />
                    <Controls.Input
                        clearable
                        right={{
                            children: <Controls.Dropdown options={dropdown} />,
                        }}
                    />
                    <Controls.Input
                        type={"currency"}
                        align={"right"}
                        clearable
                        right={{
                            children: <Controls.Dropdown options={dropdown} />,
                        }}
                    />

                    <Controls.Input
                        clearable
                        left={{
                            children: <Controls.Button>Button</Controls.Button>,
                        }}
                    />
                    <Controls.Input
                        clearable
                        right={{
                            children: (
                                <Controls.Button type={"solid"} iconRight={"send"}>
                                    Send
                                </Controls.Button>
                            ),
                        }}
                    />
                    <Controls.Input
                        clearable
                        right={{
                            children: <Controls.Button>Button</Controls.Button>,
                        }}
                    />

                    <Controls.Input type={"currency"} error={true} unit={"%"} />
                    <Controls.Input type={"currency"} value={value} onChange={(v: any) => setValue(parseFloat(v))} unit={"%"} />
                    <Elements.Text type={"h6"}>Test</Elements.Text>
                    <Controls.Input />
                    <Controls.Input placeholder={"number"} type={"number"} />
                    <Controls.Input placeholder={"currency"} type={"currency"} />
                </Layouts.Col>
            ),
        },
        {
            name: "range",
            active: tab === "range",
            children: (
                <Layouts.Col>
                    <Layouts.Divider />
                    <Controls.Range color={"green"} value={value} onChange={(v: any) => setValue(v)} />
                    <Controls.Range color={"orange"} step={10} value={value} zero onChange={(v: any) => setValue(v)} />
                    <Controls.Range color={"red"} snap step={11} value={value} zero onChange={(v: any) => setValue(v)} />
                    <Controls.Range color={"black"} snap step={11} min={-100} max={100} value={value} zero onChange={(v: any) => setValue(v)} />
                    <Controls.Range color={"white"} snap step={11} min={-50} max={150} unit={"USD"} value={value} zero onChange={(v: any) => setValue(v)} />
                    <Controls.Range color={"purple"} snap step={11} min={-150} max={50} unit={"USD"} value={value} zero onChange={(v: any) => setValue(v)} />
                    <Controls.Range color={"blue"} step={11} min={-150} max={50} unit={"USD"} value={value} zero onChange={(v: any) => setValue(v)} />
                </Layouts.Col>
            ),
        },
    ];

    const slides = [
        {
            filter: `rgba(var(--black-abs),var(--o045))`,
            background: {
                img: {
                    src: 4,
                },
            },
            children: (
                <Layouts.Col align={"center"}>
                    <Layouts.Col>
                        <Elements.Text type={"h2"} align={"center"}>
                            Much Faster and Much Easier Coin Exchange
                        </Elements.Text>
                        <Elements.Text size={2} weight={"normal"} responsive={{ device: "mobile", size: 4 }} align={"center"}>
                            Start with your new experience coin trading system on Coinmeca.
                        </Elements.Text>
                    </Layouts.Col>
                    <Controls.Button type="glass" style={{ padding: "1em 2em" }} color="white" fit>
                        Get Started with Sign up
                    </Controls.Button>
                </Layouts.Col>
            ),
        },
        {
            filter: `rgba(var(--black-abs),var(--o045))`,
            background: {
                video: {
                    src: "https://firebasestorage.googleapis.com/v0/b/coinmeca-3e733.appspot.com/o/cm_bg.mp4?alt=media&token=fca0814a-8000-4af7-b4ca-f372e686bff7",
                    poster: "",
                    controls: false,
                    muted: true,
                    autoPlay: true,
                    preload: "auto",
                    loop: true,
                },
            },
            children: (
                <Layouts.Col align={"center"}>
                    <Layouts.Col>
                        <Elements.Text type={"h2"} align={"center"}>
                            Meet Brand New Finance
                        </Elements.Text>
                        <Elements.Text size={2} weight={"normal"} align={"center"}>
                            Start your crypto financial life on Coinmeca. Receive it, Pay it, Trade it.
                        </Elements.Text>
                    </Layouts.Col>
                    <Controls.Button type="glass" style={{ padding: "1em 2em" }} color="white" fit>
                        Get Started with Sign up
                    </Controls.Button>
                </Layouts.Col>
            ),
        },
        {
            background: {
                filter: `rgba(var(--black-abs),var(--o045))`,
                img: {
                    src: 4,
                },
            },
            children: (
                <Layouts.Col align={"center"}>
                    <Layouts.Col>
                        <Elements.Text type={"h2"} align={"center"}>
                            Make Profits While Spending Money
                        </Elements.Text>
                        <Elements.Text size={2} weight={"normal"} align={"center"}>
                            Lets get earned Coinmeca Token free according your service usage. And just sell it market.
                        </Elements.Text>
                    </Layouts.Col>
                    <Controls.Button type="glass" style={{ padding: "1em 2em" }} color="white" fit>
                        Get Started with Sign up
                    </Controls.Button>
                </Layouts.Col>
            ),
        },
    ];

    const slides2 = [
        {
            filter: `rgba(var(--black-abs),var(--o045))`,
            background: {
                img: {
                    src: 4,
                },
            },
            children: (
                <Layouts.Col align={"left"}>
                    <Layouts.Col>
                        <Elements.Text type={"h4"}>Much Faster and Much Easier Coin Exchange</Elements.Text>
                        <Elements.Text weight={"normal"} responsive={{ device: "mobile", size: 4 }}>
                            Start with your new experience coin trading system on Coinmeca.
                        </Elements.Text>
                    </Layouts.Col>
                </Layouts.Col>
            ),
        },
        {
            filter: `rgba(var(--black-abs),var(--o045))`,
            background: {
                video: {
                    src: "https://firebasestorage.googleapis.com/v0/b/coinmeca-3e733.appspot.com/o/cm_bg.mp4?alt=media&token=fca0814a-8000-4af7-b4ca-f372e686bff7",
                    poster: "",
                    controls: false,
                    muted: true,
                    autoPlay: true,
                    preload: "auto",
                    loop: true,
                },
            },
            children: (
                <Layouts.Col align={"left"}>
                    <Layouts.Col>
                        <Elements.Text type={"h4"}>Meet Brand New Finance</Elements.Text>
                        <Elements.Text weight={"normal"}>Start your crypto financial life on Coinmeca. Receive it, Pay it, Trade it.</Elements.Text>
                    </Layouts.Col>
                </Layouts.Col>
            ),
        },
        {
            background: {
                filter: `rgba(var(--black-abs),var(--o045))`,
                img: {
                    src: 4,
                },
            },
            children: (
                <Layouts.Col align={"left"}>
                    <Layouts.Col align={"left"}>
                        <Elements.Text type={"h4"}>Make Profits While Spending Money</Elements.Text>
                        <Elements.Text weight={"normal"}>
                            Lets get earned Coinmeca Token free according your service usage. And just sell it market.
                        </Elements.Text>
                    </Layouts.Col>
                </Layouts.Col>
            ),
        },
    ];

    const menu = [
        {
            children: [
                {
                    children: [
                        <>
                            <Controls.Tab iconLeft={"plus"} fit disabled>
                                Add Chart
                            </Controls.Tab>
                        </>,
                        <>
                            <Controls.Tab fit>Market Order</Controls.Tab>
                        </>,
                    ],
                },
                {
                    children: [
                        <>
                            <Controls.Tab fit>Order History</Controls.Tab>
                        </>,
                    ],
                },
            ],
        },
        // [
        //     {
        //         style: {overflow: 'initial'},
        //         align: 'right',
        //         children:[
        //             <Controls.Dropdown options={list} />,
        //             <Controls.Dropdown options={list} />
        //         ]
        //     },
        //     [
        //         <Controls.Tab fit>View more</Controls.Tab>
        //     ]
        // ]
    ];

    const markets = [
        {
            value: "All Markets",
        },
        {
            value: "USDT",
            img: require("assets/coins/eth.png"),
        },
        {
            value: "ETH",
            img: require("assets/coins/eth.png"),
        },
        {
            value: "USDC",
            img: require("assets/coins/eth.png"),
        },
    ];

    const marketlist = [
        {
            logo: require("assets/coins/btc.png"),
            symbol: "BTC",
            market: "BTC/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
        {
            logo: require("assets/coins/eth.png"),
            symbol: "ETH",
            market: "ETH/USDT",
            price: "4,678.05",
            change: "23.12",
            volume: "73170731",
        },
    ];

    const path = usePathname();

    const colorMap: any = {
        "/examples": "sky",
        "/examples/tab": "red",
        "/examples/slide": "orange",
        "/examples/list-and-table": "blue",
        "/examples/grid": "purple",
    };

    const header = {
        color: colorMap[path],
        logo: {
            src: "/assets/coinmeca.svg",
            width: 128,
            height: 48,
        },
        menu: {
            active: mobileMenu === "menu",
            children: [
                {
                    name: "Tab",
                    path: "/examples/tab",
                    onClick: () => setMobileMenu(""),
                },
                {
                    name: "Slide",
                    path: "/examples/slide",
                    onClick: () => setMobileMenu(""),
                },
                {
                    name: "List & Table",
                    path: "/examples/list-and-table",
                    onClick: () => setMobileMenu(""),
                },
                {
                    name: "Grid",
                    path: "/examples/grid",
                    onClick: () => setMobileMenu(""),
                },
            ],
        },
        option: {
            active: true,
            children: (
                <>
                    <Controls.Tab
                        onClick={() => {
                            if (mobileMenu === "notify") {
                                setMobileMenu("");
                                resetCount();
                            } else {
                                setMobileMenu("notify");
                                // setRead(true);
                            }
                        }}
                        active={mobileMenu === "notify"}
                        iconLeft={{ icon: "bell", count: mobileMenu === "notify" ? 0 : count }}
                        toggle
                        fit
                    />
                    <Controls.Tab
                        onClick={() => (mobileMenu === "market" ? setMobileMenu("") : setMobileMenu("market"))}
                        active={mobileMenu === "market"}
                        iconLeft={"sidebar"}
                        toggle
                        fit
                        onBlur={() => setMobileMenu("")}
                    />
                    <Controls.Tab
                        onClick={() => (mobileMenu === "setting" ? setMobileMenu("") : setMobileMenu("setting"))}
                        active={mobileMenu === "setting"}
                        iconLeft={"gear"}
                        toggle
                        fit
                    />
                </>
            ),
        },
        side: {
            active: mobileMenu === "setting",
            children: (
                <>
                    <Layouts.Row fit>
                        <Controls.Dropdown
                            options={[
                                {
                                    key: 1,
                                    value: "English",
                                },
                                {
                                    key: 2,
                                    value: "Korean",
                                },
                                {
                                    key: 3,
                                    value: "Spanish",
                                },
                                {
                                    key: 4,
                                    value: "Japanese",
                                },
                            ]}
                            fit
                        />
                        <Controls.Dropdown
                            options={[
                                {
                                    key: 1,
                                    value: "English",
                                },
                                {
                                    key: 2,
                                    value: "Korean",
                                },
                                {
                                    key: 3,
                                    value: "Spanish",
                                },
                                {
                                    key: 4,
                                    value: "Japanese",
                                },
                            ]}
                            fit
                        />
                    </Layouts.Row>
                    {/* <Controls.Button fit>Connect</Controls.Button> */}
                    <Controls.Button iconRight={"chevron-down-bold"} fit>
                        <Elements.Avatar length={8} size={3} display={4} name={"0x16e39d21f7f3ab3dafabd12fc07f4fd4928fb47163e79bb879d0928ac34e817e"} />
                    </Controls.Button>
                </>
            ),
        },
    };

    const sidebars = {
        active: true,
        lower: {
            active: mobileMenu === "market",
            children: [
                {
                    active: true,
                    children: (
                        <>
                            <Layouts.Row fit style={{ padding: "0.5em 1em" }} gap={0}>
                                <Controls.Tab active={sidebarTab === "exchange"} onClick={() => setSidebarTab("exchange")}>
                                    Exchange
                                </Controls.Tab>
                                <Controls.Tab active={sidebarTab === "alert"} onClick={() => setSidebarTab("alert")}>
                                    Alert
                                </Controls.Tab>
                                <Controls.Tab active={sidebarTab === "asset"} onClick={() => setSidebarTab("asset")}>
                                    Assets
                                </Controls.Tab>
                            </Layouts.Row>
                            <Controls.Input
                                left={{
                                    children: <Elements.Icon icon={"search"} />,
                                }}
                                right={{
                                    children: <Controls.Dropdown options={markets} />,
                                }}
                            />
                            <Layouts.Contents.InnerContent>
                                <Layouts.Contents.SlideContainer
                                    contents={[
                                        {
                                            active: sidebarTab === "exchange",
                                            children: <Sidebars.Market list={marketlist} />,
                                        },
                                        {
                                            active: sidebarTab === "alert",
                                            children: <Sidebars.Market list={marketlist} />,
                                        },
                                        {
                                            active: sidebarTab === "asset",
                                            children: <Sidebars.Market list={marketlist} />,
                                        },
                                    ]}
                                />
                            </Layouts.Contents.InnerContent>
                        </>
                    ),
                },
            ],
        },
        upper: {
            active: mobileMenu === "notify" /* || menuMobile === 'something' || menuMobile === 'else' */,
            children: [
                {
                    active: mobileMenu === "notify",
                    children: <Sidebars.Notification list={notis} count={count} onBlur={resetCount} />,
                },
            ],
        },
    };

    const toast = {
        active: toasts.length > 0 && mobileMenu !== "notify",
        list: toasts,
    };

    return {
        value,
        setValue,
        tab,
        setTab,
        active,
        setActive,
        dropdown,
        tabs,
        slides,
        slides2,
        menu,
        markets,
        marketlist,
        notis,
        toasts,
        header,
        sidebars,
        toast,
    };
}
