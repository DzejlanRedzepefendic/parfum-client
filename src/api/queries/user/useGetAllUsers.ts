import {useQuery} from "@tanstack/react-query";
import {PullUser} from "../../../interfaces/user.interface";
import {getAllUsers} from "../../request/user";
import {QUERY_KEYS} from "../../../constants/queryKey";

export const useGetAllUsers = () => {
    return useQuery<PullUser[], Error>({
        queryKey: [QUERY_KEYS.GET_ALL_USERS],
        staleTime: Infinity,
        queryFn: async () => {
            try {
                return await getAllUsers();
            } catch (error) {
                throw new Error('Neuspješno učitavanje korisnika');
            }
        }
    });
}