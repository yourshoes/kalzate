import React from 'react';
import { render } from '@testing-library/react';

import Input from './Input';

const DEFAULT_PROPS = {
    onChange: () => null,
    'aria-label': 'price-input'
};

describe('<Input> component', () => {

    const getInput = (props = {}) => {
        const utils = render(<Input {...DEFAULT_PROPS} {...props} />)
        return utils.getByLabelText('price-input')
    }

    it('should render number without decimals', async function () {
        const input = getInput({ value: 20 })
        expect(input.value).toBe('20.00')
    });

    it('should render number with 1 decimals', async function () {
        const input = getInput({ value: 20.1 })
        expect(input.value).toBe('20.10')
    });

    it('should render number with 2 decimals', async function () {
        const input = getInput({ value: 20.75 })
        expect(input.value).toBe('20.75')
    });

    it('should render value lower than 1', async function () {
        const input = getInput({ value: 0.75 })
        expect(input.value).toBe('0.75')
    });

    it('should render empty value', async function () {
        const input = getInput({ value: 0.0 })
        expect(input.value).toBe('0.00')
    });

    it('should render null value', async function () {
        const input = getInput({ value: null })
        expect(input.value).toBe('')
    });

    it('should not render invalid number values', async function () {
        const input = getInput({ value: '000..00' })
        expect(input.value).toBe('')
    });

    it('should not render invalid false positive values', async function () {
        const input = getInput({ value: 20.7555 })
        expect(input.value).toBe('20.76')
    });

    it('should not render negative values', async function () {
        const input = getInput({ value: -20.75 })
        expect(input.value).toBe('0.00')
    });

    it('should not render invalid string values', async function () {
        const input = getInput({ value: 'invalid value' })
        expect(input.value).toBe('')
    });
});
