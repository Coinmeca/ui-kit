import { Controls } from "components";
import { Numberpad } from "parts";
import type { Numberpad as Pad } from "parts/numberpads/Numberpad";

export default function Exchange(props: Pad) {
    return (
        <Numberpad
            {...props}
            right={{
                children: (
                    <>
                        <Controls.Button icon={"chevron-left"} />
                        <Controls.Button icon={"plus"} />
                        <Controls.Button icon={"empty"} />
                        <Controls.Button>GO</Controls.Button>
                    </>
                ),
            }}
        />
    );
}
