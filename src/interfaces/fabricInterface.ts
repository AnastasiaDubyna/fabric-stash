export default interface Fabric {
  _id: string;
  image: {
    original: string;
    midi: string;
  } | null;
  weave: string | null;
  in_stock: number;
  gsm: number | null;
  type: "knitted" | "woven" | "other";
  composition: {
    [key: string] : string;
  } | null;
  comment: string | null;
};