import { Layouts } from "components";
import Style, { Row } from "./Menu.styled";

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
                    {menu?.map((item: any, i: any) => item?.children ? <Items key={i} menu={item?.children} /> : <Items key={i} menu={item} />)}
                </Row>
            ) : (
                menu
            )
        );
    };

    const Menus = (menu:any, index:number) => {
        return (
            <>
                {index !== 0 && <Layouts.Divider />}
                <Row $scale={scale}>{Items(menu)}</Row>
            </>
        );
    };

    return (
        props?.menu && (
            <Style $scale={scale}>
                {typeof props?.menu !== "string" && props?.menu?.length > 0 ?
                    (
                        <>
                            {props?.menu?.map((menu: any, i: number) => Menus(menu?.children || menu, i))}
                        </>
                    ) : (
                        <Row $scale={scale}>{props?.menu}</Row>
                    )
                }
        </Style>
        )
    );
}