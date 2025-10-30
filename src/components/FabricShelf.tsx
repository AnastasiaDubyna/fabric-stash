import type Fabric from "@/interfaces/fabricInterface";
import {memo, useMemo} from "react";
import { shelfsTransformProps } from "@/const";
import type { RowComponentProps } from "react-window";
import FabricRoll from "./FabricRoll";

type FabricShelfProps =  RowComponentProps<{
    fabricListChunks: Fabric[][],
    handleRollMouseEnter: (shelfId: number, rollId: number, rect: DOMRect | undefined) => void
    handleRollMouseLeave: () => void
    handleRollClick: (fabricData: Fabric) => void
}>;

const FabricShelf = memo(({
    fabricListChunks,
    index,
    style,
    handleRollMouseEnter,
    handleRollMouseLeave,
    handleRollClick
  }: FabricShelfProps) => {

    const fabricData = useMemo(() =>
            fabricListChunks[index] || [],
        [fabricListChunks, index]
    );

    const patternIDs = useMemo(() =>
          fabricData.map((fabric) =>
              fabric.image ? `pattern-${fabric.image.midi}` : "pattern-default"
          ),
      [fabricData]
    );

  return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" viewBox="0 0 854 279" style={style}>
        <g id={`shelf-${index}`} fill="none" stroke="#707070" strokeWidth="10">
          <rect width="854" height="279" stroke="none"/>
          <rect x="5" y="5" width="844" height="269" fill="none"/>
        </g>
        {
          shelfsTransformProps[index % 4].map((transformProp, id) => {
            return <FabricRoll
                key={`roll-${index}-${id}`}
                fabricData={fabricListChunks[index][id]}
                transformProp={transformProp}
                shelfId={index}
                rollId={id}
                patternId={patternIDs[id]}
                handleRollMouseEnter={handleRollMouseEnter}
                handleRollMouseLeave={handleRollMouseLeave}
                handleRollClick={handleRollClick}
            />
          })
        }
      </svg>
  )
});

export default FabricShelf;
