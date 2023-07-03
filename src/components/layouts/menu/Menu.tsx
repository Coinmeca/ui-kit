import { Layouts } from "components";
import Style, { Row, Col } from "./Menu.styled";

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

    const Items = (menu: any) => {
        return menu ? (
            (typeof menu !== "string" && menu?.length) > 0 ? (
                menu?.map((menu: any, i: number) => (
                    <Row key={i} $scale={scale} $fix={menu?.fix}>
                        {Items(menu)}
                    </Row>
                ))
            ) : (
                <Row $scale={scale} $fix={menu?.fix}>
                    {menu}
                </Row>
            )
        ) : (
            <Row $scale={scale} $fix={menu?.fix}>
                {menu}
            </Row>
        );
    };

    const Menus = ({ menu, index }: { menu: any; index: number }) => {
        return (
            <>
                {index !== 0 && <Layouts.Divider />}
                <Col key={index} $scale={scale}>
                    {Items(menu)}
                </Col>
            </>
        );
    };

    return <Style>{typeof props?.menu !== "string" && props?.menu?.length > 0 ? props?.menu?.map((menu: any, i: number) => <Menus key={i} index={i} menu={menu} />) : <Row $scale={scale}>{props?.menu}</Row>}</Style>;
}
