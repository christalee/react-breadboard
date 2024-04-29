import styled from 'styled-components';
import React from 'react';

type CellProps = {
  row: number,
  col: number,
  size: number,
  isClicking: boolean,
  setIsClicking: React.Dispatch<React.SetStateAction<boolean>>,
  clickStart: number[],
  setClickStart: React.Dispatch<React.SetStateAction<number[]>>,
  setSvgs: React.Dispatch<React.SetStateAction<{
    component: string,
    start: number[],
    end: number[],
  }[]>>,

}

function getCenter(col: number, row: number, size: number) {
  //  add 2 to WIDTH and HEIGHT to account for border width
  return [col * (size + 2) + (size + 2) / 2, row * (size + 2) + (size + 2) / 2]
}

function Cell({row, col, size, isClicking, setIsClicking, clickStart, setClickStart, setSvgs}: CellProps) {

  const handleMouseDown = () => {
    console.log('mouseDown', col, row);
    !isClicking && setClickStart(getCenter(col, row, size));
    !isClicking && setIsClicking(true);
  }

  const handleMouseUp = () => {
    console.log('mouseUp', col, row);
    const clickEnd = getCenter(col, row, size);
    isClicking && setSvgs(prev => [...prev, {
      component: 'LED',
      start: clickStart,
      end: clickEnd,
    }]);
    isClicking && setIsClicking(false);
  }

  return (
    <StyledCell data-row={row} data-col={col} $size={size} onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}></StyledCell>
  )
}

export default Cell

const StyledCell = styled.div<{ $size?: number; }>`
  border: solid black 1px;
  height: ${props => props.$size}px;
  width: ${props => props.$size}px;           
`