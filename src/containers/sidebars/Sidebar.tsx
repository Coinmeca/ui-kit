"use client";
import { useMobile, useSwipe } from "hooks";
import { SwipeConfig } from "hooks/useSwipe";
import Style, { Lower, SwipeArea, Upper } from "./Sidebar.styled";

export interface PositionEvent {
    x?: number;
    opacity?: number;
    zIndex?: number;
}
export interface Sidebars {
    active?: boolean;
    width?: number;
    scale?: number;
    align?: "left" | "right";
    upper?: { active?: boolean; children?: Sidebar[]; onBlur?: Function };
    lower?: {
        active?: boolean;
        children?: Sidebar[];
        onBlur?: Function;
        swipe?: (SwipeConfig & { area?: number; onActive?: Function; style?: object }) | boolean;
    };
    onBlur?: Function;
}

export interface Sidebar {
    active?: boolean;
    children: any;
}

export default function Sidebar(props: Sidebars) {
    const { isMobile } = useMobile();

    const active = props?.active || false;
    const scale = props?.scale || 1;
    const width = props?.width || 60;
    const align = props?.align === "left" || props?.align === "right" ? props?.align : "left";

    const swiping = typeof props?.lower?.swipe === "object" ? props?.lower?.swipe : undefined;
    const elastic = swiping?.elastic || 0.045;
    const area = swiping?.area || 4;
    const threshold = swiping?.threshold || 100;
    const swipe = useSwipe(
        isMobile && {
            elastic,
            threshold,
            onSwipe: (e: any, move: any) => {
                if (move !== 0) {
                    if (swiping && typeof swiping?.onActive === "function") swiping?.onActive(e, move > 0 ? false : true);
                }
            },
        },
    );

    const handleBlur = (e: any) => {
        // if (props?.lower?.active && props?.lower?.onBlur) props?.lower?.onBlur(e);
        // if (props?.upper?.active && props?.upper?.onBlur) props?.upper?.onBlur(e);
        if (props?.onBlur) props?.onBlur(e);
    };

    const handleLowerBlur = (e: any) => {
        if (props?.lower?.active && props?.lower?.onBlur) props?.lower?.onBlur(e);
    };

    const handleUpperBlur = (e: any) => {
        if (props?.upper?.active && props?.upper?.onBlur) props?.upper?.onBlur(e);
    };

    return (
        <Style tabIndex={10} $scale={scale} $active={active} $width={width} $align={align} onBlur={handleBlur}>
            {props?.lower?.children && props?.lower?.children?.length > 0 && (
                <Lower $align={align} data-active={props?.lower?.active} onBlur={handleLowerBlur}>
                    {props?.lower?.swipe && (
                        <SwipeArea
                            {...swipe}
                            $area={area}
                            style={typeof props?.lower?.swipe === "object" && props?.lower?.swipe?.style}
                        />
                    )}
                    {props?.lower?.children?.map((v: any, k: number) => (
                        <section key={k} data-active={v?.active}>
                            {v.children}
                        </section>
                    ))}
                </Lower>
            )}
            {props?.upper?.children && props?.upper?.children?.length > 0 && (
                <Upper data-active={props?.upper?.active} onBlur={handleUpperBlur}>
                    {props?.upper?.children?.map((v: any, k: number) => (
                        <section key={k} data-active={v?.active}>
                            {v.children}
                        </section>
                    ))}
                </Upper>
            )}
        </Style>
    );
}
