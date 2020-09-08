import React, { useMemo, useState } from 'react'
import * as S from './styles'

import Toggle from '../Toggle'

import Emojis from '../../utils/Emojis'

import { useTheme } from '../../hooks/theme'

const MainHeader: React.FC = () => {

    const { toggleTheme, theme } = useTheme()

    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false)

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme)
        toggleTheme()
    }

    const emoji = useMemo(() => {
        const indice = Math.floor(Math.random() * Emojis.length)
        return Emojis[indice]
    }, [])

    return (
        <S.Container>
            <Toggle 
                labelLeft='Light'
                labelRight='Dark'
                checked={darkTheme}
                onChange={handleChangeTheme}
            />
            
            <S.Profile>
                <S.Welcome>Olá, {emoji}</S.Welcome>
                <S.UserName>Glauber Aguiar</S.UserName>
            </S.Profile>
        </S.Container>
    )
}

export default MainHeader