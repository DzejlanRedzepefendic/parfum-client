import {useQuery} from "@tanstack/react-query";
import {QueryParams} from "../../../interfaces/global.interface";
import {getAllCompany} from "../../request/company";
import {QUERY_KEYS} from "../../../constants/queryKey";

export const useGetAllCompanyQuery = (queryParamas: QueryParams) => {
    // const queryClient = useQueryClient();
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_COMPANY, queryParamas],
        queryFn: async () => {
            const res = await getAllCompany(queryParamas);
            return res.data;
        },
    });
}