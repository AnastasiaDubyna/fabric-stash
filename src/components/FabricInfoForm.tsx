import type Fabric from "@/interfaces/fabricInterface"
import { useState } from "react"
import { useForm } from "react-hook-form"

const FabricInfoForm = ({
  fabricData,
  // handleFormSubmit
}:
{
  fabricData: Fabric,
  // handleFormSubmit: () => void
}) => {
  const [weave, setWeave] = useState<string|null>(fabricData.weave);
  const [inStock, setInStock] = useState<number>(fabricData.in_stock);
  const [gsm, setGsm] = useState<number|null>(fabricData.gsm);
  const [type, setType] = useState<"knitted" | "woven" | "other">(fabricData.type);
  const [comment, setComment] = useState<string|null>(fabricData.comment);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      type,
      weave,
      inStock,
      gsm,
      comment
    }
  });

  //TODO: make it look good
  const inputs: {name: "type" | "weave" | "inStock" | "gsm" | "comment", label: string}[] = [
    {name: "type", label: "Type"},
    {name: "weave", label: "Weave"},
    {name: "inStock", label: "In Stock"},
    {name: "gsm", label: "GSM"},
    {name: "comment", label: "Comment"}
  ]
  //TODO: separate styles into custom classes
  return (
    <div className="w-1/2 flex justify-center items-center">
      <form onSubmit={handleSubmit((data) => {console.log(data)})} className="flex flex-col items-center space-y-1 w-3/4 rounded-lg bg-white shadow-lg border border-gray-200 px-4 py-2 text-sm text-gray-800">
        {
          inputs.map((inputObj) => (
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">{`${inputObj.label}: `}</label>
              <input {...register(inputObj.name)} placeholder={inputObj.label} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-colors"/> 
            </div>
          ))
        }
        <div className="w-full flex gap-3 justify-center">
          <button 
            type="submit" 
            className="w-25 mt-3 rounded-lg bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:ring-2 focus:ring-indigo-400/40 transition-colors"
          >
            Save
          </button>
          <button 
            className="w-25 mt-3 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
};

export default FabricInfoForm;

// export default interface Fabric {
//   _id: string;
//   image: {
//     original: string;
//     midi: string;
//   } | null;
//   weave: string | null;
//   in_stock: number;
//   gsm: number | null;
//   type: "knitted" | "woven" | "other";
//   composition: {
//     [key: string] : string;
//   } | null;
//   comment: string | null;
// };