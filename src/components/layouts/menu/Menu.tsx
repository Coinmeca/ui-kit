import { Layouts } from "components";
import Style, { Row } from "./Menu.styled";
import { Fragment } from "react";

export interface Menu {
    menu?: any;
    scale?: number;
}

export interface MenuItem {
    align?: "left" | "center" | "right";
    menu?: any;
    device?: "desktop" | "laptop" | "tablet" | "mobile";
    direction: "row" | "col";
}

export default function Menu(props: Menu) {
    const scale = props?.scale || 1;

    const Items = (menu:any) => {
        return (
            (typeof menu !== "string" && menu?.length) > 0 ? (
                <Row $scale={scale} style={menu?.style} $fix={menu?.fix}>
                    {menu?.map((item:any, i:number) => (
                        <Fragment key={i}>
                            {Items(item?.children || item)}
                        </Fragment>
                    ))}
                </Row>
            ) : (
                menu
            )
        );
    };

    const Menus = (menu:any, index:number) => {
        return (
            <Fragment key={index}>
                {index !== 0 && <Layouts.Divider />}
                <Row $scale={scale} style={menu?.style}>{Items(menu?.children || menu)}</Row>
            </Fragment>
        );
    };

    return (
        props?.menu && (
            <Style $scale={scale}>
                {typeof props?.menu !== "string" && props?.menu?.length > 0 ?
                    (
                        props?.menu?.map((menu: any, i: number) => (
                            <Fragment key={i}>
                                {Menus(menu?.children || menu, i)}
                            </Fragment>
                        ))
                    ) : (
                        <Row $scale={scale} style={props?.menu?.style}>{props?.menu?.children || props?.menu}</Row>
                    )
                }
            </Style>
        )
    );
}
