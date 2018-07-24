/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const Rect = styled.rect`
transition: all 0.5s ease-in-out;
 &:hover {
   fill: rgba(115, 201, 144, .6);
   pointer-events: all;
 }
`;

export default Rect;
