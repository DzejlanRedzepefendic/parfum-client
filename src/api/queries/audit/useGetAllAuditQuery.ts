import { useQuery } from "@tanstack/react-query";
import { AuditLogs } from "../../../interfaces/audit.interface";
import { getAllAudits } from "../../request/audit";
import { QUERY_KEYS } from "../../../constants/queryKey";
import { SortQuery } from "../../../utils/queryBuilder";

export const useGetAllAuditQuery = (props?:SortQuery) => {
    const query = useQuery<AuditLogs, Error>({
        queryKey:[QUERY_KEYS.GET_ALL_AUDITS,props],
        queryFn: async () => {
            try {
                const data = await getAllAudits(props);
                return data;
            } catch (error) {
                console.log(error);
                throw new Error('No audits found');
            }
        }
    });
    return query;
}