export interface IBarChartBoxProps {
    title: string,
    data: {
        name: string,
        amount: number,
        percent: number,
        color: string
    }[]
}

export interface ILegendProps {
    color: string
}