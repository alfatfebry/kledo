import {
  provinces,
  regencies,
  districts,
  type Province,
  type Regency,
  type District,
} from '../data/data';

export interface FilterLoaderData {
  provinces: Province[];
  regencies: Regency[];
  districts: District[];
}

export function filterLoader(): FilterLoaderData {
  return {
    provinces,
    regencies,
    districts,
  };
}
