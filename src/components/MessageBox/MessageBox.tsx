import React from 'react'
import * as S from './styles'
import { IMessageBoxProps } from './types'

const MessageBox: React.FC<IMessageBoxProps> = ({
    title,
    description,
    footerText,
    icon
}) => (
        <S.Container>
            <header>
                <h1>
                    {title}
                    <img src={icon} alt={title} />
                </h1>
                <p>
                    {description}
                </p>
            </header>

            <footer>
                <span>{footerText}</span>
            </footer>
        </S.Container>
    )

export default MessageBox