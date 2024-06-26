import {useMutation, useQueryClient} from "@tanstack/react-query"
import {deleteCompany} from "../../request/company"
import {QUERY_KEYS} from "../../../constants/queryKey";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export const useDeleteCompanyQuery = ()=> {
    const navigation = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => deleteCompany(id),
        onSuccess: () => {
            toast.success('Uspješno ste obrisali musteriju');
            navigation('/company');
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_ALL_COMPANY]
                }),
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_ALL_AUDITS]
                })
            ])
        }
    });
}