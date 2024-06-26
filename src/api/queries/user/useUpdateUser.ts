import {useMutation, useQueryClient} from "@tanstack/react-query";
import {UpdatedUserData} from "../../../interfaces/user.interface";
import {updateUser} from "../../request/user";
import {QUERY_KEYS} from "../../../constants/queryKey";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, UpdatedUserData>(
        {
            mutationFn: async (data: UpdatedUserData) => {
                return await updateUser(data);
            },
            onSuccess: () => {
                return Promise.all([
                    queryClient.invalidateQueries({
                        queryKey: [QUERY_KEYS.GET_ALL_AUDITS],
                    }),
                    queryClient.invalidateQueries({
                        queryKey: [QUERY_KEYS.GET_ALL_USERS],
                    }),
                ])
            },
        }
    );
}