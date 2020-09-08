export interface IListProps{}

export interface IData {
    id: string,
    descrition: string,
    amountFormatted: string,
    frequency: string,
    dateFormatted: string,
    tagColor: string
}

export interface IRouteParams {
    match: {
        params: {
            type: string
        }
    }
}