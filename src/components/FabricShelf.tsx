import { stackBlocks } from "@/utils/blocks";
import type { Block } from "@/utils/blocks";
import type Fabric from "@/interfaces/fabricInterface";
import React, { useEffect } from "react";
import FabricBlock from "@components/FabricBlock";
import Grid from "@mui/material/Grid";
import { shelfsTransformProps } from "@/const";
import type { RowComponentProps } from "react-window";

const FabricShelf = ({
  fabricListChunks,
  index,
  style
}: RowComponentProps<{
  fabricListChunks: Fabric[][]
}>) => {
  const [patternIDs, setPatternIds] = React.useState<string[]>([]);
  const [fabricData, setFabricData] = React.useState<Fabric[]>([]);

  useEffect(() => {
    setFabricData(fabricListChunks[index]);
  }, []);

  useEffect(() => {
    setPatternIds(fabricData.map((fabric) => fabric.image ? `pattern-${fabric.image.midi}` : "pattern-default"));
  }, [fabricData]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" viewBox="0 0 854 279" style={style}>
      {
        fabricData.map((fabric) => {
          const patternId = fabric.image ? `pattern-${fabric.image.midi}` : "pattern-default";
          return (
            <pattern id={patternId} patternUnits="userSpaceOnUse" width="73" height="240">
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

      <g id="Rectangle_52" data-name="Rectangle 52" fill="none" stroke="#707070" stroke-width="10">
        <rect width="854" height="279" stroke="none"/>
        <rect x="5" y="5" width="844" height="269" fill="none"/>
      </g>
      { //TODO: Change ids 
        shelfsTransformProps[index % 4].map((transformProp, id) => (
          <g id="Group_14" data-name="Group 14" transform={transformProp}>
            <g id="Rectangle_25" data-name="Rectangle 25" transform="translate(460.555 23.388)" fill={patternIDs[id] ? `url(#${patternIDs[id]})` : "none"} stroke="#707070" stroke-width="5">
              <rect width="72.986" height="239.069" rx="9" stroke="none"/>
              <rect x="2.5" y="2.5" width="67.986" height="234.069" rx="6.5" fill="none"/>
            </g>
            <g id="Rectangle_53" data-name="Rectangle 53" transform="translate(481.514 12.662)" fill="#707070" stroke="#707070" stroke-width="1">
              <rect width="30" height="11" stroke="none"/>
              <rect x="0.5" y="0.5" width="29" height="10" fill="none"/>
            </g>
            <g id="Rectangle_54" data-name="Rectangle 54" transform="translate(482 259.845)" fill="#707070" stroke="#707070" stroke-width="1">
              <rect width="30" height="11" stroke="none"/>
              <rect x="0.5" y="0.5" width="29" height="10" fill="none"/>
            </g>
          </g>
          ))
        }
    </svg>

  )
};

export default FabricShelf;
