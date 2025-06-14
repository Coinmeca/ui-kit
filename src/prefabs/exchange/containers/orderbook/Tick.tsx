import { motion } from "motion/react";
import { format } from "lib/utils";
import { Tick as Style } from "./Orderbook.styled";

export interface Tick {
    price: number | string;
    balance: number | string;
}

export interface TickProps extends Tick {
    max: number;
    onClick?: Function;
    onMouseEnter?: Function;
}

export function Tick({ price, balance, max, onClick, onMouseEnter }: TickProps) {
    return (
        <Style
            key={price}
            onClick={(e: any) => onClick?.(e)}
            onMouseEnter={(e: any) => onMouseEnter?.(e)}
            as={motion.div}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            layout>
            <div>
                <div>
                    <div>
                        <span>{format(balance, "currency", { unit: 9, limit: 12, fix: 3 })}</span>
                    </div>
                    <div
                        style={{
                            backgroundSize: `${
                                (parseFloat(balance.toString()) / max) * 100 > 100
                                    ? "100"
                                    : (parseFloat(balance.toString()) / max) * 100 < 0
                                    ? "0"
                                    : (parseFloat(balance.toString()) / max) * 100
                            }% 100%`,
                        }}>
                        <span>{format(price, "currency", { unit: 9, limit: 12, fix: 3 })}</span>
                    </div>
                </div>
            </div>
            {/* <div>
                                        <Controls.Button>Order</Controls.Button>
                                    </div> */}
        </Style>
    );
}
