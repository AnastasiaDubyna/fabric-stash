import mockData from './mockData.json';
import type Fabric from "@interfaces/fabricInterface.ts";

const getFabrics = async (limit: number, lastId: string = ""): Promise<Fabric[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));

    const startIndex = lastId
        ? mockData.findIndex(f => f._id === lastId) + 1
        : 0;

    return (mockData as Fabric[]).slice(startIndex, startIndex + limit);
};

// TODO remove redundant
const getTotal = async (): Promise<number> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockData.length;
};

export {
    getFabrics,
    getTotal
};
