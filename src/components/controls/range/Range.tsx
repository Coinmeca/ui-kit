'use client';
import { useEffect, useState } from 'react';
import Style from './Range.styled';

export interface Slider {
    color?: string;
    value?: number;
    unit?: string;
    onChange?: Function;
    step?: number;
    snap?: boolean;
    zero?: boolean;
    min?: number;
    max?: number;
    show?: 'desktop' | 'laptop' | 'tablet' | 'mobile';
    hide?: 'desktop' | 'laptop' | 'tablet' | 'mobile';
    disabled?: boolean;
}

export default function Range(props: Slider) {
    const [value, setValue] = useState<number>(props?.value || 0);
    const [percent, setPercent] = useState<number>(0);

    const color = props?.color || 'white';
    const step = (props?.step && (props?.step > 2 ? props?.step : 2)) || 2;
    const snap = props?.snap || false;
    const zero = props?.zero || false;
    const min = props?.min || 0;
    const max = props?.max || min + 100;
    const disabled = props?.disabled || false;

    useEffect(() => {
        typeof props?.value === 'number' && !isNaN(props?.value) ? setValue(props?.value < min ? min : props?.value > max ? max : props?.value) : 0;
    }, [props?.value, min, max]);

    useEffect(() => {
        setPercent(value === min ? 0 : ((value - min) / (max - min)) * 100);
    }, [value, min, max]);

    const handleChange = (e: any) => {
        e?.stopPropagation();
        const range = max - min;
        let value = parseFloat(e.target.value) >= max ? max : parseFloat(e.target.value) <= min ? min : parseFloat(e.target.value);

        if (snap) {
            const tick = range / (step - 1);
            if (zero && min < 0 && value >= tick / -4 && value <= tick / 4) {
                value = 0;
            } else {
                value = Math.round((value + min) / tick) * tick - min;
            }
        }

        const percent = ((value - min) * 100) / range || 0;
        setPercent(percent);
        setValue(parseFloat(value.toFixed()));
        props?.onChange && props?.onChange(value, percent);
    };

    return (
        <>
            <Style
                draggable={false}
                $color={color}
                $value={
                    (max.toString().length > min.toString().length ? max.toString().length : min.toString().length) +
                    (props?.unit ? props?.unit.toString().length + 1 : 0)
                }
                data-show={props?.show}
                data-hide={props?.hide}>
                <input type="range" min={min} max={max} value={value} onChange={(e) => handleChange(e)} />
                <div>
                    <div>
                        <div style={{ backgroundSize: `${percent}% 100%` }}>
                            {zero && max % ((max - min) / (step - 1)) !== 0 && (
                                <div
                                    className={`zero${value >= 0 ? ' on' : ''}`}
                                    style={{
                                        left: `${(Math.abs(min) / (max - min)) * 100}%`,
                                    }}
                                />
                            )}
                            {[...Array(step)].map((_, i) => (
                                <div key={i} className={percent >= ((((max - min) / (step - 1)) * i) / (max - min)) * 100 ? 'on' : ''} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <span draggable={false} style={{ left: `${percent}%` }}>
                            <span>
                                {value.toFixed(0)}
                                {props?.unit && ` ${props?.unit}`}
                            </span>
                        </span>
                    </div>
                </div>
            </Style>
        </>
    );
}
