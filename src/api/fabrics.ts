import axios from "axios";
import type Fabric from "@interfaces/fabricInterface";

const getFabrics = async (limit: number, lastId: string = ""): Promise<Fabric[]> => {
  const url = `${import.meta.env.VITE_API_URL_BASE}/fabrics`;
  try {
    const res = await axios.get(url, {params: {limit, lastId}});
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getTotal = async (): Promise<number> => {
  const url = `${import.meta.env.VITE_API_URL_BASE}/total`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export {
  getFabrics,
  getTotal
};