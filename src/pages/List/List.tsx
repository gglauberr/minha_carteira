import React, { useMemo, useState, useEffect } from 'react'
import { v4 } from 'uuid'
import * as S from './styles'
import { IRouteParams, IData } from './types'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import HistoryFinanceCard from '../../components/HistoryFinanceCard'

import Gains from '../../repositories/gains'
import Expenses from '../../repositories/expenses'

import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'
import listOfMounths from '../../utils/months'

const List : React.FC<IRouteParams> = ({ match }) => {

    const [data, setData] = useState<IData[]>([])
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1)
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear())
    const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente','eventual'])

    const movimentType = match.params.type

    const pageData = useMemo(() => {
        return movimentType === 'entry-balance'
        ?
        {
            title: 'Entradas',
            lineColor: '#4E41F0',
            data: Gains
        }
        :
        {
            title: 'Saídas',
            lineColor: '#E44C4E',
            data: Expenses
        }
    }, [movimentType])

    const months = useMemo(() => {
        return listOfMounths.map((mouth, index) => {
            return {
                value: index + 1,
                label: mouth
            }
        })
        
    }, [])

    const years = useMemo(() => {
        let uniqueYears: number[] = []

        const { data } = pageData

        data.forEach(item => {
            const date = new Date(item.date)
            const year = date.getFullYear()

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year)
            }
        })

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        })
    }, [pageData])

    const handleFrequencyClick = (frequency: string) => {
        const alreadyselected = frequencyFilterSelected.findIndex(item => item === frequency)

        if(alreadyselected >= 0){
            const filtered = frequencyFilterSelected.filter(item => item !== frequency)
            setFrequencyFilterSelected(filtered)
        }else{
            setFrequencyFilterSelected((prev) => [...prev, frequency])
        }
    }

    const handleMonthSelected = (month: string) => {
        try{
            const parseMonth = Number(month)
            setMonthSelected(parseMonth)
        }catch{
            throw new Error('invalid month value. Is accept 0 - 24.')
        }
    }

    const handleYearSelected = (year: string) => {
        try{
            const parseYear = Number(year)
            setYearSelected(parseYear)
        }catch{
            throw new Error('invalid year value. Is accept integer numbers.')
        }
    }

    useEffect(() => {

        const { data } = pageData

        const filteredData = data.filter(item => {
            const date = new Date(item.date)
            const month = date.getMonth() + 1
            const year = date.getFullYear()

            return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency)
        })

        const formattedData = filteredData.map(item => {
            return {
                id: v4(),
                descrition: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
            }
        })

        setData(formattedData)
    }, [pageData, monthSelected, yearSelected, frequencyFilterSelected])

    return(
        <S.Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput 
                    options={months} 
                    onChange={e => handleMonthSelected(e.target.value)} 
                    defaultValue={monthSelected} 
                />
                <SelectInput 
                    options={years} 
                    onChange={e => handleYearSelected(e.target.value)} 
                    defaultValue={yearSelected} 
                />
            </ContentHeader>
            <S.Filters>
                <button 
                    type='button'
                    className={`
                        tag-filter 
                        tag-filter-recurrent
                        ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}
                    `}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>

                <button 
                    type='button'
                    className={`
                        tag-filter 
                        tag-filter-eventual
                        ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}
                    `}
                    onClick={() => handleFrequencyClick('eventual')}
                >
                    Eventuais
                </button>
            </S.Filters>
            <S.Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard
                        key={item.id}
                        tagColor={item.tagColor}
                        title={item.descrition}
                        subtitle={item.dateFormatted}
                        amount={item.amountFormatted}
                    />
                    ))
                }
            </S.Content>
        </S.Container>
    )
}

export default List