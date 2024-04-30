import {useState} from 'react';
//import './App.css';
import Breadboard from './components/Breadboard';
import Controls from './components/Controls';

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
  const [elementValue, setElementValue] = useState(options[0])
  return (
    <>
      <Controls elementType={elementType} setElementType={setElementType} elementValue={elementValue}
                setElementValue={setElementValue} options={options}/>
      <Breadboard elementType={elementType} elementValue={elementValue}/>
    </>
  );
}

export default App;
