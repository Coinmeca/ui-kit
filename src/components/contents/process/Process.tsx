"use client";
import { useEffect, useState } from "react";
import { Contents, Layouts } from "components";
import type { State } from "components/contents/states/State";

export interface Process {
    process: boolean | null;
    content?: any;
    failure?: State;
    success?: State;
    loading?: State & { active?: boolean };
    style?: object;
}

export default function Process(props: Process) {
    const [process, setProcess] = useState<boolean | null | undefined>(
        props?.process,
    );

    useEffect(() => {
        setProcess(props?.process);
    }, [props?.process]);

    return (
        <Layouts.Contents.PartContainer
            {...props}
            state={process}
            content={
                !props?.loading ? (
                    props?.content
                ) : (
                    <Layouts.Contents.SlideContainer
                        contents={[
                            {
                                active: !props?.loading?.active,
                                children: props?.content,
                            },
                            {
                                active: props?.loading?.active,
                                children: (
                                    <Contents.States.Loading
                                        {...props?.loading}
                                    />
                                ),
                            },
                        ]}
                    />
                )
            }
            left={{
                children: <Contents.States.Failure {...props?.failure} />,
            }}
            right={{
                children: <Contents.States.Success {...props?.success} />,
            }}
        />
    );
}
