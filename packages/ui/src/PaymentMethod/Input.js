import React from 'react';
import * as S from './styles';

function isRealNumeric(input) {
    return /^(?:[1-9]\d{0,4}|0)(?:\.\d{1,3})?$/.test(input);
}

function isNumeric(input) {
    return /^\d{1,15}$/.test(input);
}

export class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.parseValue(props.value, props.pattern),
            cursorStart: 0,
            cursorEnd: 0,
            loading: false
        };
        this.increaseShiftValues = [10, 0.1];
        this.increaseNoShiftValues = [1, 0.01];
    }

    parseValue(value, pattern) {
        try {

            if (pattern === 'id') {
                return this.parseValueId(value);
            }

            return this.parseValuePrice(value);
        }
        catch (e) {
            return '';
        }
    }

    parseValuePrice(value) {
        if (typeof value !== 'number') {
            return '';
        }

        if (value <= 0) {
            return '0.00';
        }

        return `${value.toFixed(2)}`;
    }

    parseValueId(value) {
        if (typeof value !== 'number' || value <= 0) {
            return '';
        }

        return `${value}`;
    }

    componentWillReceiveProps({ value, pattern }) {
        this.setState({ value: this.parseValue(value, pattern), loading: false });
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

    setValueId(value, { selectionStart, selectionEnd }) {
        if (!value) {
            this.setState(
                { value: '', cursorStart: selectionStart, cursorEnd: selectionEnd }
            );
            return this.props.onChange(null)
        }

        if (!isNumeric(value)) {
            return this.setState(
                { value: this.state.value, cursorStart: selectionStart - 1, cursorEnd: selectionEnd - 1 }
            );
        }

        this.setState(
            { value, cursorStart: selectionStart, cursorEnd: selectionEnd }
        );
        this.props.onChange(Number(value))
    }

    setValue(value, { selectionStart, selectionEnd }) {

        if (this.props.pattern === 'id') {
            return this.setValueId(value, { selectionStart, selectionEnd })
        }

        if (!value || value.startsWith('.')) {
            this.setState(
                { value: '', cursorStart: selectionStart, cursorEnd: selectionEnd }
            );
            return this.props.onChange(null)
        }

        // console.log(value, this.state.value, selectionStart, selectionEnd)
        // For next cases, | is the mouse cursor
        // Case 1: 12|.45 -> 12.|45
        if (value[selectionStart - 1] === '.' && value[selectionStart] === '.') {
            return this.setState(
                { cursorStart: selectionStart, cursorEnd: selectionEnd }
            );
        }

        // Case 1: 12.|45 -> 12|.45
        if (this.state.value.replace('.', '') === value) {
            return this.setState(
                { cursorStart: selectionStart, cursorEnd: selectionEnd }
            );
        }


        if (!isRealNumeric(value)) {
            return this.setState(
                { value: this.state.value, cursorStart: selectionStart - 1, cursorEnd: selectionEnd - 1 }
            );
        }


        if (value.includes('.') && selectionStart > value.indexOf('.')) {
            const amount = value.substr(0, value.indexOf('.') + 3);
            this.setState(
                { value: amount, cursorStart: selectionStart, cursorEnd: selectionEnd }
            );
            return this.props.onChange(Number(amount))
        }

        this.setState(
            { value, cursorStart: selectionStart, cursorEnd: selectionEnd }
        );
        this.props.onChange(Number(value))
    }

    onClick(event, onClick) {
        if (this.props.readonly) {
            return;
        }

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
        if (this.props.readonly) {
            return;
        }
        const value = event.target.value.trim();
        return this.setValue(value, event.target);
    }

    onBlur(event) {
        if (this.props.readonly || this.props.pattern !== 'price') {
            return;
        }
        if (this.state.value) {
            this.setState({ value: Number(this.state.value).toFixed(2) })
        }
    }

    getAmountPosition(target, isShift, isDecreasing) {
        if (this.props.readonly) {
            return;
        }
        if (this.props.pattern !== 'price') { return; }
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
                onBlur={(e) => this.onBlur(e, onClick)}
                onKeyDown={(event) => {
                    const { target, key } = event;
                    const isShift = !!event.shiftKey;
                    switch (key) {
                        case 'Enter':
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