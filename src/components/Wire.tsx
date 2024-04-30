import {ElementProps} from "./elements";

function Wire({start, end, value}: ElementProps) {
  return (
    <>
      <line x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} stroke={value}/>
    </>
  )
}

export default Wire;