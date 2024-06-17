import { useQuery } from "@tanstack/react-query"
import { getCompanyById } from "../../request/company"
import { QUERY_KEYS } from "../../../constants/queryKey"

export const useGetCompanyDetailsQuery = (id:string)=> {
    const query = useQuery({
        queryKey:[QUERY_KEYS.GET_COMPANY_DETAILS, id],
        queryFn:async()=> getCompanyById(id),
    })
    return query;
}