import {ElementProps} from "./elements";

function Resistor({start, end, value}: ElementProps) {
  // Math.atan2 is not atan^2 but an alternative atan fn that works when x < 0
  // it gives results in radians as rotation counterclockwise from the positive x axis
  // so we need to convert to degrees and subtract 180 to get the clockwise SVG rotation
  const angle = (Math.atan2((start[1] - end[1]), (start[0] - end[0])) * 180 / Math.PI) - 180;
  // The original SVG is 60px long
  const scale = Math.sqrt((start[0] - end[0]) ** 2 + (start[1] - end[1]) ** 2) / 60;
  return (
    <path d="M 0 0
    l15 0
    l2.5 -5
    l5 10
    l5 -10
    l5 10
    l5 -10
    l5 10
    l2.5 -5
    l15 0" stroke="black" strokeWidth="1" strokeLinejoin="bevel" fill="none"
          transform={`rotate(${angle}, ${start[0]}, ${start[1]}) translate(${start[0]}, ${start[1]}) scale(${scale}, 1)`}></path>
  );
}

export default Resistor;