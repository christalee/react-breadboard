import {useState} from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import Led from './Led';

const NUM_ROWS = 25
const NUM_COLS = 30
const ROWS: number[] = Array(NUM_ROWS).fill(0);
const COLUMNS: number[] = Array(NUM_COLS).fill(0);
const SIZE: number = 10;

type svgsProps = {
  component: string,
  start: number[],
  end: number[],
}[]

type clickStartProps = number[]

function Breadboard() {
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
        {svgs.map(obj => obj.component === 'LED' &&
          <Led key={`${obj.start}_${obj.end}`} start={obj.start} end={obj.end}/>)}
      </svg>
      {
        ROWS.map((r, i_r) => <Row key={i_r}>{COLUMNS.map((c, i_c) => <Cell key={`${i_r}x${i_c}`} row={i_r} col={i_c}
                                                                           isClicking={isClicking}
                                                                           setIsClicking={setIsClicking}
                                                                           clickStart={clickStart}
                                                                           setClickStart={setClickStart}
                                                                           setSvgs={setSvgs}
                                                                           size={SIZE}/>)}</Row>)
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