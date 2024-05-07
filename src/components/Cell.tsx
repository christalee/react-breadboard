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
  svgs: {
    component: string,
    value: string,
    start: number[],
    end: number[],
  }[],
  setSvgs: React.Dispatch<React.SetStateAction<{
    component: string,
    value: string,
    start: number[],
    end: number[],
  }[]>>,
  elementType: string,
  elementValue: string,
}

function getCenter(col: number, row: number, size: number) {
  //  add 2 to SIZE to account for border width, plus half again to center
  return [col * (size + 2) + (size + 2) / 2, row * (size + 2) + (size + 2) / 2]
}

function equalArray(a: number[], b: number[]) {
  return a.length === b.length && a.every((element, index) => element === b[index]);
}

function Cell({
                row,
                col,
                size,
                isClicking,
                setIsClicking,
                clickStart,
                setClickStart,
                svgs,
                setSvgs,
                elementType,
                elementValue
              }: CellProps) {
  const center = getCenter(col, row, size);
  const isOccupied: boolean = svgs.filter((svg) => equalArray(svg.start, center) || equalArray(svg.end, center)).length > 0;

  const handleMouseDown = () => {
    !isOccupied && !isClicking && setClickStart(center);
    !isOccupied && !isClicking && setIsClicking(true);
  }

  const handleMouseUp = () => {
    !isOccupied && isClicking && setSvgs(prev => [...prev, {
      component: elementType,
      value: elementValue,
      start: clickStart,
      end: center,
    }]);
    !isOccupied && isClicking && setIsClicking(false);
    isOccupied && setSvgs(prev => prev.filter((svg) => !equalArray(svg.start, center) && !equalArray(svg.end, center)))
  }

  return (
    <StyledCell data-row={row} data-col={col} $row={row} $col={col} $size={size} onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}></StyledCell>
  )
}

export default Cell

const StyledCell = styled.rect.attrs<{ $size: number; $row: number; $col: number; }>(props => ({
  style: {
    x: props.$col * (props.$size + 2),
    y: props.$row * (props.$size + 2),
    height: props.$size + 2,
    width: props.$size + 2,
  },
}))`
  fill: white;
  stroke: grey;
  stroke-opacity: 0.5;
`