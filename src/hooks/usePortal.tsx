'use client';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Root, createRoot } from 'react-dom/client';

type Child = Function | ReactNode | null;
type Args = [Child] | [object] | [Child, object] | undefined[];
type Portal = [(...args: Args) => void, Function];

export default function usePortal(initial?: any, initialProps?: any): Portal {
    const [root, setRoot] = useState<Root | undefined>(undefined);
    const [active, setActive] = useState(false);
    const [children, setChildren] = useState<Function | ReactNode | object>(null);
    const [props, setProps] = useState<any>(() => {
        return { ...(initial?.props || {}), ...(initialProps || {}) };
    });

    useEffect(() => {
        const rootElement = document.createElement('section');
        const newRoot = createRoot(rootElement);
        setRoot(newRoot);

        return () => {
            if (newRoot) {
                newRoot.unmount();
                rootElement.remove();
            }
            setActive(false);
            setChildren(null);
            setRoot(undefined);
        };
    }, []);

    useEffect(() => {
        const element = children || initial;
        if (root) {
            if (active) {
                root.render(createPortal(
                    typeof element === 'function' ? element(props) : element,
                    document.body
                ));
            } else {
                root.render(null);
            }
        }
    }, [active, initial, children, props, root]);

    return [
        (...args) => {
            if (args) {
                const newProps =
                    args.length === 2 && typeof args[1] === 'object' && !(args[1] as any)?.$$typeof
                        ? args[1]
                        : args.length === 1 && typeof args[0] === 'object' && !(args[0] as any)?.$$typeof
                            ? args[0]
                            : undefined;
                if (newProps) {
                    setProps((state: any) => ({ ...state, ...newProps, active: true }));
                }

                const newChildren =
                    (args.length === 2 && typeof args[1] === 'function') ||
                        (typeof args[1] === 'object' && (args[1] as any)?.$$typeof)
                        ? args[1]
                        : typeof args[0] === 'function' || (typeof args[0] === 'object' && (args[0] as any)?.$$typeof)
                            ? args[0]
                            : undefined;
                if (newChildren) {
                    setChildren(newChildren);
                }

                setActive(true);
            }
        },
        () => {
            setProps((state: any) => ({ ...state, active: false }));
            setActive(false);
        },
    ];
}
