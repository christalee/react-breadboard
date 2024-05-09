import {useState} from 'react';
import Cell from './Cell';
import Led from './Led';
import Resistor from './Resistor';
import Wire from './Wire';

const SIZE: number = 10;
const GUTTER: number = 5;
// First two rows are below no gutters
// Middle rows are below one 5px gutter
// Bottom two rows are below two 5px gutters
const topOffset = GUTTER * 0;
const centerOffset = GUTTER * 1;
const bottomOffset = GUTTER * 2;

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
  const width = cols * (SIZE + 2);
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
        <svg y={topOffset}>{COLUMNS.map((c, i_c) => <Cell key={`0x${i_c}`} row={0} col={i_c} size={SIZE} offset={topOffset}
        isClicking={isClicking}
        setIsClicking={setIsClicking}
        clickStart={clickStart}
        setClickStart={setClickStart}
        svgs={svgs}
        setSvgs={setSvgs}
        elementType={elementType}
        elementValue={elementValue} />)}</svg>
        <svg y={topOffset}>{COLUMNS.map((c, i_c) => <Cell key={`1x${i_c}`} row={1} col={i_c} size={SIZE} offset ={topOffset}
          isClicking={isClicking}
          setIsClicking={setIsClicking}
          clickStart={clickStart}
          setClickStart={setClickStart}
          svgs={svgs}
          setSvgs={setSvgs}
          elementType={elementType}
          elementValue={elementValue} />)}</svg>
        <rect width={width} height="5px" stroke="#113f67" fill="white" x="0" y={(SIZE + 2) * 2}/>
        {
          ROWS.map((r, i_r) => <svg key={i_r + 2} y={centerOffset}>{COLUMNS.map((c, i_c) => <Cell key={`${i_r + 2}x${i_c}`} row={i_r + 2} col={i_c}
                                                                             size={SIZE}
                                                                             offset={centerOffset}
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
        <rect width={width} height="5px" stroke="#113f67" fill="white" x="0" y={(SIZE + 2) * (2 + rows) + 5}/>
        <svg y={bottomOffset}>{COLUMNS.map((c, i_c) => <Cell key={`${rows + 2}x${i_c}`} row={rows + 2} col={i_c} size={SIZE} offset={bottomOffset}
          isClicking={isClicking}
          setIsClicking={setIsClicking}
          clickStart={clickStart}
          setClickStart={setClickStart}
          svgs={svgs}
          setSvgs={setSvgs}
          elementType={elementType}
          elementValue={elementValue} />)}</svg>
        <svg y={bottomOffset}>{COLUMNS.map((c, i_c) => <Cell key={`${rows + 3}x${i_c}`} row={rows + 3} col={i_c} size={SIZE} offset={bottomOffset}
          isClicking={isClicking}
          setIsClicking={setIsClicking}
          clickStart={clickStart}
          setClickStart={setClickStart}
          svgs={svgs}
          setSvgs={setSvgs}
          elementType={elementType}
          elementValue={elementValue} />)}</svg>
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