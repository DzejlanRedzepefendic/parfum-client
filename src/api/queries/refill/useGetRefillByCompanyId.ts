import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "../../../constants/queryKey.ts";
import {getRefillByCompanyId} from "../../request/refill.ts";
import {GetRefillsByCompanyResponse, GetRefillsParams} from "../../../interfaces/refile.interface.ts";


export const useGetRefillByCompanyId = (params: GetRefillsParams) => {
    return useQuery<GetRefillsByCompanyResponse>({
        queryKey: [QUERY_KEYS.GET_REFILL_BY_COMPANY_ID, params],
        queryFn: async () => await getRefillByCompanyId(params),
        enabled: !!params.companyId
    });
}