export interface TextCollapse { name: string, condition?: boolean }

export default function TextCollapse({ name, condition }: TextCollapse) {
    if (!name && name === "") return;
    return (
        <span
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
            {Object.values(name).map((character: string, i: number) => {
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