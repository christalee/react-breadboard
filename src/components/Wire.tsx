import {ElementProps} from "./elements";
import ElementTooltip from './ElementTooltip';
import {createRef} from 'react';

function Wire({start, end, value}: ElementProps) {
  const triggerRef = createRef<SVGLineElement>();
  return (
    <>
      <line x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} stroke={value} ref={triggerRef}/>
      <ElementTooltip triggerRef={triggerRef} textArray={[`LED (${value})`, 'Voltage: ', 'Current: ']}/>
    </>
  )
}

export default Wire;