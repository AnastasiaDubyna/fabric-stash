import * as mockApi from './mockApi';
import * as realApi from './realApi';
import {USE_MOCK} from "@/const.tsx";

const api = USE_MOCK ? mockApi : realApi;

export const getFabrics = api.getFabrics;
// TODO remove redundant
export const getTotal = api.getTotal;
