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
                        <Controls.Button icon={"plus"}>0</Controls.Button>
                        <Controls.Button icon={"minus"}>0</Controls.Button>
                        <Controls.Button>GO</Controls.Button>
                    </>
                ),
            }}
        />
    );
}
