import styled from 'styled-components';

const ToolRect = styled.rect`
  x: 2;
  y: 2;
  width: 100px;
  height: 50px;
  rx: 5;
  ry: 5;
  fill: grey;
  fill-opacity: 0.5;
  stroke: black;
`

const ToolText = styled.text<{ $fontSize: number }>`
  font-size: ${props => props.$fontSize}px;
  fill: black;
`

export {ToolRect, ToolText};