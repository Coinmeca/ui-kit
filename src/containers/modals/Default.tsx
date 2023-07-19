"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Controls, Elements, Layouts } from "components";
import useModal from "hooks/useModal";
import Style, { Close, ButtonArea } from "./Default.styled";

export interface Modal {
    active?: boolean;
    title?: string;
    message?: any;
    children?: any;
    content?: any;
    buttonArea: any;
    width?: number | { min?: number; max?: number };
    close?: boolean;
    onClose?: Function;
}

export default function Default() {
    const { modal } = useModal();
    const [mounted, setMounted] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(modal ? true : false);

    const min = 56;
    const max = 64;
    const width = { min: (typeof modal?.width === "object" ? modal?.width?.min : modal?.width) || min, max: (typeof modal?.width === "object" ? modal?.width?.min : modal?.width) || max };

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClose = (e: any) => {
        if (typeof modal?.onClose === "function") modal?.onClose(e);
        setShowModal(false);
    };

    return mounted && modal
        ? createPortal(
              <Layouts.Panel active={false} color={"black"} style={{ zIndex: 200 }} fix>
                  <Style $active={showModal} $width={width}>
                      <div>
                          {modal?.title && (
                              <Elements.Text scale={3} align={"center"}>
                                  {modal?.title}
                              </Elements.Text>
                          )}
                          {(modal?.message || modal?.content || modal?.children) && (
                              <Layouts.Contents.InnerContent scroll>
                                  {modal?.message &&
                                      (typeof modal?.message === "string" ? (
                                          <Elements.Text type={"strong"} height={2} opacity={0.6} align={"center"}>
                                              {modal?.message}
                                          </Elements.Text>
                                      ) : (
                                          modal?.message
                                      ))}
                                  {modal?.content}
                                  {modal?.children}
                              </Layouts.Contents.InnerContent>
                          )}
                          {modal?.buttonArea && <ButtonArea>{modal?.buttonArea}</ButtonArea>}
                          {modal?.close && (
                              <Close>
                                  <Controls.Button icon={"x"} onClick={(e: any) => handleClose(e)} />
                              </Close>
                          )}
                      </div>
                  </Style>
              </Layouts.Panel>,
              document.body
          )
        : null;
}
