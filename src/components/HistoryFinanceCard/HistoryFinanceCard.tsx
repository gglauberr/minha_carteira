import React from 'react'
import * as S from './styles'
import { IHistoryFinanceCardProps } from './types'

const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({
    tagColor,
    title,
    subtitle,
    amount
}) => (
        <S.Container>
            <S.Tag color={tagColor} />
            <div>
                <span>{title}</span>
                <small>{subtitle}</small>
            </div>
            <h3>{amount}</h3>
        </S.Container>
    )

export default HistoryFinanceCard