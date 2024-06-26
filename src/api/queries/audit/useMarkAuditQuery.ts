import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogEntry } from "../../../interfaces/audit.interface";
import { toast } from "react-toastify";
import { markAudit } from "../../request/audit";
import { QUERY_KEYS } from "../../../constants/queryKey";

export const useMarkAuditQuery = () => {
    const queryClient = useQueryClient();
    const query = useMutation<LogEntry, Error, string>(
       {
        mutationFn: async (id) => {
            try {
               return await markAudit(id);
            } catch (error) {
                console.log(error);
                throw new Error('Došlo je do greške prilikom označavanja loga');
            }
        },
        onSuccess: () => {
            toast.success('Log uspješno označen');
            return Promise.all([
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_ALL_AUDITS],
                }),
            ])
        }
       }
    );
    return query;
}