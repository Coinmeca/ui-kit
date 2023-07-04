import * as Texts from './Text.styled';

interface Text {
    children?: any;
    style?: object;
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'strong' | 'p' | 'desc';
    scale?: number;
    weight?: number | string;
    line?: number;
    responsive?: Responsive;
}

interface Responsive {
    style?: object;
    scale?: number;
    weight?: number | string;
    line?: number;
    device: 'desktop' | 'laptop' | 'tablet' | 'mobile';
}


export default function Text(props: Text) {
    const scale = props?.scale || 1.5;
    const line = props?.line || 1.5;

    switch(props?.type) {
        case 'h1':
            return <Texts.H1 style={props?.style} $weight={props?.weight || 'bold'} $line={line}>{props?.children}</Texts.H1>;
        case 'h2':
            return <Texts.H2 style={props?.style} $weight={props?.weight || 'bold'} $line={line}>{props?.children}</Texts.H2>;
        case 'h3':
            return <Texts.H3 style={props?.style} $weight={props?.weight || 'bold'} $line={line}>{props?.children}</Texts.H3>;
        case 'h4':
            return <Texts.H4 style={props?.style} $weight={props?.weight || 'bold'} $line={line}>{props?.children}</Texts.H4>;
        case 'h5':
            return <Texts.H5 style={props?.style} $weight={props?.weight || 'bold'} $line={line}>{props?.children}</Texts.H5>;
        case 'h6':
            return <Texts.H6 style={props?.style} $weight={props?.weight || 'bold'} $line={line}>{props?.children}</Texts.H6>;
        case 'strong':
            return <Texts.Strong style={props?.style} $weight={props?.weight || 'bold'} $line={line}>{props?.children}</Texts.Strong>;
        case 'p':
            return <Texts.P style={props?.style} $weight={props?.weight || 'normal'} $line={line}>{props?.children}</Texts.P>;
        case 'desc':
            return <Texts.Desc style={props?.style} $weight={props?.weight || 'normal'} $line={line}>{props?.children}</Texts.Desc>;
        default: 
            return <Texts.Text style={props?.style} $scale={scale} $weight={props?.weight || 'bold'} $line={line} $responsive={props?.responsive}>{props?.children}</Texts.Text>;
    }
}