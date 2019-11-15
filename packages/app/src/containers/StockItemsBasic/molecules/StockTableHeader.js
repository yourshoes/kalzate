import React from 'react';
import { isEmpty } from 'lodash';
import PubSub from 'utils/pubsub';
import StockField from './StockField';
import InteractiveStockField from './InteractiveStockField';
import StockButton from './StockButton';
import StockModal from './StockModal';
import StockTableHeaderContainer from '../atoms/StockTableHeaderContainer';
import messages from '../messages';
import { MatchesListContainer, MatchesList, MatchesListItem } from '../atoms/MatchesListContainer';
import { stock } from '@kalzate/cy';

const isNumeric = (number) => /^[1-9][0-9]*$/.test(number);
const isRealNumeric = function(input) {
  return /^[1-9][0-9]*\.?[0-9]{0,2}$/.test(input);
};

const requiredFields = ['reference', 'price', 'amount'];

export class StockTableHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      unValid: false,
      reference: '',
      brand: '',
      desc: '',
      price: '',
      amount: '',
      matchIndex: 0,
      matchesVisible: false,
    };
    this.validateStockForm = this.validateStockForm.bind(this);
    this.requiredFields = this.requiredFields.bind(this);
  }
  // @todo optimize by moving regex outside function to reuse
  search() {
    const $or = [
      ['reference', this.state.reference, (v) => ({ $regex: new RegExp(v, 'gi') })],
      ['brand', this.state.brand, (v) => ({ $eq: v })],
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
      ['desc', this.state.desc, (v) => ({ $eq: v })],
    ]
      .filter((x) => !isEmpty(x[1]))
      .map((x) => ({ [x[0]]: x[2](x[1]) }));

    this.props.searchStock($or.length ? { $or } : {}, this.props.limit, this.props.skip);
  }

  openModal() {
    PubSub.publish(PubSub.topics.MODAL_OPENED, StockModal);
  }

  getMatches(reference) {
    if (!reference) return;
    this.props.getMatches('reference', reference);
  }

  shouldDisplayMatches() {
    return (
      this.state.matchesVisible &&
      this.state.reference &&
      !!this.state.reference.length &&
      this.props.matches &&
      this.props.matches.length > 1 &&
      this.props.matches.every(
        (match) => match.startsWith(this.state.reference) && match !== this.state.reference
      )
    );
  }
  validateStockForm(fieldsValue) {
    const unValid = !this.requiredFields(fieldsValue);
    this.setState({ unValid });
    return !unValid;
  }
  requiredFields(fieldsValue) {
    return requiredFields.every((field) => fieldsValue[field]);
  }

  render() {
    const fieldsValue = {
      reference: this.state.reference,
      brand: this.state.brand,
      price: parseFloat(this.state.price),
      amount: this.state.amount,
      desc: this.state.desc,
    };
    return (
      <section>
        {this.shouldDisplayMatches() && (
          <MatchesListContainer>
            <MatchesList>
              {this.props.matches.map((match, i) => (
                <MatchesListItem
                  onClick={() => this.setState({ reference: match, matchIndex: 0 })}
                  selected={this.state.matchIndex === i}
                >
                  {match}
                </MatchesListItem>
              ))}
            </MatchesList>
          </MatchesListContainer>
        )}
        <StockTableHeaderContainer data-cy={stock.CONTAINER} content unValid={this.state.unValid}>
          <InteractiveStockField
            required={requiredFields.indexOf('reference') !== -1}
            placeholder={this.props.intl.formatMessage(messages.reference)}
            value={this.state.reference}
            onChange={(reference) =>
              this.setState({ reference, matchIndex: 0, matchesVisible: true }, () =>
                this.getMatches(reference)
              )
            }
            onMoveUp={() =>
              this.setState({
                matchIndex:
                  (this.state.matchIndex > 0
                    ? this.state.matchIndex - 1
                    : this.props.matches.length - 1) % this.props.matches.length,
              })
            }
            onMoveDown={() =>
              this.setState({
                matchIndex: (this.state.matchIndex + 1) % this.props.matches.length,
              })
            }
            onEscape={() => this.setState({ matchesVisible: false })}
            onEnter={() =>
              this.setState({
                reference: this.shouldDisplayMatches()
                  ? this.props.matches[this.state.matchIndex]
                  : this.state.reference,
              })
            }
            data-cy={stock.FIELD_REFERENCE}
          />
          <StockField
            placeholder={this.props.intl.formatMessage(messages.brand)}
            value={this.state.brand}
            onChange={(brand) => this.setState({ brand })}
            data-cy={stock.FIELD_BRAND}
          />
          <StockField
            placeholder={this.props.intl.formatMessage(messages.desc)}
            value={this.state.desc}
            onChange={(desc) => this.setState({ desc })}
            size="30"
            data-cy={stock.FIELD_DESCRIPTION}
          />
          <StockField
            required={requiredFields.indexOf('price') !== -1}
            placeholder={this.props.intl.formatMessage(messages.price)}
            value={this.state.price}
            onChange={(price) =>
              this.setState({
                price: isRealNumeric(price) ? price : price ? this.state.price : '',
              })
            }
            data-cy={stock.FIELD_PRICE}
          />
          <StockField
            required={requiredFields.indexOf('amount') !== -1}
            placeholder={this.props.intl.formatMessage(messages.amount)}
            value={this.state.amount}
            onChange={(amount) =>
              this.setState({
                amount: isNumeric(amount) ? parseInt(amount, 10) : amount ? this.state.amount : '',
              })
            }
            data-cy={stock.FIELD_AMOUNT}
          />
          <StockButton primary icon="search" onClick={() => this.search()} />
          <StockButton
            primary
            icon="plus"
            data-cy={stock.ADD_ITEM}
            onClick={() =>
              this.validateStockForm(fieldsValue) && this.props.createStock(fieldsValue)
            }
          />
          <StockButton primary icon="cloud-upload" onClick={() => this.openModal()} />
        </StockTableHeaderContainer>
      </section>
    );
  }
}

export default StockTableHeader;
