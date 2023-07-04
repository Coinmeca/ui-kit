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

    const Items = ({menu}:{menu:any}) => {
        return (
            (typeof menu !== "string" && menu?.length) > 0 ? (
                <Row $scale={scale} $fix={menu?.fix}>
                    {menu?.map((item: any) => item?.children ? <Items key={item?.id} menu={item?.children} /> : <Items key={item?.id} menu={item} />)}
                </Row>
            ) : (
                menu
            )
        );
    };

    const Menus = ({ menu, index }: { menu: any; index:number }) => {
        return (
            <>
                {index !== 0 && <Layouts.Divider />}
                <Items menu={menu} />
            </>
        );
    };

    return (
        <Style $scale={scale}>
            {typeof props?.menu !== "string" && props?.menu?.length > 0 ? 
                (
                    props?.menu?.map((menu: any) => menu?.children ? <Menus key={menu?.id} index={menu?.id} menu={menu?.children} /> : <Menus key={menu?.id} index={menu?.id} menu={menu} />)
                ) : (
                    <Row $scale={scale}>{props?.menu}</Row>
                )
            }
        </Style>
    );
}
