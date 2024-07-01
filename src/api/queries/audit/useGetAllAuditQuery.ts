import {useQuery} from "@tanstack/react-query";
import {AuditLogs} from "../../../interfaces/audit.interface";
import {getAllAudits} from "../../request/audit";
import {QUERY_KEYS} from "../../../constants/queryKey";
import {SortQuery} from "../../../utils/queryBuilder";

export const useGetAllAuditQuery = (props?:SortQuery) => {
    return useQuery<AuditLogs, Error>({
        queryKey: [QUERY_KEYS.GET_ALL_AUDITS, props],
        queryFn: async () => {
            try {
                return await getAllAudits(props);
            } catch (error) {
                console.log(error);
                throw new Error('Došlo je do greške prilikom dohvaćanja svih logova');
            }
        }
    });
}