import type Fabric from "@/interfaces/fabricInterface";
import React from "react";

const FabricRoll = ({
  fabricData,
  rollType
}: {
  fabricData: Fabric,
  rollType: "left" | "right" | "straight" | "horizontal";
}) => {
  const {image} = fabricData;
  const patternId = image ? `pattern-${image.midi}` : "pattern-default";
  const rolls = {
    left: <FabricRollLeft image={image} patternId={patternId} />,
    right: <FabricRollRight image={image} patternId={patternId} />,
    straight: <FabricRollStraight image={image} patternId={patternId} />,
    horizontal: <FabricRollHorizontal image={image} patternId={patternId} />,
  }

  return (
    rolls[rollType]
  );
};

const FabricRollHorizontal = ({
  image,
  patternId
}: {
  image: {
    original: string;
    midi: string;
  } | null,
  patternId: string
}) => {
  return (
    <svg className="w-full h-auto" viewBox="0 0 239.069 71.654">
      <defs>
        <pattern id={patternId} patternUnits="userSpaceOnUse" width="71.654" height="239.069">
          <image
            xlinkHref={
              image
                ? `${import.meta.env.VITE_API_IMAGE_URL_BASE}/${image.midi}`
                : "default-pattern.jpg"
            }
            width="71.654"
            height="239.069"
            preserveAspectRatio="xMidYMid slice" 
          />
        </pattern>
      </defs>
      <g transform="translate(239.069) rotate(90)" stroke="#707070" strokeWidth="5" fill={`url(#${patternId})`}>
        <rect width="71.654" height="239.069" rx="25" stroke="none"/>
        <rect x="2.5" y="2.5" width="66.654" height="234.069" rx="22.5" fill="none"/>
      </g>
    </svg>
  )
};

const FabricRollStraight = ({
  image,
  patternId
}: {
  image: {
    original: string;
    midi: string;
  } | null,
  patternId: string
}) => {
  return (
    <svg className="w-auto h-full" viewBox="0 0 70 239.069">
      <defs>
        <pattern id={patternId} patternUnits="userSpaceOnUse" width="71.654" height="239.069">
          <image
            xlinkHref={
              image
                ? `${import.meta.env.VITE_API_IMAGE_URL_BASE}/${image.midi}`
                : "default-pattern.jpg"
            }
            width="71.654"
            height="239.069"
            preserveAspectRatio="xMidYMid slice" 
          />
        </pattern>
      </defs>
      <g stroke="#707070" strokeWidth="5" fill={`url(#${patternId})`}>
        <rect width="71.654" height="239.069" rx="25" stroke="none"/>
        <rect x="2.5" y="2.5" width="66.654" height="234.069" rx="22.5" fill="none"/>
      </g>
    </svg>
  )
};

const FabricRollRight = ({
  image,
  patternId
}: {
  image: {
    original: string;
    midi: string;
  } | null,
  patternId: string
}) => {
  return (
    <svg className="w-auto h-full" viewBox="0 0 127.361 249.302">
      <defs>
        <pattern id={patternId} patternUnits="userSpaceOnUse" width="71.654" height="239.069">
          <image
            xlinkHref={
              image
                ? `${import.meta.env.VITE_API_IMAGE_URL_BASE}/${image.midi}`
                : "default-pattern.jpg"
            }
            width="71.654"
            height="239.069"
            preserveAspectRatio="xMidYMid slice" 
          />
        </pattern>
      </defs>
      <g transform="translate(57.836) rotate(14)" stroke="#707070" strokeWidth="5" fill={`url(#${patternId})`}>
        <rect width="71.654" height="239.069" rx="25" stroke="none"/>
        <rect x="2.5" y="2.5" width="66.654" height="234.069" rx="22.5" fill="none"/>
      </g>
    </svg>
   
  )
};

const FabricRollLeft = ({
  image,
  patternId
}: {
  image: {
    original: string;
    midi: string;
  } | null,
  patternId: string
}) => {
  return (
    <svg viewBox="0 0 127.361 249.302" className="w-auto h-full" >
      <defs>
        <pattern id={patternId} patternUnits="userSpaceOnUse" width="71.654" height="239.069">
          <image
            xlinkHref={
              image
                ? `${import.meta.env.VITE_API_IMAGE_URL_BASE}/${image.midi}`
                : "default-pattern.jpg"
            }
            width="71.654"
            height="239.069"
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      </defs>

      <g transform="translate(0 17.335) rotate(-14)" stroke="#707070" strokeWidth="5" fill={`url(#${patternId})`} >
        <rect width="71.654" height="239.069" rx="25" stroke="none" />
        <rect x="2.5" y="2.5" width="66.654" height="234.069" rx="22.5" fill="none"/>
      </g>
    </svg>
  )
}

export default FabricRoll;




