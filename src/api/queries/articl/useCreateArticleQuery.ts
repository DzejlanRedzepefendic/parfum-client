import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateArticle } from "../../../interfaces/article.interface"
import { createArticle } from "../../request/article"
import { QUERY_KEYS } from "../../../constants/queryKey";
import { toast } from "react-toastify";

export const useCreateArticleQuery = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation(({
       mutationFn: async (data:CreateArticle) => {
              const res = await createArticle(data);
              return res.data;
         },
         onSuccess: () => {
                toast.success('Article created successfully');
                return Promise.all([
                    queryClient.invalidateQueries({
                        queryKey:[QUERY_KEYS.GET_ALL_AUDITS],
                    }),
                    queryClient.invalidateQueries({
                        queryKey:[QUERY_KEYS.GET_ALL_ARTICLES],
                    })
                ])
            }
    }))
    return mutation;
}
