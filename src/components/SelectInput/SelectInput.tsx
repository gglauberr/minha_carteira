import React from 'react'
import * as S from './styles'
import { ISelectInputProps } from './types'

const SelectInput: React.FC<ISelectInputProps> = ({ 
    options, 
    onChange, 
    defaultValue 
}) => (
    <S.Container>
        <select onChange={onChange} defaultValue={defaultValue}>
            {
                options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))
            }
        </select>
    </S.Container>
)

export default SelectInput