import { useMutation, useQueryClient } from "@tanstack/react-query"
import { RegisterData, RegisterResponse } from "../../../interfaces/auth.interface"
import { register } from "../../request/auth"

export const useRegisterQuery =()=>{
    const queryClient = useQueryClient()
    const mutatin = useMutation<RegisterResponse,Error,RegisterData>({
        mutationFn:async(data:RegisterData)=>{
           return await register(data)
        },
        onSuccess:()=> queryClient.invalidateQueries({queryKey:['getAllUsers']})
        
        
    })
    return mutatin
}