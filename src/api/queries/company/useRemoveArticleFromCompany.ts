import {useMutation, useQueryClient} from "@tanstack/react-query";
import {RemoveArticleFromCompanyRequestData} from "../../../interfaces/company.interface.ts";
import {removeArticleFromCompany} from "../../request/company.ts";
import {QUERY_KEYS} from "../../../constants/queryKey.ts";
import {toast} from "react-toastify";

export const useRemoveArticleFromCompany = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:async (data:RemoveArticleFromCompanyRequestData)=> await  removeArticleFromCompany(data),
        onSuccess: () => {
            toast('Uspesno ste uklonili artikal iz kompanije')
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_COMPANY_DETAILS]
                }),
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_ALL_COMPANY]
                }),
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_ALL_AUDITS]
                })
            ])
        }
    })
}