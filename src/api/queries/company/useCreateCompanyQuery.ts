import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCompany} from "../../request/company";
import {toast} from "react-toastify";
import {CreateCompanyRequestData} from "../../../interfaces/company.interface";
import {QUERY_KEYS} from "../../../constants/queryKey.ts";

export const useCreateCompanyQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreateCompanyRequestData) => await createCompany(data),
        onSuccess: () => {
            toast.success('Uspješno ste kreirali musteriju');
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_ALL_COMPANY]
            })
        }
    });
    }