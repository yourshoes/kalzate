import React from 'react';
import Input from './Input';
import * as S from './styles';

export default function PaymentMethod({ icon, placeholder, ...rest }) {
    return <S.Container>
        <Input
            type="text"
            placeholder={placeholder}
            {...rest}
        />
        <S.Label title={placeholder}>
            {placeholder}
        </S.Label>
        {icon}
    </S.Container>
}