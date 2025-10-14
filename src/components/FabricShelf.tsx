import type Fabric from "@/interfaces/fabricInterface";
import React, { memo, useEffect } from "react";
import { shelfsTransformProps } from "@/const";
import type { RowComponentProps } from "react-window";
import FabricRoll from "./FabricRoll";

const FabricShelf = memo(({
  fabricListChunks,
  index,
  style,
  handleRollMouseEnter,
  handleRollMouseLeave,
  handleRollClick
}: RowComponentProps<{
  fabricListChunks: Fabric[][],
  handleRollMouseEnter: (shelfId: number, rollId: number, rect: DOMRect | undefined) => void
  handleRollMouseLeave: () => void
  handleRollClick: (fabricData: Fabric) => void
}>) => {
  const [patternIDs, setPatternIds] = React.useState<string[]>([]);
  const [fabricData, setFabricData] = React.useState<Fabric[]>([]);

  // console.log(fabricListChunks, index, style, handleRollMouseEnter, handleRollMouseLeave, handleRollClick)

  useEffect(() => {
    setFabricData(fabricListChunks[index]);
  }, []);

  useEffect(() => {
    setPatternIds(fabricData ? fabricData.map((fabric) => fabric.image ? `pattern-${fabric.image.midi}` : "pattern-default") : []);
  }, [fabricData]);

  // console.log(fabricListChunks);
  console.log("fabric shelf is rerendered");
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" viewBox="0 0 854 279" style={style}>
      {
        fabricData && fabricData.map((fabric, id) => {
          const patternId = fabric.image ? `pattern-${fabric.image.midi}` : "pattern-default";
          return (
            <pattern key={`pattern-${patternId}-${id}`} id={patternId} patternUnits="userSpaceOnUse" width="73" height="240">
              <image
                xlinkHref={
                  fabric.image
                  ? `${import.meta.env.VITE_API_IMAGE_URL_BASE}/${fabric.image.midi}`
                  : "default-pattern.jpg"
                  }
                width="73"
                height="240"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          )
        })
      }
      <g id={`shelf-${index}`} fill="none" stroke="#707070" strokeWidth="10">
        <rect width="854" height="279" stroke="none"/>
        <rect x="5" y="5" width="844" height="269" fill="none"/>
      </g>
      {
        shelfsTransformProps[index % 4].map((transformProp, id) => {
          // console.log(fabricListChunks, index, id);
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
