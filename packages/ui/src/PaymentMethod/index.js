import React from 'react';

import * as S from './styles';

export default function PaymentMethod({ icon, onChange, onClick, placeholder, value, children, ...rest }) {
    return <S.Container>
        <S.Input
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
        <S.Label title={placeholder}>
            {placeholder}
        </S.Label>
        {icon}
    </S.Container>
}