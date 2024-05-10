import {useState, useEffect} from 'react';
//import './App.css';
import Breadboard from './components/Breadboard';
import Controls from './components/Controls';
import styled from 'styled-components';

function getElementSelectValues(elementType: string) {
  switch (elementType) {
    case "LED":
    case "wire":
      return ['red', 'green', 'yellow', 'black'];
    case "R":
      return ['100Ω', '1KΩ', '10KΩ', '100KΩ'];
    default:
      return ['']
  }
}

function App() {
  const [elementType, setElementType] = useState('wire')
  const options = getElementSelectValues(elementType);
  // declare this specifically so useEffect doesn't fire too often
  // (b/c arrays compare by reference while strings compare by value)
  const firstOption = options[0]
  const [elementValue, setElementValue] = useState('')
  useEffect(() => {
    setElementValue(firstOption);
  }, [firstOption])
  const [voltage, setVoltage] = useState(5);
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(30);
  return (
    <Container>
      <Controls elementType={elementType} setElementType={setElementType} elementValue={elementValue}
                setElementValue={setElementValue} options={options} voltage={voltage} setVoltage={setVoltage} rows={rows} setRows={setRows} cols={cols} setCols={setCols}/>
      <Breadboard elementType={elementType} elementValue={elementValue} rows={rows} cols={cols}/>
    </Container>
  );
}

export default App;

const Container = styled.div`
  margin: 12px;
  padding: 12px;
  border: 2px #a2a8d3 solid;
  border-radius: 6px;
  background: #e7eaf6;
`