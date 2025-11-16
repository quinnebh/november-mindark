export interface LogoProps
{
    color?:string;
    className?:string;
    size?:string|number;
}

export function Logo({
    color='white',
    className="w-8 h-8",
    size
}:LogoProps){

    if(typeof size === 'number'){
        size=size+'px';
    }

    return (
        <svg className={className} viewBox="0 0 134 134" fill="none" style={size===undefined?undefined:{width:size,height:size}}>
            <path d="M59.6224 49.4795L46.058 69.9385L25.4789 38.9912V105.735L42.1664 80.5986L42.1693 80.6006L44.7533 76.7021L46.0004 74.8252H73.1478L63.305 89.6211H93.6351V44.0273L74.9613 72.0986H47.806L61.2103 51.8799L61.2318 51.9111L95.5961 0.0185547L95.5863 0.0146484L95.597 0H119.994V119.762H93.6351V107.195H51.6049L43.0804 120H-0.00647354V0H26.8666L59.6224 49.4795Z" fill={color}/>
        </svg>

    )

}