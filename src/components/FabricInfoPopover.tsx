import type Fabric from "@/interfaces/fabricInterface";

const FabricInfoPopover = (
  {
    fabricData,
    rect
  }:
  {
    fabricData: Fabric,
    rect: DOMRect | undefined
  }
) => {
  return (
    <div 
      className="flex flex-col fixed z-50 rounded-lg bg-white shadow-lg border border-gray-200 px-4 py-2 text-sm text-gray-800"
      style={{
        top: rect?.bottom,
        left: rect?.left
      }}
    >
      <p>Type: {fabricData.type}</p>
      <p>Weave: {fabricData.weave}</p>
      <p>Left: {fabricData.in_stock}m</p>
      <p>Weight: {fabricData.gsm}gsm</p>
      <p>Comment: {fabricData.comment}</p>
    </div>
  )
};

export default FabricInfoPopover;