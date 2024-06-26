import {useMutation, useQueryClient} from "@tanstack/react-query"
import {CreateCompanyRequestData} from "../../../interfaces/company.interface"
import {updateCompany} from "../../request/company"
import {toast} from "react-toastify";
import {QUERY_KEYS} from "../../../constants/queryKey";

export const useEditCompanyQuery = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: { id: string, data: CreateCompanyRequestData }) => updateCompany(data.id, data.data),
        onSuccess: () => {
            toast.success('Uspješno ste izmjenili musteriju');
            Promise.all([
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