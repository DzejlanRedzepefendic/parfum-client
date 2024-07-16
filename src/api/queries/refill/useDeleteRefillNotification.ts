import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteRefillNotification} from "../../request/refill.ts";
import {toast} from "react-toastify";
import {QUERY_KEYS} from "../../../constants/queryKey.ts";

export const useDeleteRefillNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id:string) => {
            await deleteRefillNotification(id)
        },
        onSuccess: async () => {
            toast('Uspesno ste obrisali obavestenje o dopuni parfema');
            await  Promise.all([
                queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_ALL_AUDITS]}),
                queryClient.invalidateQueries({queryKey:[QUERY_KEYS.GET_NOTIFICATIONS]}),
            ])
        }
    })
}