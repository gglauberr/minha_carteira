import React from 'react'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    Tooltip
} from 'recharts'
import * as S from './styles'
import { IBarChartBoxProps } from './types'

import formatCurrency from '../../utils/formatCurrency'

const BarChartBox: React.FC<IBarChartBoxProps> = ({
    title,
    data
}) => (
        <S.Container>
            <S.SideLeft>
                <h2>{title}</h2>
                <S.LegendContainer>
                    {
                        data.map(indicator => (
                            <S.Legend key={indicator.name} color={indicator.color}>
                                <div>{indicator.percent}%</div>
                                <span>{indicator.name}</span>
                            </S.Legend>
                        ))
                    }
                </S.LegendContainer>
            </S.SideLeft>

            <S.SideRight>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <Bar
                            dataKey='amount'
                            name='Valor'
                        >
                            {
                                data.map(indicator => (
                                    <Cell
                                        key={indicator.name}
                                        fill={indicator.color}
                                        cursor='pointer'

                                    />
                                ))
                            }
                        </Bar>
                        <Tooltip
                            formatter={value => formatCurrency(Number(value))}
                            cursor={{
                                fill: 'none'
                            }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </S.SideRight>
        </S.Container>
    )

export default BarChartBox