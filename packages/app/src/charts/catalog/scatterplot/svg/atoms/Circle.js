/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const Circle = styled.circle`
transition: all 0.5s ease-in-out;
 &:hover {
   fill: rgba(115, 201, 144, .6);
   pointer-events: all;
 }
 opacity: 0.75;
`;

export default Circle;
