export interface IPieChartBoxProps {
    data: {
        name: string,
        value: number,
        percent: number,
        color: string
    }[]
}

export interface ILegendProps {
    color: string
}