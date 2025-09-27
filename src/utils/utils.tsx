import { shelfsTransformProps, shelfTemplatesCount } from "@/const";
import type Fabric from "@/interfaces/fabricInterface";

const shelfCapacities = shelfsTransformProps.map(shelf => shelf.length);

export const countShelves = (totalRolls: number): number => {
  let shelfCount = 0;
  let i = 0;

  while (totalRolls > 0) {
    const capacity = shelfCapacities[i % shelfCapacities.length];
    totalRolls -= capacity;
    shelfCount++;
    i++;
  }

  return shelfCount;
};

export const countShelfsPerViewport = (height: number, width: number) => {
  const rowHeight = (width / 2) * (279 / 854) - 5;
  return Math.ceil(height / rowHeight);
}

export const getFabricCountInRange = (shelfStartIndex: number, shelfStopIndex: number) => {
  let result = 0;
  for (let i = shelfStartIndex; i <= shelfStopIndex; i++) {
    const currShelfCapacity: number = shelfsTransformProps[i % shelfTemplatesCount].length;
    result += currShelfCapacity;
    // console.log(currShelfCapacity, i, result);
  };
  return result;
};

export const splitFabricListIntoShelfs = (fabricsList: Fabric[]): Fabric[][] => {
    const result: Fabric[][] = [];
    let fabricsTotal = fabricsList.length;
    let shelfIndex = 0;
    let chunckStart = 0;
    let currShelfCapacity = shelfCapacities[shelfIndex % shelfTemplatesCount];
    
    while (fabricsTotal > 0) {
      result.push(fabricsList.slice(chunckStart, chunckStart + currShelfCapacity));
      shelfIndex++
      fabricsTotal -= currShelfCapacity;
      chunckStart += currShelfCapacity;
      currShelfCapacity = shelfCapacities[shelfIndex % shelfTemplatesCount];
    };

    return result;
};