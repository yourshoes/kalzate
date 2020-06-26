import React from 'react';
import Input from './Input';
import SpinnerLoader from '../SpinnerLoader';
import * as S from './styles';

export default function PaymentMethod({ icon, placeholder, loading, visible, disabled, pattern, ...rest }) {
    return <S.Container visible={visible}>
        <Input
            type="text"
            placeholder={placeholder}
            disabled={loading ? true : disabled}
            pattern={pattern}
            {...rest}
        />
        <S.Label title={placeholder}>
            {placeholder}
        </S.Label>
        {loading ? <SpinnerLoader /> : icon}
    </S.Container>
}

PaymentMethod.defaultProps = {
    visible: true,
    loading: false,
    disabled: false,
    pattern: 'price'
}