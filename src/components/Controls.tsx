import React from 'react';
import {ReactComponent as SymbolLed} from '../assets/SymbolLed.svg';

type ControlsProps = {
  elementType: string,
  setElementType: React.Dispatch<React.SetStateAction<string>>,
  elementValue: string,
  setElementValue: React.Dispatch<React.SetStateAction<string>>,
  options: string[],
}

function Controls({elementType, setElementType, elementValue, setElementValue, options}: ControlsProps) {
  return (
    <>
      <button onClick={() => setElementType("wire")}>---</button>
      <button onClick={() => setElementType("R")}>R</button>
      <button onClick={() => setElementType('LED')}><SymbolLed/></button>
      <select name="elementValue" id="elementValue" value={elementValue}
              onChange={e => setElementValue(e.target.value)}>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </>
  )
}

export default Controls;