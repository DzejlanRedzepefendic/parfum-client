import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "../../../constants/queryKey.ts";
import {getRefillByCompanyId} from "../../request/refill.ts";

export const useGetRefillByCompanyId = (companyId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_REFILL_BY_COMPANY_ID, companyId],
        queryFn: async () => await getRefillByCompanyId(companyId),
        enabled: !!companyId
    });
}