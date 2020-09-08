import React, { useState } from 'react'
import * as S from './styles'
import {
    MdDashboard,
    MdArrowUpward,
    MdArrowDownward,
    MdExitToApp,
    MdClose,
    MdMenu
} from 'react-icons/md'

import LogoImg from '../../assets/logo.svg'

import { useAuth } from '../../hooks/auth'
import { useTheme } from '../../hooks/theme'

import Toggle from '../Toggle'

const Aside: React.FC = () => {

    const { signOut } = useAuth()
    const { toggleTheme, theme } = useTheme()

    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false)
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false)

    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened)
    }

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme)
        toggleTheme()
    }

    return (
        <S.Container menuIsOpen={toggleMenuIsOpened}>
            <S.Header>
                <S.ToggleMenu onClick={handleToggleMenu}>
                    { toggleMenuIsOpened ? <MdClose /> : <MdMenu /> }
                </S.ToggleMenu>
                <S.LogImg src={LogoImg} alt='Logo Minha Carteira' />
                <S.Title>Minha Carteira</S.Title>
            </S.Header>

            <S.MenuContainer>
                <S.MenuItemLink href='/'>
                    <MdDashboard />
                    Dashboard
                </S.MenuItemLink>

                <S.MenuItemLink href='/list/entry-balance'>
                    <MdArrowUpward />
                    Entradas
                </S.MenuItemLink>

                <S.MenuItemLink href='/list/exit-balance'>
                    <MdArrowDownward />
                    Saídas
                </S.MenuItemLink>

                <S.MenuItemButton onClick={signOut}>
                    <MdExitToApp />
                    Sair
                </S.MenuItemButton>
            </S.MenuContainer>
            <S.ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
                <Toggle 
                    labelLeft='Light'
                    labelRight='Dark'
                    checked={darkTheme}
                    onChange={handleChangeTheme}
                />
            </S.ThemeToggleFooter>
        </S.Container>
    )
}

export default Aside