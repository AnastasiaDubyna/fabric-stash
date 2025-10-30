import type Fabric from "@/interfaces/fabricInterface";
import { useCallback, useRef } from "react";
import React from "react";

interface FabricRollProps {
    fabricData: Fabric,
    transformProp: string,
    shelfId: number,
    rollId: number,
    patternId: string,
    handleRollMouseEnter: (shelfId: number, rollId: number, rect: DOMRect | undefined) => void
    handleRollMouseLeave: () => void
    handleRollClick: (fabricData: Fabric) => void
}

const FabricRoll = React.memo(({
   fabricData,
   transformProp,
   shelfId,
   rollId,
   patternId,
   handleRollMouseEnter,
   handleRollMouseLeave,
   handleRollClick
 }: FabricRollProps) => {
  const ref = useRef<SVGGElement>(null);

  const onMouseEnter = useCallback(() => {
    handleRollMouseEnter(shelfId, rollId, ref.current?.getBoundingClientRect());
  }, [handleRollMouseEnter, shelfId, rollId]);

  const onClick = useCallback(() => {
    handleRollClick(fabricData);
  }, [handleRollClick, fabricData]);

  return (
      <g
          ref={ref}
          id={`roll-${shelfId}-${rollId}`}
          transform={transformProp}
          onMouseEnter={onMouseEnter}
          onMouseLeave={handleRollMouseLeave}
          onClick={onClick}
      >
        <g transform="translate(460.555 23.388)" fill={patternId ? `url(#${patternId})` : "none"} stroke="#707070" strokeWidth="5">
          <rect width="72.986" height="239.069" rx="9" stroke="none"/>
          <rect x="2.5" y="2.5" width="67.986" height="234.069" rx="6.5" fill="none"/>
        </g>
        <g transform="translate(481.514 12.662)" fill="#707070" stroke="#707070" strokeWidth="1">
          <rect width="30" height="11" stroke="none"/>
          <rect x="0.5" y="0.5" width="29" height="10" fill="none"/>
        </g>
        <g transform="translate(482 259.845)" fill="#707070" stroke="#707070" strokeWidth="1">
          <rect width="30" height="11" stroke="none"/>
          <rect x="0.5" y="0.5" width="29" height="10" fill="none"/>
        </g>
      </g>
  );
});

export default FabricRoll;
