import type Fabric from "@/interfaces/fabricInterface"
import EditButton from "./EditButton";
import {USE_MOCK} from "@/const.tsx";

const FabricInfoExpanded = (
  {
    fabricData,
    handleEditBtnClick,
  }: {
    fabricData: Fabric,
    handleEditBtnClick: () => void,
  }
) => {

  const getCompositionString = () => {
    let result: string = "";
    if (fabricData.composition) {
      for (const materialType in fabricData.composition) {
        result += `${materialType}: ${fabricData.composition[materialType]} `;
      }
    }
    return result;
  };

  const imageSrc = USE_MOCK ? fabricData.image?.midi : `${import.meta.env.VITE_API_IMAGE_URL_BASE}/${fabricData.image?.midi}`

  return (
    <div className="w-1/2 flex justify-center items-center">
      <div className="flex flex-col relative w-3/4 rounded-lg bg-white shadow-lg border border-gray-200 px-4 py-2 text-sm text-gray-800">
        <p>Type: {fabricData.type}</p>
        <p>Weave: {fabricData.weave}</p>
        <p>Left: {fabricData.in_stock}m</p>
        <p>Weight: {fabricData.gsm}gsm</p>
        <p>Composition: {fabricData.composition ? getCompositionString() : "unknown"}</p>
        {fabricData.comment && <p>Comment: {fabricData.comment}</p>}
        <img className="w-full h-32 object-cover rounded-md" src={imageSrc} alt={fabricData.weave || ''} />
        <EditButton handleClick={handleEditBtnClick}/>
      </div>
    </div>
  )
};

export default FabricInfoExpanded;
