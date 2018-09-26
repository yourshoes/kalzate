import styled from 'styled-components';

const leftSelector = () => '100';
const topSelector = () => '20';
const opacitySelector = ({ visible }) => visible ? '.9' : '0';

export const Tooltip = styled.div`
    transition: all 0.5s ease-in-out;
    position: absolute;
    text-align: center;
    padding: 10px;
    font: 12px sans-serif;
    background: rgba(115, 201, 144, .6);
    border: 0px;
    border-radius: 8px;
    pointer-events: none;
    top: ${topSelector}px;
    left: ${leftSelector}px;
    opacity: ${opacitySelector};
    z-index: 10000;
`;

export default Tooltip;
