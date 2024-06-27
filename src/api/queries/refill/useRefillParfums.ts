import {useMutation, useQueryClient} from "@tanstack/react-query";
import {refillParfum, RefillParfumRequest} from "../../request/refill.ts";
import {toast} from "react-toastify";
import {QUERY_KEYS} from "../../../constants/queryKey.ts";

export const useRefillParfums = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data:RefillParfumRequest) => {
            await refillParfum(data);
        },
        onSuccess: () => {
            toast('Uspesno ste dopunili parfeme');
            Promise.all([
                queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_ALL_ARTICLES]}),
                queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_ALL_AUDITS]}),
                queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_COMPANY_DETAILS]}),
            ])
        }
    })
}