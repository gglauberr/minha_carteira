import React from 'react'
import * as S from './styles'
import { IContentHeaderProps } from './types'

const ContentHeader: React.FC<IContentHeaderProps> = ({ title, lineColor, children }) => (
    <S.Container>
        <S.TitleContainer lineColor={lineColor}>
            <h1>{title}</h1>
        </S.TitleContainer>

        <S.Controllers>
            {children}
        </S.Controllers>
    </S.Container>
)

export default ContentHeader