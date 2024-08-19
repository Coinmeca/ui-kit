'use client';
export interface TextCollapse { text: string, condition?: boolean }

export default function TextCollapse({ text, condition }: TextCollapse) {
    if (!text && text === "") return;
    return (
        <span
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
            {Object.values(text).map((character: string, i: number) => {
                return (
                    <span
                        key={i}
                        style={{
                            ...(character === " " && {
                                minWidth: '0.5ch'
                            }),
                            ...(i !== 0 && {
                                ...(condition && {
                                    position: "absolute",
                                    opacity: 0,
                                    // transition: ".15s ease",
                                }),
                            }),
                        }}>
                        {character}
                    </span>
                );
            })}
        </span>
    );
};