import React from 'react';
import styled from 'styled-components';
import {ReactComponent as SymbolLed} from '../assets/SymbolLed.svg';

type ControlsProps = {
  elementType: string,
  setElementType: React.Dispatch<React.SetStateAction<string>>,
  elementValue: string,
  setElementValue: React.Dispatch<React.SetStateAction<string>>,
  options: string[],
  voltage: number,
  setVoltage: React.Dispatch<React.SetStateAction<number>>,
  rows: number,
  setRows: React.Dispatch<React.SetStateAction<number>>,
  cols: number,
  setCols: React.Dispatch<React.SetStateAction<number>>,
}

function Controls({elementType, setElementType, elementValue, setElementValue, options, voltage, setVoltage, rows, setRows, cols, setCols}: ControlsProps) {
  return (
    <ControlsDiv>
    <ElementDiv >
        <Element htmlFor="elementValue" $shouldFocus={elementType === "wire"} onClick={() => setElementType("wire")}>---</Element>
        <Element htmlFor="elementValue" $shouldFocus={elementType === "R"} onClick={() => setElementType("R")}>R</Element>
        <Element htmlFor="elementValue" $shouldFocus={elementType === "LED"} onClick={() => setElementType('LED')}><SymbolLed height={"18px"}/></Element>

      <ElementSelect name="elementValue" id="elementValue" value={elementValue}
              onChange={e => setElementValue(e.target.value)}>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </ElementSelect>
    </ElementDiv>
    <label htmlFor='voltageInput'>Voltage:</label>
    <StyledInput type='number' id={'voltageInput'} value={voltage} min="0" max="100" onChange={e => setVoltage(Number(e.target.value))} />
    <label htmlFor='rowInput'>Rows:</label>
    <StyledInput type='number' id={'rowInput'} value={rows} min={"2"} max={"100"} onChange={e => setRows(Number(e.target.value))} />
    <label htmlFor='colInput'>Cols:</label>
    <StyledInput type={'number'} id={'colInput'} value={cols} min={"2"} max={"250"} onChange={e => setCols(Number(e.target.value))} />
    </ControlsDiv>
  )
}

export default Controls;

const Element = styled.label<{$shouldFocus: boolean}>`
  display: flex;
  border: ${props => props.$shouldFocus ? "2px #38598b solid" : "1px #a2a8d3 solid"};
  border-radius: 3px;
  margin: 6px;
  font-size: 12px;
  height: 22px;
  width: 22px;
  justify-content: center;
  align-items: center;
  background: white;
`

const ElementSelect = styled.select`
  height: 22px;
  margin: 6px;
  border-color: #a2a8d3;
`

const ElementDiv = styled.div`
  display: flex;
  align-items: center;
`

const StyledInput = styled.input`
  width: 3em;
  margin: 6px 6px 6px 3px;
  border: 1px #a2a8d3 solid;
`

const ControlsDiv = styled.div`
  background: #e7eaf6;
  padding: 0 6px;
`