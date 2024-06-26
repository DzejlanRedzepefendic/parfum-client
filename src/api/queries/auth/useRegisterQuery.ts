import {useMutation, useQueryClient} from "@tanstack/react-query"
import {RegisterData, RegisterResponse} from "../../../interfaces/auth.interface"
import {register} from "../../request/auth"
import {QUERY_KEYS} from "../../../constants/queryKey.ts";
import {toast} from "react-toastify";

export const useRegisterQuery =()=>{
    const queryClient = useQueryClient()
    return useMutation<RegisterResponse, Error, RegisterData>({
        mutationFn: async (data: RegisterData) => {
            return await register(data)
        },
        onSuccess: () => {
            toast('Uspješno ste registorali korisnika')
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.GET_ALL_USERS]})
        }


    })
}