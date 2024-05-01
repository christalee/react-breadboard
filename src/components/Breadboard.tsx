import {useState} from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import Led from './Led';
import Resistor from './Resistor';
import Wire from './Wire';

const NUM_ROWS = 25
const NUM_COLS = 30
const ROWS: number[] = Array(NUM_ROWS).fill(0);
const COLUMNS: number[] = Array(NUM_COLS).fill(0);
const SIZE: number = 10;

type BreadboardProps = {
  elementType: string,
  elementValue: string,
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

function Breadboard({elementType, elementValue}: BreadboardProps) {
  const [svgs, setSvgs] = useState<svgsProps | never[]>([])
  const [isClicking, setIsClicking] = useState(false);
  const [clickStart, setClickStart] = useState<clickStartProps | never[]>([])

  return (
    <Overlay>
      <svg xmlns="http://www.w3.org/2000/svg"
           width={NUM_COLS * (SIZE + 2)}
           height={NUM_ROWS * (SIZE + 2)}
           fill="black"
           viewBox={`0 0 ${NUM_COLS * (SIZE + 2)} ${NUM_ROWS * (SIZE + 2)}`}>
        {svgs.map(obj => {
          const Component = selectComponent(obj.component);
          return (
            <Component key={`${obj.start}_${obj.end}`} value={obj.value} start={obj.start} end={obj.end}/>)
        })}
      </svg>
      {
        ROWS.map((r, i_r) => <Row key={i_r}>{COLUMNS.map((c, i_c) => <Cell key={`${i_r}x${i_c}`} row={i_r} col={i_c}
                                                                           size={SIZE}
                                                                           isClicking={isClicking}
                                                                           setIsClicking={setIsClicking}
                                                                           clickStart={clickStart}
                                                                           setClickStart={setClickStart}
                                                                           svgs={svgs}
                                                                           setSvgs={setSvgs}
                                                                           elementType={elementType}
                                                                           elementValue={elementValue}
        />)}</Row>)
      }
    </Overlay>
  )
}

export default Breadboard;

const Row = styled.div`
  display: flex;
`

const Overlay = styled.div`
  position: relative;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
`