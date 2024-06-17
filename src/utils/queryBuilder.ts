import { QueryParams } from "../interfaces/global.interface";

export interface SortQuery {
    sortBy?: string;
    order?: string;
  }

export function queryBuilderForSort(props?:SortQuery) {
    return `sortBy[${props?.sortBy}]=${props?.order?.toUpperCase()}`;
}


export const buildQueryKey = (baseKey: string, params: QueryParams) => {
    return [baseKey, params];
  };


  export const buildQueryParams = (params: QueryParams): string => {
    const query = new URLSearchParams();
    
    if (params.page !== undefined) {
      query.append('page', params.page.toString());
    }
    
    if (params.limit !== undefined) {
      query.append('limit', params.limit.toString());
    }
    
    if (params.sortBy !== undefined) {
      query.append('sortBy', params.sortBy);
    }
    
    if (params.name !== undefined) {
      query.append('name', params.name);
    }
  
    return query.toString();
  };