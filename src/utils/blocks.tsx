export type FabricBlockType = "left" | "right" | "straight" | "horizontal"; //CHANGE TO ENUM
export type Block = {
  size: number,
  type: FabricBlockType, 
  rollsAmount: number
};

//grid has 9 columns 
// 3: left, right, horizontalx3, horizontalx2
// 2: left, right, straight
// 1: straight 
// Rules: only one vertical type per shelf
export const blocks: Block[] = [
  { size: 3, type: "left", rollsAmount: 3 },
  { size: 3, type: "right", rollsAmount: 3 },
  { size: 3, type: "horizontal", rollsAmount: 3 },
  { size: 3, type: "horizontal", rollsAmount: 2 },
  { size: 2, type: "left", rollsAmount: 2 },
  { size: 2, type: "right", rollsAmount: 2 },
  { size: 2, type: "straight", rollsAmount: 2 },
  { size: 1, type: "straight", rollsAmount: 1 }
];

const isOnlyOneInstanceAllowed = (type: FabricBlockType) => type === "left" || type === "right" || type === "straight";

const isAllowed = (block: Block, columnsLeft: number, typesUsed: FabricBlockType[]) => {
  if (block.size > columnsLeft) return false;
  if (isOnlyOneInstanceAllowed(block.type) && typesUsed.includes(block.type)) return false; 
  return true;
};

export const stackBlocks = () => {
  const typesUsed: FabricBlockType[] = [];
  const stack: Block[] = [];
  let columnsLeft = 9;

  while (columnsLeft != 0) {
    const filtered = blocks.filter(block => isAllowed(block, columnsLeft, typesUsed));
    if (filtered.length === 0) break;
    const randomBlock = filtered[Math.floor(Math.random() * filtered.length)]
    
    typesUsed.push(randomBlock.type);
    stack.push(randomBlock);
    columnsLeft -= randomBlock.size;
  };
  console.log(stack);
  return stack;
};

