import React from 'react';
import * as S from './styles';

function isRealNumeric(input) {
    return /^[0-9]{1,6}(\.[0-9]{0,2})?$/.test(input);
}

export class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || '',
            cursorStart: 0,
            cursorEnd: 0,
            loading: false
        };
        this.increaseShiftValues = [10, 0.1];
        this.increaseNoShiftValues = [1, 0.01];
    }

    componentWillReceiveProps({ value }) {
        this.setState({ value: value ? `${value}` : '', loading: false });
    }

    componentDidUpdate() {
        return this.updateCursor(this.state.cursorStart, this.state.cursorEnd);
    }

    updateCursor(start, end) {
        if (!this.input) {
            return;
        }

        this.input.setSelectionRange(start, end);
    }

    setValue(value, { selectionStart, selectionEnd }) {

        if (!value) {
            this.setState(
                { cursorStart: selectionStart, cursorEnd: selectionEnd }
            );
            return this.props.onChange(null)
        }

        if (value && !value.includes('.') && this.state.value.includes('.')) {
            this.setState(
                { cursorStart: selectionStart - 1, cursorEnd: selectionEnd - 1 }
            );
            return this.props.onChange(
                Number(`${value.substr(0, this.state.value.indexOf('.') - 1)}.${value.substr(
                    this.state.value.indexOf('.') + 1
                )}`)
            )
        }

        console.log('value', value)

        if (value && value.endsWith('.')) {
            return this.setState(
                { value, cursorStart: selectionStart, cursorEnd: selectionEnd }
            );
        }

        if (value && value.endsWith(',')) {
            return this.setState(
                { value: value.replace(',', '.'), cursorStart: selectionStart, cursorEnd: selectionEnd }
            );
        }

        if (value && value.includes(',.')) {
            this.setState(
                { cursorStart: selectionStart, cursorEnd: selectionEnd }
            );
            return this.props.onChange(Number(value.replace(',.', '.')))
        }

        if (value && !isRealNumeric(value)) {
            this.setState(
                { cursorStart: selectionStart - 1, cursorEnd: selectionEnd - 1 }
            );
            return this.props.onChange(Number(this.state.value))
        }

        this.setState(
            { cursorStart: selectionStart, cursorEnd: selectionEnd }
        );
        this.props.onChange(Number(value))
    }

    onClick(event, onClick) {

        if (event.target.selectionStart >= this.state.value.length) {
            return this.setState({
                cursorStart: this.state.value.length,
                cursorEnd: this.state.value.length,
            });
        }

        this.setState({
            cursorStart: event.target.selectionStart,
            cursorEnd: event.target.selectionEnd,
        });

    }


    onChange(event) {
        const value = event.target.value.trim();
        return this.setValue(value, event.target);
    }

    getAmountPosition(target, isShift, isDecreasing) {
        const increaseValues = isShift ? this.increaseShiftValues : this.increaseNoShiftValues;
        const isDecimalIncrementation = this.state.value.indexOf('.') !== -1 && target.selectionStart > this.state.value.indexOf('.');
        const absoluteIncrement = isDecimalIncrementation
            ? increaseValues[1]
            : increaseValues[0];
        const increment = isDecreasing ? -absoluteIncrement : absoluteIncrement;
        const amount = isDecimalIncrementation
            ? (Number(this.state.value) + increment).toFixed(2)
            : Number(this.state.value) + increment;
        return this.setValue(`${amount}`, target)
    }

    stopPropagation(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    render() {
        const { onEnter, onClick, onBlur, onDoubleClick, onChange, ...rest } = this.props;
        return (
            <S.Input
                {...rest}
                type="text"
                innerRef={(input) => (this.input = input)}
                onClick={(e) => this.onClick(e, onClick)}
                onKeyDown={(event) => {
                    const { target, key } = event;
                    const isShift = !!event.shiftKey;
                    switch (key) {
                        case 'Enter':
                            this.setState({ loading: true });
                            onEnter(Number(this.state.value));
                            return this.stopPropagation(event);
                        case 'ArrowUp':
                            this.getAmountPosition(target, isShift, false)
                            return this.stopPropagation(event);
                        case 'ArrowDown':
                            this.getAmountPosition(target, isShift, true)
                            return this.stopPropagation(event);
                        case 'ArrowRight':
                            if (target.selectionStart >= this.state.value.length) {
                                this.setValue(this.state.value, target);
                                return this.stopPropagation(event);
                            }
                            break;
                        case 'Escape':
                            this.setValue(null, { selectionStart: 0, selectionEnd: 0 });
                            return this.stopPropagation(event);
                        default:
                    }
                    return true;
                }}
                onChange={(event) => this.onChange(event, onChange)}
                value={this.state.value}

            />
        );
    }
}

Input.propTypes = {};

export default Input;