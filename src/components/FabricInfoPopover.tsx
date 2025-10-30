import type Fabric from "@/interfaces/fabricInterface";

interface FabricInfoPopoverProps {
  fabric: Fabric | null;
  rect: DOMRect | null;
}

const FabricInfoPopover = ({ fabric, rect }: FabricInfoPopoverProps) => {
  if (!fabric || !rect) return null;

  return (
    <div
      className="flex flex-col fixed z-50 rounded-lg bg-white shadow-lg border border-gray-200 px-4 py-2 text-sm text-gray-800"
      style={{
        top: rect.bottom,
        left: rect.left,
      }}
    >
      <p>Type: {fabric.type}</p>
      <p>Weave: {fabric.weave}</p>
      <p>Left: {fabric.in_stock}m</p>
      <p>Weight: {fabric.gsm}gsm</p>
      <p>Comment: {fabric.comment}</p>
    </div>
  )
};

export default FabricInfoPopover;
