type LedProps = {
  start: number[],
  end: number[],
}

function Led({start, end}: LedProps) {
  return (
    <>
      <line x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} stroke="black"/>
      <circle cx={(start[0] + end[0]) / 2} cy={(start[1] + end[1]) / 2} r="5" stroke="black" fill="red"/>
    </>
  )
}

export default Led;