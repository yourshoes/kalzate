import styled from 'styled-components';

export const Tooltip = styled.span`
    transition: all 0.5s ease-in-out;
    font-size: 9px;
    color: ${(props) => props.theme && props.theme.discover.tooltipColor ? props.theme.discover.tooltipColor : 'rgba(115, 201, 144, .6)'};
    text-align: right;
`;

export default Tooltip;
