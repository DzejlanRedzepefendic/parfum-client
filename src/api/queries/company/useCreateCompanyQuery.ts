import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompany } from "../../request/company";
import { toast } from "react-toastify";
import { CreateCompanyRequestData } from "../../../interfaces/company.interface";

export const useCreateCompanyQuery = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data:CreateCompanyRequestData) => await createCompany(data),
        onSuccess: () => {
            toast.success('Company created successfully');
            queryClient.invalidateQueries({
                // queryKey:[QUERY_KEYS.GET_ALL_COMPANIES]
            })
        }
    })
    return mutation;
    }