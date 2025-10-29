import type Fabric from "@/interfaces/fabricInterface";
import { useEffect, useState, type SetStateAction } from "react";

const FabricInfoPopover = (
  {
    registerPopoverHandler
  }:
  {
    registerPopoverHandler: (handler: (selectedRoll?: Fabric, rect?: DOMRect) => void) => void;
  }
) => {
  const [selectedRoll, setSelectedRoll] = useState<Fabric|undefined>(undefined);
  const [rect, setRect] = useState<DOMRect|undefined>(undefined);

  const popoverHandler = (selectedRoll?: Fabric, rect?: DOMRect) => {
    setSelectedRoll(selectedRoll);
    setRect(rect);
    console.log("HANDLER CALLED")
  };

  useEffect(() => {
    console.log(popoverHandler)
    registerPopoverHandler(popoverHandler);
  }, []);

  return (
    selectedRoll && rect &&
    <div 
      className="flex flex-col fixed z-50 rounded-lg bg-white shadow-lg border border-gray-200 px-4 py-2 text-sm text-gray-800"
      style={{
        top: rect?.bottom,
        left: rect?.left
      }}
    >
      <p>Type: {selectedRoll.type}</p>
      <p>Weave: {selectedRoll.weave}</p>
      <p>Left: {selectedRoll.in_stock}m</p>
      <p>Weight: {selectedRoll.gsm}gsm</p>
      <p>Comment: {selectedRoll.comment}</p>
    </div>
  )
};

export default FabricInfoPopover;