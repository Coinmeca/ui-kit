"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Layouts } from "components";
import Style from "./BottomSheet.styled";

export interface BottomSheet {
    children?: any;
    scale?: number;
    active: boolean;
    height?: number | { min?: number; max?: number };
    onBlur?: Function;
    onClose: Function;
}
export default function BottomSheet(props: BottomSheet) {
    const [mounted, setMounted] = useState<boolean>(false);
    const active = props?.active || false;
    const scale = props?.scale || 1;

    useEffect(() => {
        setMounted(true);
    }, []);

    const onClose = (e: any) => {
        if (typeof props?.onClose === "function") props?.onClose(e);
    };

    const onBlur = (e: any) => {
        if (typeof props?.onBlur === "function") props?.onBlur(e);
        // onClose(e);
        // setMounted(false);
    };

    return mounted && active
        ? createPortal(
              <Layouts.Panel active={mounted} id="panel" style={{ zIndex: 100, pointerEvents: "none" }} fix>
                  <Style tabIndex={100} $scale={scale} $active={active} $height={props?.height} onBlur={(e: any) => onBlur(e)}>
                      {props?.children}
                  </Style>
              </Layouts.Panel>,
              document.body
          )
        : null;
}
