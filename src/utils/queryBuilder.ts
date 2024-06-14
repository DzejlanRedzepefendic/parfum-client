export interface SortQuery {
    sortBy?: string;
    order?: string;
  }

export function queryBuilderForSort(props?:SortQuery) {
    return `sortBy[${props?.sortBy}]=${props?.order?.toUpperCase()}`;
}
