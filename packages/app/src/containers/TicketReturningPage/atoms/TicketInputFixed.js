/**
 *
 * App Wrappers
 */

/* System imports */
import SearchInput from './SearchInput';

export const TicketInput = SearchInput.extend`
  width: 100%;
  height: 100%;
  margin: 0;
  margin-left: 10px;
  padding-top: 10px;
  padding-right: 10px;

  &::placeholder {
    opacity: 1;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  &::placeholder + * {
    font-size: 1.7em;
    opacity: 0.5;
    top: 0.35em;
  }
  &:focus {
    outline: none;
    border-color: rgba(0, 0, 0, 0.5);
  }
`;

export default TicketInput;
