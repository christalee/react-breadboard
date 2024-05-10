import {ElementProps} from "./types";
import ElementTooltip from './ElementTooltip';
import {useRef} from 'react';

function Wire({start, end, value}: ElementProps) {
  const triggerRef = useRef<SVGLineElement>(null);
  return (
    <>
      <line x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} stroke={value} ref={triggerRef}/>
      <ElementTooltip triggerRef={triggerRef} textArray={[`Wire (${value})`, 'Voltage: ', 'Current: ']}/>
    </>
  )
}

export default Wire;