import {useMutation, useQueryClient} from "@tanstack/react-query"
import {CompanyInformationPayload} from "../../../interfaces/company.interface"
import {changeCompanyInformation} from "../../request/company"
import {toast} from "react-toastify";
import {QUERY_KEYS} from "../../../constants/queryKey";

export const useChangeCompanyInformation = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload:CompanyInformationPayload) => changeCompanyInformation(payload),
        onSuccess: async () => {
            toast.success('Uspješno ste izmjenili info o kompaniji');
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_ALL_COMPANY]
                }),
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_ALL_AUDITS]
                }),
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_COMPANY_DETAILS]
                })
            ])
        }
    });
}