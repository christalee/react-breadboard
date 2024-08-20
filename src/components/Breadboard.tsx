import {useState} from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import Led from './Led';
import Resistor from './Resistor';
import Wire from './Wire';

const SIZE: number = 10;
const GUTTER: number = 5;
// First two rows are below no gutters
// Middle rows are below one 5px gutter
// Bottom two rows are below two 5px gutters
const topOffset = 0;
const centerOffset = GUTTER;
const bottomOffset = GUTTER * 2;
const xOffset = 10;

type BreadboardProps = {
  elementType: string,
  elementValue: string,
  rows: number,
  cols: number,
}

type svgsProps = {
  component: string,
  value: string,
  start: number[],
  end: number[],
}[]

type clickStartProps = number[]

function selectComponent(component: string) {
  switch (component) {
    case 'LED':
      return Led;
    case 'R':
      return Resistor;
    case 'wire':
      return Wire;
    default:
      return Led;
  }
}

function Breadboard({elementType, elementValue, rows, cols}: BreadboardProps) {
  const ROWS: number[] = Array(rows).fill(0);
  const COLUMNS: number[] = Array(cols).fill(0);
  const width = cols * (SIZE + 2) + xOffset;
//  rows refers to the main body of the breadboard, so add 4 to account for 2 top and 2 bottom rails
  const height = (rows + 4) * (SIZE + 2) + bottomOffset;
  const [svgs, setSvgs] = useState<svgsProps | never[]>([])
  const [isClicking, setIsClicking] = useState(false);
  const [clickStart, setClickStart] = useState<clickStartProps | never[]>([])

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg"
           width={width}
           height={height}
           fill="black"
           viewBox={`0 0 ${width} ${height}`}>
        {/* Top V+ rail */}
        <BBText y={SIZE + 2 - 1.5}>+</BBText>
        <svg x={xOffset} y={topOffset}>{COLUMNS.map((c, i_c) => <Cell key={`0x${i_c}`} row={0} col={i_c} size={SIZE}
                                                                      yOffset={topOffset}
                                                                      isClicking={isClicking}
                                                                      setIsClicking={setIsClicking}
                                                                      clickStart={clickStart}
                                                                      setClickStart={setClickStart}
                                                                      svgs={svgs}
                                                                      setSvgs={setSvgs}
                                                                      elementType={elementType}
                                                                      elementValue={elementValue}/>)}</svg>
        {/* Top V- (ground) rail */}
        <BBText y={(SIZE + 2) * 2} fontSize={"20px"}>-</BBText>
        <svg x={xOffset} y={topOffset}>{COLUMNS.map((c, i_c) => <Cell key={`1x${i_c}`} row={1} col={i_c} size={SIZE}
                                                                      yOffset={topOffset}
                                                                      isClicking={isClicking}
                                                                      setIsClicking={setIsClicking}
                                                                      clickStart={clickStart}
                                                                      setClickStart={setClickStart}
                                                                      svgs={svgs}
                                                                      setSvgs={setSvgs}
                                                                      elementType={elementType}
                                                                      elementValue={elementValue}/>)}</svg>
        {/* Top gutter */}
        <rect width={width - xOffset} height="5px" stroke="#113f67" fill="white" x={xOffset} y={(SIZE + 2) * 2}/>

        {/* Main breadboard area */}
        {
          ROWS.map((r, i_r) => <svg key={i_r + 2} x={xOffset} y={centerOffset}>{COLUMNS.map((c, i_c) => <Cell
            key={`${i_r + 2}x${i_c}`} row={i_r + 2} col={i_c}
            size={SIZE}
            yOffset={centerOffset}
            isClicking={isClicking}
            setIsClicking={setIsClicking}
            clickStart={clickStart}
            setClickStart={setClickStart}
            svgs={svgs}
            setSvgs={setSvgs}
            elementType={elementType}
            elementValue={elementValue}
          />)}</svg>)
        }
        {/* Bottom gutter */}
        <rect width={width - xOffset} height="5px" stroke="#113f67" fill="white" x={xOffset}
              y={(SIZE + 2) * (2 + rows) + 5}/>
        {/* Bottom V- (ground) rail */}
        <BBText y={(SIZE + 2) * (rows + 3) + bottomOffset} fontSize={"20px"}>-</BBText>
        <svg x={xOffset} y={bottomOffset}>{COLUMNS.map((c, i_c) => <Cell key={`${rows + 2}x${i_c}`} row={rows + 2}
                                                                         col={i_c} size={SIZE} yOffset={bottomOffset}
                                                                         isClicking={isClicking}
                                                                         setIsClicking={setIsClicking}
                                                                         clickStart={clickStart}
                                                                         setClickStart={setClickStart}
                                                                         svgs={svgs}
                                                                         setSvgs={setSvgs}
                                                                         elementType={elementType}
                                                                         elementValue={elementValue}/>)}</svg>
        {/* Bottom V+ rail */}
        <BBText y={(SIZE + 2) * (rows + 4) + bottomOffset - 1.5}>+</BBText>
        <svg x={xOffset} y={bottomOffset}>{COLUMNS.map((c, i_c) => <Cell key={`${rows + 3}x${i_c}`} row={rows + 3}
                                                                         col={i_c} size={SIZE} yOffset={bottomOffset}
                                                                         isClicking={isClicking}
                                                                         setIsClicking={setIsClicking}
                                                                         clickStart={clickStart}
                                                                         setClickStart={setClickStart}
                                                                         svgs={svgs}
                                                                         setSvgs={setSvgs}
                                                                         elementType={elementType}
                                                                         elementValue={elementValue}/>)}</svg>
        {/* Circuit elements */}
        {svgs.map(obj => {
          const Component = selectComponent(obj.component);
          return (
            <Component key={`${obj.start}_${obj.end}`} value={obj.value} start={obj.start} end={obj.end}/>)
        })}
      </svg>
    </div>
  )
}

export default Breadboard;

const BBText = styled.text`
  fill: #38598b;
`;