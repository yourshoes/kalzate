/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import Octicon from 'react-octicon';
import SearchContainer from '../atoms/SearchContainer';
import {
  MatchesListContainer,
  MatchesList,
  MatchesListItem,
} from '../atoms/MatchesListContainer';
import InteractiveField from './InteractiveField';

export class TicketSearchField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.ticket.created_at,
      matchIndex: 0,
      matchesVisible: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ticket.created_at != nextProps.ticket.created_at) {
      this.setState({ value: nextProps.ticket.created_at });
    }
  }

  getMatches(created_at) {
    if (!created_at) return;
    this.props.getMatches('created_at', created_at);
  }

  shouldDisplayMatches() {
    console.log(this.state, this.props.matches, this.state.matchesVisible &&
      this.state.value &&
      !!this.state.value.length &&
      this.props.matches &&
      this.props.matches.length > 1 &&
      this.props.matches.every(
        (match) =>
          String(match).startsWith(this.state.value) &&
          String(match) !== this.state.value
      ));
    return (
      this.state.matchesVisible &&
      !!this.state.value &&
      !!this.state.value.length &&
      this.props.matches &&
      this.props.matches.length > 1 &&
      this.props.matches.every(
        (match) =>
          String(match).startsWith(this.state.value) &&
          String(match) !== this.state.value
      )
    );
  }

  render() {
    console.log(this.props.matches);
    return (
      <SearchContainer>
        {this.shouldDisplayMatches() && (
          <MatchesListContainer>
            <MatchesList>
              {this.props.matches.map((match, i) => (
                <MatchesListItem
                  key={i}
                  onClick={() =>
                    this.setState({ value: match, matchIndex: 0 })
                  }
                  selected={this.state.matchIndex === i}
                >
                  {match}
                </MatchesListItem>
              ))}
            </MatchesList>
          </MatchesListContainer>
        )}
        <Octicon name="search" />
        <InteractiveField
          placeholder="Ticket ID"
          readonly={false}
          value={this.state.value}
          onChange={(value) =>
            this.setState({ value, matchIndex: 0, matchesVisible: true }, () => this.getMatches(value))}
          onMoveUp={() =>
            this.setState({
              matchIndex:
                (this.state.matchIndex > 0
                  ? this.state.matchIndex - 1
                  : this.props.matches.length - 1) %
                this.props.matches.length,
            })
          }
          onMoveDown={() =>
            this.setState({
              matchIndex:
                (this.state.matchIndex + 1) % this.props.matches.length,
            })
          }
          onEscape={() => this.setState({ matchesVisible: false })}
          onEnter={() =>
            this.setState({
              value: this.shouldDisplayMatches()
                ? this.props.matches[this.state.matchIndex]
                : this.state.value,
            }, () => !!this.state.value && this.props.loadTicket({ created_at: this.state.value }, { fetch: true }))
          }

        />
      </SearchContainer>
    );
  }
}

TicketSearchField.propTypes = {};

export default TicketSearchField;
