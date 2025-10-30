import type Fabric from "@/interfaces/fabricInterface";
import FabricRoll from "./FabricRoll";
import type { FabricBlockType } from "@/utils/blocks";

interface FabricBlock {
  key: string;
  type: FabricBlockType;
  amount: number;
  fabricData: Fabric[];
};

const FabricBlock = ({
  type,
  amount,
  fabricData
}: FabricBlock) => {

  const getStyles = () => {
    switch (type) {
      case "horizontal":
        return "flex-col justify-end"
      case "straight":
        return "items-end"
      default:
        return "-space-x-14 items-end"
    };
  }

  return (
    <div className={`flex ${getStyles()}`}>
      {Array.from({ length: amount }).map((_, i) => {
        return <FabricRoll key={fabricData[i]._id}  fabricData={fabricData[i]} rollType={type}/>
      })}
    </div>
  )
};

export default FabricBlock;
