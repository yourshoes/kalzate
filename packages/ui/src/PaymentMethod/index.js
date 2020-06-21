import React from 'react';

import * as S from './styles';

export default function PaymentMethod({ icon, placeholder, ...rest }) {
    return <S.Container>
        <S.Input
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