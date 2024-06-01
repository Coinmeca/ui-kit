import Image from "next/image";
import { Elements, Layouts } from "components";
import { type Row } from "components/layouts/row/Row";
import { type Col } from "components/layouts/col/Col";
import { Style, Logo } from "./Footer.styled";

export interface Footer {
    logo?: Logo;
}

export interface Logo extends Row {
    src?: string | any;
    href?: string;
    width?: number;
    height?: number;
    title?: string;
    alt?: string;
    content?: string | number | ({ width?: number; children?: any } & Col) | any;
}

export interface Menu {
    href: string;
    name?: string;
    type?: any;
    weight?: number | string;
    opacity?: number;
    style?: any;
}

export type Menus = { children?: Menu[]; gap?: number; style?: any } | Menu[];
export type Category =
    | ({
          width?: number;
          title?:
              | string
              | {
                    name?: string;
                    type?: any;
                    weight?: number | string;
                    opacity?: number;
                    style?: any;
                };
          children: Menus[] | Menus;
      } & Row)
    | Menus[]
    | Menus;

export interface Footer {
    logo?: Logo;
    menus?: ({ children: Category[] | Category; width?: number; padding?: number } & Row) | Category[] | Category;
    side?: any;
    bottom?: any;
}

export default function Footer(props?: Footer) {
    const Col = (item: any) => {
        item = item?.item ? item?.item : item;
        return Array.isArray(item) ? (
            <Layouts.Col>
                {item?.map((child: any, i: number) => (
                    <Row key={i} item={child} />
                ))}
            </Layouts.Col>
        ) : typeof item === "object" && !item?.$$typeof ? (
            <Layouts.Col {...item}>
                {Array.isArray(item?.children) ? item?.children?.map((child: any, i: number) => <Row key={i} item={child} />) : item?.children}
            </Layouts.Col>
        ) : (
            item
        );
    };

    const Row = (item: any) => {
        item = item?.item ? item?.item : item;
        return Array.isArray(item) ? (
            <Layouts.Row>
                {item?.map((child: any, i: number) => (
                    <Col key={i} item={child} />
                ))}
            </Layouts.Row>
        ) : typeof item === "object" && !item?.$$typeof ? (
            <Layouts.Row {...item}>
                {Array.isArray(item?.children) ? item?.children?.map((child: any, i: number) => <Col key={i} item={child} />) : item?.children}
            </Layouts.Row>
        ) : (
            item
        );
    };

    const Category = (category: any) => {
        category = category?.category ? category?.category : category;
        return Array.isArray(category) ? (
            category?.map((group: any, i: number) => (
                <Layouts.Row key={i}>
                    {Array.isArray(group) ? (
                        <Layouts.Col>
                            {Array.isArray(group) ? group?.map((child: any, i: number) => <Section key={i} section={child} />) : <Section section={group} />}
                        </Layouts.Col>
                    ) : typeof group === "object" && group?.children && !group?.$$typeof ? (
                        <Layouts.Col {...group} style={group?.width && { width: `${group?.width}em` }}>
                            <Section section={group} />
                        </Layouts.Col>
                    ) : (
                        <Section section={group} />
                    )}
                </Layouts.Row>
            ))
        ) : typeof category === "object" && !category?.$$typeof ? (
            <Layouts.Col {...category}>
                <Section section={category} />
            </Layouts.Col>
        ) : (
            category
        );
    };

    const Section = (section: any) => {
        section = section?.section ? section?.section : section;
        return section?.title ? (
            <>
                {typeof section?.title === "object" ? (
                    <Elements.Text {...section?.title}>{section?.title?.name}</Elements.Text>
                ) : (
                    <Elements.Text>{section?.title}</Elements.Text>
                )}
                {Array.isArray(section?.children) ? (
                    <Layouts.Col>
                        {section?.children?.map((item: any, i: number) => (
                            <MenuItem key={i} menu={item} />
                        ))}
                    </Layouts.Col>
                ) : typeof section?.children === "object" && !section?.children?.$$typeof ? (
                    <Layouts.Col {...section?.children} style={section?.children?.width && { width: `${section?.children?.width}em` }}>
                        {Array.isArray(section?.children?.children) ? (
                            section?.children?.children?.map((child: any, i: number) => <MenuItem key={i} menu={child} />)
                        ) : (
                            <MenuItem menu={section?.children?.children} />
                        )}
                    </Layouts.Col>
                ) : (
                    section.children
                )}
            </>
        ) : Array.isArray(section?.children) ? (
            section?.children?.map((item: any, i: number) => <MenuItem key={i} menu={item} />)
        ) : (
            <MenuItem menu={section?.children || section} />
        );
    };

    const MenuItem = (menu: any) => {
        menu = menu?.menu ? menu?.menu : menu;
        return Array.isArray(menu) ? (
            menu?.map((item: any, i: number) =>
                typeof item === "object" && !item.$$typeof ? (
                    <Elements.Text key={i} {...item} type={item?.type || "button"}>
                        {item?.name}
                    </Elements.Text>
                ) : (
                    item
                )
            )
        ) : (
            <Elements.Text {...menu} type={menu?.type || "button"}>
                {menu?.name}
            </Elements.Text>
        );
    };

    return (
        <Style>
            <Layouts.Col>
                <Layouts.Row responsive="tablet">
                    {props?.logo && (
                        <Layouts.Row {...props?.logo} fit={props?.logo?.fit || true}>
                            <Layouts.Col {...props?.logo?.content} fill={props?.logo?.content?.fill || true}>
                                <Logo href={props?.logo?.href}>
                                    {typeof props?.logo?.src === "string" ? (
                                        <Image
                                            src={props?.logo?.src}
                                            width={props?.logo?.width}
                                            height={props?.logo?.height}
                                            title={props?.logo?.title}
                                            alt={props?.logo?.alt || ""}
                                        />
                                    ) : (
                                        props?.logo?.src
                                    )}
                                </Logo>
                                {props?.logo?.content &&
                                    (typeof props?.logo?.content === "object" ? (
                                        props?.logo?.content?.children
                                    ) : (
                                        <Elements.Text type={"desc"} opacity={0.6}>
                                            {props?.logo?.content}
                                        </Elements.Text>
                                    ))}
                            </Layouts.Col>
                        </Layouts.Row>
                    )}
                    {props?.menus && (
                        <Layouts.Row
                            {...(typeof props?.menus === "object" && (props?.menus as Row))}
                            style={{ padding: `${(props?.menus as any)?.padding || 2}em` }}
                            fill
                        >
                            <Category category={props?.menus} />
                        </Layouts.Row>
                    )}
                    {props?.side && (
                        <Layouts.Row {...props?.side}>
                            <Col item={props?.side} />
                        </Layouts.Row>
                    )}
                </Layouts.Row>
                {props?.bottom &&
                    (typeof props?.bottom === "string" ? (
                        <Elements.Text type={"desc"} weight={"bold"} opacity={0.3} responsive={{ device: "tablet", align: "center" }}>
                            {props?.bottom}
                        </Elements.Text>
                    ) : (
                        props?.bottom
                    ))}
            </Layouts.Col>
        </Style>
    );
}
