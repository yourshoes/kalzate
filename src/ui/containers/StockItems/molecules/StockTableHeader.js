import React from 'react';
import { isEmpty } from 'lodash';
import PubSub from 'ui/utils/pubsub';
import StockField from './StockField';
import StockButton from './StockButton';
import StockModal from './StockModal';
import StockTableHeaderContainer from '../atoms/StockTableHeaderContainer';

const isNumeric = (number) => /^[1-9][0-9]*$/.test(number);
const isRealNumeric = function (input) {
  return /^[1-9][0-9]*\.?[0-9]{0,2}$/.test(input);
};

export class StockTableHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      reference: '',
      brand: '',
      gender: '',
      colors: [],
      size: '',
      price: '',
      amount: '',
    };
  }
  // @todo optimize by moving regex outside function to reuse
  search() {
    const $or = [
      [
        'reference',
        this.state.reference,
        (v) => ({ $regex: new RegExp(v, 'gi') }),
      ],
      ['brand', this.state.brand, (v) => ({ $eq: v })],
      ['size', this.state.size, (v) => ({ $eq: v })],
      [
        'price',
        this.state.price,
        (v) => ({
          $gte: parseFloat(v),
          $lt: parseFloat(v) + 1,
          // $and: [{ $gte: parseFloat(v) }, { $lt: parseFloat(v) + 1 }],
        }),
      ],
      ['amount', this.state.amount, (v) => ({ $eq: v })],
      ['gender', this.state.gender, (v) => ({ $eq: v })],
      ['colors', this.state.colors, (v) => ({ $eq: v })],
    ]
      .filter((x) => !isEmpty(x[1]))
      .map((x) => ({ [x[0]]: x[2](x[1]) }));

    this.props.searchStock(
      $or.length ? { $or } : {},
      this.props.limit,
      this.props.skip
    );
  }

  openModal() {
    PubSub.publish(PubSub.topics.MODAL_OPENED, StockModal);
  }

  render() {
    return (
      <StockTableHeaderContainer content>
        <StockField
          placeholder="Reference"
          value={this.state.reference}
          onChange={(reference) => this.setState({ reference })}
        />
        <StockField
          placeholder="Brand"
          value={this.state.brand}
          onChange={(brand) => this.setState({ brand })}
        />
        <StockField
          placeholder="Gender"
          value={this.state.gender}
          onChange={(gender) => this.setState({ gender })}
        />
        <StockField
          placeholder="Color"
          value={this.state.colors.join()}
          onChange={(color) => this.setState({ colors: color ? [color] : [] })}
        />
        <StockField
          placeholder="Size"
          value={this.state.size}
          onChange={(size) =>
            this.setState({
              size: isNumeric(size)
                ? parseInt(size, 10)
                : size ? this.state.size : '',
            })
          }
        />
        <StockField
          placeholder="Price"
          value={this.state.price}
          onChange={(price) =>
            this.setState({
              price: isRealNumeric(price)
                ? price
                : price ? this.state.price : '',
            })
          }
        />
        <StockField
          placeholder="Amount"
          value={this.state.amount}
          onChange={(amount) =>
            this.setState({
              amount: isNumeric(amount)
                ? parseInt(amount, 10)
                : amount ? this.state.amount : '',
            })
          }
        />
        <StockButton primary icon="search" onClick={() => this.search()} />
        <StockButton
          primary
          icon="plus"
          onClick={() =>
            this.props.createStock({
              reference: this.state.reference,
              brand: this.state.brand,
              size: this.state.size,
              price: parseFloat(this.state.price),
              amount: this.state.amount,
              gender: this.state.gender,
              colors: this.state.colors,
            })
          }
        />
        <StockButton
          primary
          icon="cloud-upload"
          onClick={() => this.openModal()}
        />
      </StockTableHeaderContainer>
    );
  }
}

export default StockTableHeader;
