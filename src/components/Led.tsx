import {ElementProps} from './elements';

function Led({start, end, value}: ElementProps) {
  const center = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2]
  // Draw an equilateral triangle with side 12
  const point1 = [center[0] + 4 * Math.sqrt(3), center[1]]
  const point2 = [center[0] - 2 * Math.sqrt(3), center[1] - 6]
  const point3 = [center[0] - 2 * Math.sqrt(3), center[1] + 6]
  // Math.atan2 is not atan^2 but an alternative atan fn that works when x < 0
  // it gives results in radians as rotation counterclockwise from the positive x axis
  // so we need to convert to degrees and subtract 180 to get the clockwise SVG rotation
  const angle = (Math.atan2((start[1] - end[1]), (start[0] - end[0])) * 180 / Math.PI) - 180;
  return (
    <>
      <line x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} stroke="black"/>
      <polygon points={`${point1[0]},${point1[1]} ${point2[0]},${point2[1]} ${point3[0]},${point3[1]}`} stroke="black"
               fill={value} transform={`rotate(${angle}, ${center[0]}, ${center[1]})`}/>
    </>
  )
}

export default Led;