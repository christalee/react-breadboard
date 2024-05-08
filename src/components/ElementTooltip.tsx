import {Tooltip} from 'react-svg-tooltip';
import {ToolRect, ToolText} from './styles';
import {RefObject} from 'react';

type ElementTooltipTypes = {
  triggerRef: RefObject<SVGElement>,
  fontSize?: number,
  textArray: string[],
}

function ElementTooltip({triggerRef, fontSize = 12, textArray}: ElementTooltipTypes) {
  return (
    <Tooltip triggerRef={triggerRef}>
      <ToolRect/>
      {textArray.map((text, i) => <ToolText key={`${i}_${text}`} x={20} y={20 + i * fontSize}
                                            $fontSize={fontSize}>{text}
      </ToolText>)}
    </Tooltip>
  )
}

export default ElementTooltip;