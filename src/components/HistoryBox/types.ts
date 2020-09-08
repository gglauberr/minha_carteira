export interface IHistoryBoxProps {
    data: {
        month: string,
        amountEntry: number,
        amountOutput: number
    }[],
    lineColorAmountEntry: string,
    lineColorAmountOutput: string
}

export interface ILegendProps {
    color: string
}