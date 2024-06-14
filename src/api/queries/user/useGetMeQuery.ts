import { useQuery } from "@tanstack/react-query";
import { GetMeResponse } from "../../../interfaces/user.interface";
import { getMe } from "../../request/user";
import { QUERY_KEYS } from "../../../constants/queryKey";


interface Props { 
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>
}
export const useGetMeQuery = (props:Props) => {

    const query = useQuery<GetMeResponse, Error>({
        queryKey:[QUERY_KEYS.GET_ME],
        staleTime:Infinity,
        queryFn: async () => {
            try {
                const data = await getMe();
                props.setIsLoggedIn(true);
                return data;
            } catch (error) {
                props.setIsLoggedIn(false);
                localStorage.removeItem('token');
                throw new Error('Not logged in');
            }
        }
    });

    return query;
}