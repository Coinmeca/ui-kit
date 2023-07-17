import { Controls } from "components";
import { Default } from "..";
import type { Numberpad } from "../Numberpad";

export default function Exchange(props: Numberpad) {
    return (
        <Default
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
