import styled from 'styled-components';

export const Divider = styled.div`
  position: relative;
  margin-bottom: 15px;
  height: 1px;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 5%;
    right: 5%;
    width: 90%;
    height: 2px;
    background-image: linear-gradient(
      to right,
      transparent,
      rgb(115, 201, 144),
      transparent
    );
  }
  &:after {
    content: '';
    position: absolute;
    z-index: 1;
    top: -7px;
    left: calc(50% - 4px);
    width: 14px;
    height: 14px;
    transform: rotate(45deg);
    background-color: rgb(115, 201, 144);
    border-bottom: 1px solid rgb(115, 201, 144);
    border-right: 1px solid rgb(115, 201, 144);
  }
`;

export default Divider;
